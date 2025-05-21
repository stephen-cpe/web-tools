// timeZoneConverter.js

// Unified timezone display format for Google-style output
const timezoneDisplayMap = {
    "America/New_York": { name: "Eastern Time", abbr: "ET", location: "Eastern Time (ET)" },
    "America/Chicago": { name: "Central Time", abbr: "CT", location: "Central Time (CT)" },
    "America/Denver": { name: "Mountain Time", abbr: "MT", location: "Mountain Time (MT)" },
    "America/Los_Angeles": { name: "Pacific Time", abbr: "PT", location: "Pacific Time (PT)" },
    "UTC": { name: "UTC", abbr: "UTC", location: "UTC" },
    "Europe/London": { name: "London", abbr: "GMT/BST", location: "London, UK" },
    "Asia/Tokyo": { name: "Tokyo", abbr: "JST", location: "Tokyo, Japan" },
    "Asia/Manila": { name: "Philippines", abbr: "PHT", location: "Philippines" }
};

// Time conversion function
function convertTime() {
    const input = document.getElementById('timeConverterInput').value.trim();
    const resultDiv = document.getElementById('conversionResult');
    resultDiv.textContent = '';

    // Input format validation
    const match = input.match(/^(\d{4}|\d{1,2}:\d{2})\s+(.+?)\s+to\s+(.+?)$/i);
    if (!match) {
        resultDiv.textContent = 'Invalid format. Please use: "2200 Eastern to Mountain" or "10:00 Tokyo to London"';
        return;
    }

    const [_, timeStr, fromName, toName] = match;

    // Parse time
    let hours, minutes;
    if (timeStr.includes(':')) {
        [hours, minutes] = timeStr.split(':').map(Number);
    } else {
        hours = parseInt(timeStr.slice(0, 2));
        minutes = parseInt(timeStr.slice(2));
    }

    // Validate time
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        resultDiv.textContent = 'Invalid time value. Please use valid 24-hour time (00:00 to 23:59)';
        return;
    }

    // Find timezones
    const fromTz = findTimezone(fromName.trim().toLowerCase());
    const toTz = findTimezone(toName.trim().toLowerCase());

    // Validate timezones
    if (!fromTz || !isValidZone(fromTz)) {
        resultDiv.textContent = `Timezone "${fromName}" is not supported. Did you mean: ${getSuggestions(fromName)}?`;
        return;
    }

    if (!toTz || !isValidZone(toTz)) {
        resultDiv.textContent = `Timezone "${toName}" is not supported. Did you mean: ${getSuggestions(toName)}?`;
        return;
    }

    // Create DateTime objects
    const now = luxon.DateTime.local();
    const fromDT = now.set({ hour: hours, minute: minutes }).setZone(fromTz, { keepLocalTime: true });
    const toDT = fromDT.setZone(toTz);

    // Get display names
    const fromDisplay = timezoneDisplayMap[fromTz];
    const toDisplay = timezoneDisplayMap[toTz];

    // Format with Google-style format (12-hour AM/PM)
    const sourceTime = fromDT.toFormat('h:mm a');
    const targetTime = toDT.toFormat('h:mm a');
    
    // Format days with correct wording
    const sourceDay = fromDT.toFormat('cccc');
    const targetDay = toDT.toFormat('cccc');

    // Build final output
    resultDiv.textContent = `${sourceTime} ${sourceDay}, ${fromDisplay.location} is ` +
                            `${targetTime} ${targetDay}, in ${toDisplay.location}`;
}

// Validates timezone support
function isValidZone(zone) {
    if (!zone || typeof zone !== 'string') return false;
    try {
        const dt = luxon.DateTime.local().setZone(zone);
        return dt.isValid;
    } catch (e) {
        return false;
    }
}

// Maps input to IANA timezone IDs
function findTimezone(input) {
    const normalizedInput = input.toLowerCase();
    
    // Match abbreviations
    const abbrMap = {
        'et': 'America/New_York',
        'ct': 'America/Chicago',
        'mt': 'America/Denver',
        'pt': 'America/Los_Angeles',
        'pst': 'America/Los_Angeles',
        'pdt': 'America/Los_Angeles',
        'est': 'America/New_York',
        'edt': 'America/New_York',
        'cst': 'America/Chicago',
        'cdt': 'America/Chicago',
        'mst': 'America/Denver',
        'mdt': 'America/Denver',
        'gmt': 'UTC',
        'utc': 'UTC',
        'tokyo': 'Asia/Tokyo',
        'london': 'Europe/London',
        'philippines': 'Asia/Manila',
        'eastern': 'America/New_York',
        'central': 'America/Chicago',
        'mountain': 'America/Denver',
        'pacific': 'America/Los_Angeles',
        'western': 'America/Los_Angeles',
        'us east': 'America/New_York',
        'us central': 'America/Chicago',
        'us mountain': 'America/Denver',
        'us west': 'America/Los_Angeles'
    };

    if (abbrMap[normalizedInput]) return abbrMap[normalizedInput];

    // Match display names
    for (const tzId in timezoneDisplayMap) {
        const display = timezoneDisplayMap[tzId].location.toLowerCase();
        if (display === normalizedInput || display.includes(normalizedInput)) {
            return tzId;
        }
    }

    return null;
}

// Suggest similar timezones
function getSuggestions(input) {
    const normalizedInput = input.toLowerCase();
    return Object.values(timezoneDisplayMap)
        .filter(display => display.location.toLowerCase().includes(normalizedInput))
        .map(display => display.location)
        .join(', ') || 'Try: Eastern, London, Tokyo, etc.';
}