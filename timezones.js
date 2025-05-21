// Global timezone display names (IANA ID => Friendly Name)
const timezoneAliases = {
    "UTC": "UTC",
    "America/New_York": "US East",
    "America/Chicago": "US Central",
    "America/Denver": "US Mountain",
    "America/Los_Angeles": "US West",
    "Europe/London": "London",
    "Asia/Tokyo": "Tokyo",
    "Asia/Manila": "Philippines"
};

// Supported timezone abbreviations (Input => IANA ID)
const timezoneAbbreviations = {
    'est': 'America/New_York',
    'edt': 'America/New_York',
    'cst': 'America/Chicago',
    'cdt': 'America/Chicago',
    'mst': 'America/Denver',
    'mdt': 'America/Denver',
    'pst': 'America/Los_Angeles',
    'pdt': 'America/Los_Angeles',
    'utc': 'UTC',
    'gmt': 'UTC',
    'tokyo': 'Asia/Tokyo',
    'london': 'Europe/London',
    'philippines': 'Asia/Manila',
    'eastern': 'America/New_York',
    'central': 'America/Chicago',
    'mountain': 'America/Denver',
    'western': 'America/Los_Angeles',
    'west': 'America/Los_Angeles',
    'us east': 'America/New_York',
    'us central': 'America/Chicago',
    'us mountain': 'America/Denver',
    'us west': 'America/Los_Angeles'
};