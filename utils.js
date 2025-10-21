// Generic function to deduplicate items based on provided fields
function getUniqueItems(items, fields, limit = 120) {
    const seenValues = new Set();
    const unique = [];

    for (const item of items) {
        // Create a unique key for each item combining the values of the specified fields
        const key = fields.map(field => item[field]).join('-');
        
        // If this combination of field values has been seen before, skip it
        if (seenValues.has(key)) {
            continue; // Skip to the next item
        }

        // Add the key to our set of seen values
        seenValues.add(key);
        
        // Add the item to our final list
        unique.push(item);

        // Stop once we reach the desired limit
        if (unique.length >= limit) {
            break;
        }
    }
    return unique;
}

// Function to shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}