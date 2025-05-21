// Number Sorter Logic
function ns_parse(input) {
    return input.split(/[,\s\n]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
}

function ns_updateCount() {
    let nums = ns_parse(ns_input.value);
    ns_inputCount.textContent = nums.length;
}

function ns_sort(order) {
    let arr = ns_parse(ns_input.value);
    arr.sort((a, b) => order === 'asc' ? a - b : b - a);
    ns_output.value = arr.join('\n');
    ns_outputCount.textContent = arr.length;
}

// DOM Elements
const ns_input = document.getElementById('ns-input');
const ns_output = document.getElementById('ns-output');
const ns_inputCount = document.getElementById('ns-inputCount');
const ns_outputCount = document.getElementById('ns-outputCount');

// Event Listeners
ns_input.addEventListener('input', ns_updateCount);