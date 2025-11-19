// IP Tools JavaScript (Final Version with Hostname Resolution)

// --- Get and Display Public IP (Both IPv4 and IPv6) ---
async function showMyPublicIP() {
    const ipElement = document.getElementById('my-ip');
    ipElement.innerHTML = 'Fetching IPs...'; // Use innerHTML to allow line breaks

    // Use Promise.allSettled to fetch both IPs concurrently.
    const promises = [
        fetch('https://api.ipify.org?format=json'), // A reliable service for IPv4
        fetch('https://api64.ipify.org?format=json') // A reliable service for IPv6 (or IPv4 as fallback)
    ];

    try {
        const results = await Promise.allSettled(promises);
        const ipv4Result = results[0];
        const ipv6Result = results[1];
        let ipDisplay = [];
        let ipv4 = '';

        if (ipv4Result.status === 'fulfilled') {
            const data = await ipv4Result.value.json();
            ipv4 = data.ip;
            ipDisplay.push(`${ipv4}`);
        } else {
            console.error('Error fetching IPv4:', ipv4Result.reason);
        }

        if (ipv6Result.status === 'fulfilled') {
            const data = await ipv6Result.value.json();
            if (data.ip && data.ip !== ipv4) {
                 ipDisplay.push(`${data.ip}`);
            }
        } else {
             console.error('Error fetching IPv6:', ipv6Result.reason);
        }
        
        if (ipDisplay.length > 0) {
            ipElement.innerHTML = ipDisplay.join('<br>');
        } else {
            ipElement.textContent = 'Could not fetch IP';
        }

    } catch (error) {
        ipElement.textContent = 'Could not fetch IP';
        console.error('Error fetching public IPs:', error);
    }
}


// --- IP/Domain Lookup Function (with DNS-over-HTTPS workaround) ---
async function lookupIP() {
    const query = document.getElementById('lookup-input').value.trim();
    const resultsDiv = document.getElementById('lookup-results');
    resultsDiv.innerHTML = '<div class="lookup-loading">🔍 Looking up information...</div>';

    if (!query) {
        resultsDiv.innerHTML = '<div class="lookup-error">⚠️ Please enter an IP address or domain.</div>';
        return;
    }

    // Regular expression to check for valid IPv4 or IPv6 addresses.
    // This helps us decide if we need to perform a DNS lookup.
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

    let ipToLookup = query;

    // If the query is NOT an IP address, assume it's a hostname and resolve it.
    if (!ipRegex.test(query)) {
        resultsDiv.innerHTML = `<div class="lookup-loading">🔍 Resolving hostname: ${query}...</div>`;
        try {
            const dnsResponse = await fetch(`https://dns.google/resolve?name=${query}&type=A`);
            const dnsData = await dnsResponse.json();

            // Status 0 (NOERROR) is a successful lookup. Answer must also exist.
            if (dnsData.Status !== 0 || !dnsData.Answer) {
                resultsDiv.innerHTML = `<div class="lookup-error">❌ Error: Could not resolve hostname '${query}'.</div>`;
                return;
            }
            
            // Extract the first IPv4 address from the response
            ipToLookup = dnsData.Answer[0].data;
            resultsDiv.innerHTML = `<div class="lookup-loading">✅ Hostname resolved to ${ipToLookup}.<br>🔍 Looking up information...</div>`;

        } catch (error) {
            resultsDiv.innerHTML = `<div class="lookup-error">❌ An error occurred during hostname resolution.</div>`;
            console.error('Error resolving DNS:', error);
            return;
        }
    }
    
    // --- Now, lookup the IP with ipapi.co ---
    try {
        const response = await fetch(`https://ipapi.co/${ipToLookup}/json/`);
        const data = await response.json();

        if (data.error) {
            resultsDiv.innerHTML = `<div class="lookup-error">❌ Error: ${data.reason}</div>`;
            return;
        }

        resultsDiv.innerHTML = `
            <h4>📊 Results for ${data.ip} (${query})</h4>
            <table>
                <tr><th>🌍 Country</th><td>${data.country_name || 'N/A'}</td></tr>
                <tr><th>🏙️ Location</th><td>${data.city || 'N/A'}, ${data.region || 'N/A'} ${data.postal || ''}</td></tr>
                <tr><th>🌐 ISP</th><td>${data.isp || 'N/A'}</td></tr>
                <tr><th>🏢 Organization</th><td>${data.org || 'N/A'}</td></tr>
                <tr><th>🔢 AS Number</th><td>${data.asn || 'N/A'}</td></tr>
                <tr><th>📍 Coordinates</th><td>Lat: ${data.latitude || 'N/A'}, Lon: ${data.longitude || 'N/A'}</td></tr>
            </table>
        `;
    } catch (error) {
        resultsDiv.innerHTML = `<div class="lookup-error">❌ An unexpected error occurred. Please try again.</div>`;
        console.error('Error during lookup:', error);
    }
}


// --- Initialize IP Tools when page loads ---
function initIPTools() {
    showMyPublicIP();
    const lookupBtn = document.getElementById('lookup-btn');
    const lookupInput = document.getElementById('lookup-input');
    
    if (lookupBtn) {
        lookupBtn.addEventListener('click', lookupIP);
    }
    
    if (lookupInput) {
        lookupInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') lookupIP();
        });
    }
}

document.addEventListener('DOMContentLoaded', initIPTools);