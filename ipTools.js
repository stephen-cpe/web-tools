// IP Tools JavaScript

// --- Get and Display Public IP ---
async function showMyPublicIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('my-ip').textContent = data.ip;
    } catch (error) {
        document.getElementById('my-ip').textContent = 'Could not fetch IP';
        console.error('Error fetching public IP:', error);
    }
}

// --- IP/Domain Lookup Function ---
async function lookupIP() {
    const query = document.getElementById('lookup-input').value.trim();
    const resultsDiv = document.getElementById('lookup-results');
    
    // Clear previous results
    resultsDiv.innerHTML = '<div class="lookup-loading">🔍 Looking up information...</div>';

    if (!query) {
        resultsDiv.innerHTML = '<div class="lookup-error">⚠️ Please enter an IP address or domain.</div>';
        return;
    }

    try {
        // Using ip-api.com as it's free and requires no key
        const response = await fetch(`https://ip-api.com/json/${query}?fields=status,message,country,regionName,city,zip,lat,lon,isp,org,as,query`);
        const data = await response.json();

        if (data.status === 'fail') {
            resultsDiv.innerHTML = `<div class="lookup-error">❌ Error: ${data.message}</div>`;
            return;
        }

        // Create a table to display the results
        resultsDiv.innerHTML = `
            <h4>📊 Results for ${data.query}</h4>
            <table>
                <tr><th>🌍 Country</th><td>${data.country || 'N/A'}</td></tr>
                <tr><th>🏙️ Location</th><td>${data.city || 'N/A'}, ${data.regionName || 'N/A'} ${data.zip || ''}</td></tr>
                <tr><th>🌐 ISP</th><td>${data.isp || 'N/A'}</td></tr>
                <tr><th>🏢 Organization</th><td>${data.org || 'N/A'}</td></tr>
                <tr><th>🔢 AS Number</th><td>${data.as || 'N/A'}</td></tr>
                <tr><th>📍 Coordinates</th><td>Lat: ${data.lat || 'N/A'}, Lon: ${data.lon || 'N/A'}</td></tr>
            </table>
        `;
    } catch (error) {
        resultsDiv.innerHTML = `<div class="lookup-error">❌ An unexpected error occurred. Please try again.</div>`;
        console.error('Error during lookup:', error);
    }
}

// --- Initialize IP Tools when page loads ---
function initIPTools() {
    // Show public IP immediately
    showMyPublicIP();
    
    // Add event listeners
    const lookupBtn = document.getElementById('lookup-btn');
    const lookupInput = document.getElementById('lookup-input');
    
    if (lookupBtn) {
        lookupBtn.addEventListener('click', lookupIP);
    }
    
    if (lookupInput) {
        // Allow pressing Enter to trigger lookup
        lookupInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                lookupIP();
            }
        });
    }
}

// Initialize IP tools when DOM is loaded
document.addEventListener('DOMContentLoaded', initIPTools);