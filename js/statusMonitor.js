// Service Status Monitor
// Monitors operational status of major cloud service providers by scraping their status pages.

document.addEventListener('DOMContentLoaded', () => {
    initializeStatusMonitor();
});

// Service configurations with their status page URLs
const services = [
    {
        name: 'Cloudflare',
        url: 'https://www.cloudflarestatus.com/',
        icon: 'fas fa-cloud'
    },
    {
        name: 'AWS',
        url: 'https://health.aws.amazon.com/health/status',
        icon: 'fab fa-aws'
    },
    {
        name: 'Azure',
        url: 'https://azure.status.microsoft/en-us/status',
        icon: 'fab fa-microsoft'
    },
    {
        name: 'Google Cloud',
        url: 'https://status.cloud.google.com/',
        icon: 'fab fa-google'
    },
    {
        name: 'GitHub',
        url: 'https://www.githubstatus.com/',
        icon: 'fab fa-github'
    }
];

function initializeStatusMonitor() {
    const statusGrid = document.getElementById('status-grid');
    const refreshBtn = document.getElementById('status-refresh');
    
    if (!statusGrid) return;
    
    renderServiceCards();
    checkAllStatuses();
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.classList.add('spinning');
            checkAllStatuses().finally(() => {
                setTimeout(() => {
                    refreshBtn.classList.remove('spinning');
                }, 500);
            });
        });
    }
    
    setInterval(checkAllStatuses, 5 * 60 * 1000); // Auto-refresh every 5 minutes
}

function renderServiceCards() {
    const statusGrid = document.getElementById('status-grid');
    statusGrid.innerHTML = '';
    
    services.forEach((service, index) => {
        const card = document.createElement('div');
        card.className = 'status-card';
        card.id = `status-card-${index}`;
        
        card.innerHTML = `
            <div class="status-card-header">
                <div class="status-card-title">
                    <i class="${service.icon}"></i>
                    <h3>${service.name}</h3>
                </div>
                <span class="status-dot status-unknown" title="Checking..."></span>
            </div>
            <div class="status-card-body">
                <p class="status-message">Checking status...</p>
            </div>
            <div class="status-card-footer">
                <a href="${service.url}" target="_blank" rel="noopener noreferrer">
                    View Official Status Page <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `;
        
        statusGrid.appendChild(card);
    });
}

async function checkAllStatuses() {
    const promises = services.map((service, index) => checkServiceStatus(service, index));
    await Promise.allSettled(promises);
}

async function checkServiceStatus(service, index) {
    const card = document.getElementById(`status-card-${index}`);
    const statusDot = card.querySelector('.status-dot');
    const statusMessage = card.querySelector('.status-message');

    // Using a CORS proxy to fetch the HTML content of the status page.
    // This is necessary because of browser security restrictions (CORS).
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(service.url)}`;

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        let { status, message } = parseStatus(service.name, doc);

        statusDot.className = `status-dot status-${status}`;
        statusDot.title = message;
        statusMessage.textContent = message;

    } catch (error) {
        console.error(`Error checking ${service.name} status:`, error);
        statusDot.className = 'status-dot status-error';
        statusDot.title = 'Failed to fetch status';
        statusMessage.textContent = 'Could not retrieve status information.';
    }
}

// This is the most fragile part of the implementation.
// If the layout of the status pages changes, these parsers will need to be updated.
function parseStatus(serviceName, doc) {
    try {
        switch (serviceName) {
            case 'Cloudflare':
            case 'GitHub':
            case 'Vercel':
            case 'Netlify':
            case 'DigitalOcean':
                // These services use Atlassian Statuspage.
                const overallStatus = doc.querySelector('.page-status .status');
                if (overallStatus) {
                    const statusText = overallStatus.textContent.trim();
                    if (statusText.includes('All Systems Operational')) {
                        return { status: 'operational', message: statusText };
                    } else if (statusText.includes('Partial Outage') || statusText.includes('Degraded Performance')) {
                        return { status: 'degraded', message: statusText };
                    } else if (statusText.includes('Major Outage')) {
                        return { status: 'major', message: statusText };
                    }
                }
                // Fallback for different statuspage versions
                const statusIndicator = doc.querySelector('span.color-dot');
                if(statusIndicator && statusIndicator.parentElement.textContent.includes('All Systems Operational')) {
                    return { status: 'operational', message: 'All Systems Operational' };
                }
                return { status: 'unknown', message: 'Could not determine status.' };

            case 'AWS':
                // AWS has a simple table. We check for any red or yellow icons.
                const awsIssues = doc.querySelectorAll('tr[class*="issue"]');
                if (awsIssues.length > 0) {
                    // Simple check if there are any issue rows.
                    // A more detailed implementation could count major vs minor issues.
                    return { status: 'degraded', message: `Found ${awsIssues.length} ongoing issue(s).` };
                }
                return { status: 'operational', message: 'All services are operating normally.' };

            case 'Azure':
                 // Azure uses a grid system. We look for icons indicating issues.
                const azureIssueIcons = doc.querySelectorAll('i.fa-times-circle, i.fa-exclamation-triangle');
                if (azureIssueIcons.length > 0) {
                    return { status: 'degraded', message: `Found ${azureIssueIcons.length} service(s) with issues.` };
                }
                const azureGoodIcons = doc.querySelectorAll('i.fa-check-circle');
                 if (azureGoodIcons.length > 0) {
                    return { status: 'operational', message: 'All services are healthy.' };
                }
                return { status: 'unknown', message: 'Could not determine Azure status.' };

            case 'Google Cloud':
                // Google Cloud status page has a table. We check for problem icons.
                const gcpIssues = doc.querySelectorAll('.problem-icon');
                if (gcpIssues.length > 0) {
                    return { status: 'degraded', message: `Found ${gcpIssues.length} ongoing issue(s).` };
                }
                const gcpNoIssues = doc.querySelector('.no-issues-icon');
                if (gcpNoIssues) {
                    return { status: 'operational', message: 'All services are operating normally.' };
                }
                return { status: 'unknown', message: 'Could not determine Google Cloud status.' };

            default:
                return { status: 'unknown', message: 'No parser available for this service.' };
        }
    } catch (e) {
        console.error(`Error parsing status for ${serviceName}:`, e);
        return { status: 'error', message: 'Failed to parse status information.' };
    }
}