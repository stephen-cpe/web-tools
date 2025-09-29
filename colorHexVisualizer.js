document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#section-color-hex .ch-container');
    if (!container) return;

    const defaultColors = [
        '#000000', '#FFFFFF', '#38506C', '#414C6B',
        '#539394', '#ABA18C', '#9C7A65', '#6E6E6E'
    ];

    const updateColor = (input, bar) => {
        let value = input.value.trim();
        if (!value.startsWith('#')) {
            value = '#' + value;
        }
        
        // Basic validation for hex color
        if (/^#[0-9A-F]{6}$/i.test(value) || /^#[0-9A-F]{3}$/i.test(value)) {
            bar.style.backgroundColor = value;
            input.style.borderColor = '';
            input.style.color = '';
        } else {
            bar.style.backgroundColor = '#FFFFFF'; // Default to white on invalid
            input.style.borderColor = 'red';
            input.style.color = 'red';
        }
    };

    defaultColors.forEach(color => {
        const row = document.createElement('div');
        row.className = 'ch-row';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'ch-input';
        input.value = color;

        const bar = document.createElement('div');
        bar.className = 'ch-bar';

        row.appendChild(input);
        row.appendChild(bar);
        container.appendChild(row);

        // Set initial color
        updateColor(input, bar);

        // Add event listener
        input.addEventListener('input', () => updateColor(input, bar));
    });
});