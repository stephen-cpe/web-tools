// Service Status Monitor V2: Client-Side Network Diagnostics

document.addEventListener('DOMContentLoaded', () => {
    initializeStatusMonitor();
});

// Configuration for services to be tested.
// 'type' can be 'http' (for latency check) or 'doh' (for DNS-over-HTTPS check).
const services = [
    {
        name: 'Google DNS',
        type: 'doh',
        url: 'https://dns.google/resolve?name=example.com&type=A',
        officialUrl: 'https://status.cloud.google.com/',
        icon: 'fab fa-google'
    },
    {
        name: 'Cloudflare DNS',
        type: 'doh',
        url: 'https://cloudflare-dns.com/dns-query?name=example.com&type=A',
        officialUrl: 'https://www.cloudflarestatus.com/',
        icon: 'fas fa-cloud'
    },
    {
        name: 'AWS',
        type: 'http',
        url: 'https://aws.amazon.com/', // A stable, high-availability endpoint
        officialUrl: 'https://health.aws.amazon.com/health/status',
        icon: 'fab fa-aws'
    },
    {
        name: 'Azure',
        type: 'http',
        url: 'https://azure.microsoft.com/', // A stable, high-availability endpoint
        officialUrl: 'https://azure.status.microsoft/en-us/status',
        icon: 'fab fa-microsoft'
    },
    {
        name: 'GitHub',
        type: 'http',
        url: 'https://github.com/', // A stable, high-availability endpoint
        officialUrl: 'https://www.githubstatus.com/',
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
    
    // We can keep the auto-refresh, but maybe make it less frequent.
    setInterval(checkAllStatuses, 3 * 60 * 1000); // Auto-refresh every 3 minutes
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
                <span class="status-dot status-unknown" title="Pending"></span>
            </div>
            <div class="status-card-body">
                <div class="live-check">
                    <span class="live-check-label">Live Check:</span>
                    <p class="status-message" id="status-message-${index}">Awaiting test...</p>
                </div>
            </div>
            <div class="status-card-footer">
                <a href="${service.officialUrl}" target="_blank" rel="noopener noreferrer">
                    Official Status Page <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `;
        
        statusGrid.appendChild(card);
    });
}

/**
 * Performs a lightweight HTTP check to measure latency.
 * @param {string} url - The URL to check.
 * @returns {Promise<number>} - The latency in milliseconds.
 */
async function httpPing(url) {
    const startTime = performance.now();
    try {
        // We use 'HEAD' to be less intrusive and faster, and 'no-cache' to bypass browser cache.
        const response = await fetch(url, { method: 'HEAD', cache: 'no-store', mode: 'no-cors' });
        const endTime = performance.now();
        // For "no-cors" requests, we can't access status, but if it completes without a network error, it's a good sign.
        return Math.round(endTime - startTime);
    } catch (error) {
        // A network error occurred.
        throw new Error('Network Error');
    }
}


/**
 * Performs a DNS-over-HTTPS query to check DNS health and latency.
 * @param {string} url - The DoH endpoint URL.
 * @returns {Promise<number>} - The latency in milliseconds.
 */
async function checkDoh(url) {
    const startTime = performance.now();
    try {
        const headers = { 'Accept': 'application/dns-json' };
        const response = await fetch(url, { method: 'GET', cache: 'no-store', headers: headers });
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }
        await response.json(); // Ensure we can read the body
        const endTime = performance.now();
        return Math.round(endTime - startTime);
    } catch (error) {
        console.error('DoH check failed:', error);
        throw new Error('Query Failed');
    }
}


async function checkAllStatuses() {
    const promises = services.map((service, index) => checkServiceStatus(service, index));
    await Promise.allSettled(promises);
}

async function checkServiceStatus(service, index) {
    const card = document.getElementById(`status-card-${index}`);
    const statusDot = card.querySelector('.status-dot');
    const statusMessage = card.querySelector('.status-message');

    // Reset UI for the check
    statusDot.className = 'status-dot status-unknown';
    statusMessage.textContent = `Testing ${service.type}...`;
    statusDot.title = 'Testing...';

    try {
        let latency;
        if (service.type === 'doh') {
            latency = await checkDoh(service.url);
        } else {
            // Using a general URL and 'no-cors' ping as a fallback
            latency = await httpPing(service.url);
        }

        // Update UI with success and latency
        if (latency < 300) {
            statusDot.className = 'status-dot status-operational';
            statusDot.title = 'Operational';
        } else {
            statusDot.className = 'status-dot status-degraded';
            statusDot.title = 'Degraded Performance';
        }
        statusMessage.textContent = `Latency: ${latency}ms`;

    } catch (error) {
        // Update UI with error state
        statusDot.className = 'status-dot status-major';
        statusDot.title = 'Major Outage / Unreachable';
        statusMessage.textContent = `Error: ${error.message}`;
        console.error(`Error checking ${service.name}:`, error);
    }
}
