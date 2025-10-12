// ASCII Tree Generator Logic
function tg_generate() {
    const input = document.getElementById('tg-input').value;
    const tg_error = document.getElementById('tg-error');
    const tg_output = document.getElementById('tg-output');
    const lines = input.split('\n').filter(l => l.trim());

    if (!lines.length) {
        tg_error.textContent = 'Please enter structure lines.';
        tg_output.textContent = ''; // Clear output on error
        return;
    }

    tg_error.textContent = '';
    const nodes = [];
    let stack = [];

    lines.forEach(line => {
        const indent = line.match(/^\s*/)[0].length;
        const name = line.trim();

        while (stack.length && indent <= stack[stack.length - 1].indent) {
            stack.pop();
        }

        const parent = stack.length ? stack[stack.length - 1] : null;
        const node = { name, indent, children: [], parent };

        if (parent) {
            parent.children.push(node);
        } else {
            nodes.push(node);
        }
        stack.push(node);
    });

    let out = '';
    // This recursive function is now only for children, and remains unchanged.
    function draw(n, prefix, isLast) {
        out += prefix + (isLast ? '└── ' : '├── ') + n.name + '\n';
        const newPrefix = prefix + (isLast ? '    ' : '│   ');
        n.children.forEach((child, index) => {
            draw(child, newPrefix, index === n.children.length - 1);
        });
    }

    // --- REVISED LOGIC ---
    // Handle root nodes differently.
    if (nodes.length === 1) {
        // If there's only one root node, print its name without a prefix.
        const root = nodes[0];
        out += root.name + '\n';
        // Then, draw its children. The prefix is empty because they are direct descendants.
        root.children.forEach((child, index) => {
            draw(child, '', index === root.children.length - 1);
        });
    } else {
        // If there are multiple root nodes, treat them as siblings (original logic).
        nodes.forEach((node, index) => {
            draw(node, '', index === nodes.length - 1);
        });
    }

    tg_output.textContent = out;
}

// DOM Elements
const tg_error = document.getElementById('tg-error');
const tg_output = document.getElementById('tg-output');

// Event Listeners
document.getElementById('tg-generate').onclick = tg_generate;
document.getElementById('tg-copy').onclick = () => {
    navigator.clipboard.writeText(tg_output.textContent);
};