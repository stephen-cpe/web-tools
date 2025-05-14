document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const gridContainer = document.getElementById('clockGrid');
    const clockTileTemplate = document.getElementById('clockTileTemplate');
    const numberOfClocks = 6; // 3x2 grid

    // Mapping from IANA Timezone to desired Display Name
    const timezoneAliases = {
        "UTC": "UTC",
        "America/New_York": "US East (EST/EDT)",
        "America/Chicago": "US Central (CST/CDT)",
        "America/Denver": "US Mountain (MST/MDT)",
        "America/Los_Angeles": "US West (PST/PDT)",
        "Europe/London": "London (GMT/BST)",
        "Europe/Paris": "Paris (CET/CEST)",
        "Europe/Berlin": "Berlin (CET/CEST)",
        "Asia/Tokyo": "Tokyo (JST)",
        "Asia/Dubai": "Dubai (GST)",
        "Asia/Kolkata": "India (IST)",
        "Asia/Shanghai": "China (CST)",
        "Asia/Singapore": "Singapore (SGT)",
        "Asia/Manila": "Philippines (PHT)", // User's location
        "Australia/Sydney": "Sydney (AEST/AEDT)",
        "Pacific/Auckland": "Auckland (NZST/NZDT)",
        "Africa/Johannesburg": "Johannesburg (SAST)",
        "America/Sao_Paulo": "Sao Paulo (BRT/BRST)"
    };

    const coreTimezones = Object.keys(timezoneAliases);
    const essentialTimezones = [
        "UTC", "Asia/Manila", "America/New_York", "America/Chicago",
        "America/Denver", "America/Los_Angeles", "Europe/London", "Asia/Tokyo",
        "Australia/Sydney"
    ];
    essentialTimezones.forEach(tz => {
        if (!coreTimezones.includes(tz)) {
            coreTimezones.push(tz);
            if (!timezoneAliases[tz]) {
                timezoneAliases[tz] = tz.replace(/_/g, ' ');
            }
        }
    });
    coreTimezones.sort();

    const initialTimezones = [
        "Asia/Manila",
        "America/New_York",
        "America/Chicago",
        "America/Denver",
        "America/Los_Angeles",
        "Europe/London"
    ];

    // --- Functions ---

    function populateTimezoneSelect(selectElement, selectedTzValue) {
        selectElement.innerHTML = '';
        const sortedForDisplay = coreTimezones.map(tzValue => ({
            value: tzValue,
            display: timezoneAliases[tzValue] || tzValue.replace(/_/g, ' ')
        })).sort((a, b) => a.display.localeCompare(b.display));

        sortedForDisplay.forEach(tzInfo => {
            const option = document.createElement('option');
            option.value = tzInfo.value;
            option.textContent = tzInfo.display;
            if (tzInfo.value === selectedTzValue) {
                option.selected = true;
            }
            selectElement.appendChild(option);
        });
    }

    /**
     * Updates the time, DATE, and timezone display for a single clock tile.
     * @param {HTMLElement} tileElement - The clock tile div element.
     */
    function updateClock(tileElement) {
        const selectElement = tileElement.querySelector('.timezoneSelect');
        const timeDisplay = tileElement.querySelector('.timeDisplay');
        const dateDisplay = tileElement.querySelector('.dateDisplay'); // Get date element
        const timezoneNameDisplay = tileElement.querySelector('.timezoneName');
        const selectedTimezoneValue = selectElement.value;

        try {
            const now = new Date();

            // Formatter for Time
            const timeString = now.toLocaleTimeString('en-US', {
                timeZone: selectedTimezoneValue,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            // Formatter for Date (using the SAME timezone)
            const dateString = now.toLocaleDateString('en-US', {
                timeZone: selectedTimezoneValue,
                weekday: 'short', // e.g., Mon
                month: 'short',   // e.g., May
                day: 'numeric',    // e.g., 5
                // year: 'numeric' // Optionally add year: e.g., 2025
            });

            // Update display
            timeDisplay.textContent = timeString;
            dateDisplay.textContent = dateString; // Update date display
            const displayAlias = timezoneAliases[selectedTimezoneValue] || selectedTimezoneValue.replace(/_/g, ' ');
            timezoneNameDisplay.textContent = displayAlias;

        } catch (error) {
            console.error(`Error updating clock for timezone ${selectedTimezoneValue}:`, error);
            timeDisplay.textContent = "Error";
            dateDisplay.textContent = "--- --"; // Reset date on error
            timezoneNameDisplay.textContent = "Invalid Timezone?";
        }
    }


    function createClockTile(index, initialTzValue) {
        const tileClone = clockTileTemplate.content.cloneNode(true);
        const tileElement = tileClone.querySelector('.clockTile');
        const selectElement = tileElement.querySelector('.timezoneSelect');

        populateTimezoneSelect(selectElement, initialTzValue);

        selectElement.addEventListener('change', () => {
            updateClock(tileElement);
        });

        updateClock(tileElement); // Initial clock update

        return tileClone;
    }

    // --- Initialization ---
    if (!gridContainer || !clockTileTemplate) {
        console.error("Initialization failed: Could not find grid container or template element.");
        return;
    }

    for (let i = 0; i < numberOfClocks; i++) {
        const tzValue = initialTimezones[i] || coreTimezones[i % coreTimezones.length] || "UTC";
        const newTile = createClockTile(i, tzValue);
        gridContainer.appendChild(newTile);
    }

    // --- Global Interval ---
    setInterval(() => {
        const allTiles = gridContainer.querySelectorAll('.clockTile');
        allTiles.forEach(tile => {
            updateClock(tile);
        });
    }, 1000); // Update every 1 second
});