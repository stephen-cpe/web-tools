// Validate timezone support
function isValidZone(zone) {
    if (!zone || typeof zone !== 'string') return false;
    try {
        const dt = luxon.DateTime.local().setZone(zone);
        return dt.isValid;
    } catch (e) {
        return false;
    }
}

// Match input to supported timezone
function findTimezone(input) {
    const normalizedInput = input.toLowerCase();
    if (timezoneAbbreviations[normalizedInput]) return timezoneAbbreviations[normalizedInput];

    for (const tzId in timezoneAliases) {
        if (timezoneAliases[tzId].toLowerCase() === normalizedInput) return tzId;
    }

    return null;
}

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

    // Convert time
    const now = luxon.DateTime.local();
    const fromDT = now.set({ hour: hours, minute: minutes }).setZone(fromTz, { keepLocalTime: true });
    
    if (!fromDT.isValid) {
        resultDiv.textContent = 'Error creating date in source timezone.';
        return;
    }

    const toDT = fromDT.setZone(toTz);

    const fromDisplayName = timezoneAliases[fromTz];
    const toDisplayName = timezoneAliases[toTz];

    resultDiv.textContent = `${timeStr} ${fromDisplayName} Time (${fromDisplayName.charAt(0)}T) is ` +
        `${toDT.toFormat('HH:mm')} ${toDT.toFormat('ccc, LLL dd, yyyy')} (${toDisplayName})`;
}

// Suggest similar timezones
function getSuggestions(input) {
    const normalizedInput = input.toLowerCase();
    const suggestions = Object.values(timezoneAliases).filter(tz => tz.toLowerCase().includes(normalizedInput));
    return suggestions.join(', ') || 'Try: Eastern, London, Tokyo, etc.';
}