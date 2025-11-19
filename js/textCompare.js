const DIFF_DELETE = -1;
const DIFF_INSERT = 1;
const DIFF_EQUAL  = 0;

document.addEventListener('DOMContentLoaded', () => {
    const compareBtn = document.getElementById('tc-compare-btn');
    if (compareBtn) {
        compareBtn.addEventListener('click', performCompare);
    }
});

function performCompare() {
    const inputA = document.getElementById('tc-input-a').value;
    const inputB = document.getElementById('tc-input-b').value;
    const outputA = document.getElementById('tc-output-a');
    const outputB = document.getElementById('tc-output-b');

    // Clear previous results
    outputA.innerHTML = '';
    outputB.innerHTML = '';

    if (typeof diff_match_patch === 'undefined') {
        console.error("diff_match_patch library is not available.");
        outputA.innerHTML = '<span class="error">Error: diff_match_patch library not loaded.</span>';
        return;
    }

    // Split inputs into lines
    const linesA = inputA.split('\n');
    const linesB = inputB.split('\n');

    // Generate the side-by-side HTML using line-by-line diff
    const { htmlA, htmlB } = createLineDiff(linesA, linesB);

    outputA.innerHTML = htmlA;
    outputB.innerHTML = htmlB;
}

// In textCompare.js

function createLineDiff(linesA, linesB) {
    const dmp = new diff_match_patch();
    const a = dmp.diff_linesToChars_(linesA.join('\n'), linesB.join('\n'));
    const diffs = dmp.diff_main(a.chars1, a.chars2, false);
    dmp.diff_charsToLines_(diffs, a.lineArray);

    let htmlA = '';
    let htmlB = '';

    for (let i = 0; i < diffs.length; i++) {
        const [op, data] = diffs[i];
        const lines = data.replace(/\n$/, '').split('\n');

        // Check if this is a change (delete followed by insert)
        const isChange = (op === DIFF_DELETE && diffs[i+1] && diffs[i+1][0] === DIFF_INSERT);

        if (isChange) {
            const [nextOp, nextData] = diffs[i+1];
            const nextLines = nextData.replace(/\n$/, '').split('\n');

            // Process paired lines as changes
            for (let j = 0; j < Math.max(lines.length, nextLines.length); j++) {
                const lineA = lines[j];
                const lineB = nextLines[j];

                if (lineA !== undefined && lineB !== undefined) {
                    // Perform a character-level diff on the changed lines
                    const charDiffs = dmp.diff_main(lineA, lineB);
                    dmp.diff_cleanupSemantic(charDiffs);
                    
                    let lineAHtml = '', lineBHtml = '';
                    for (const [charOp, charData] of charDiffs) {
                        const escapedData = escapeHtml(charData);
                        if (charOp === DIFF_EQUAL) {
                            lineAHtml += escapedData;
                            lineBHtml += escapedData;
                        } else if (charOp === DIFF_DELETE) {
                            lineAHtml += `<span>${escapedData}</span>`;
                        } else if (charOp === DIFF_INSERT) {
                            lineBHtml += `<span>${escapedData}</span>`;
                        }
                    }
                    htmlA += `<div class="diff-line diff-deleted">${lineAHtml || '&nbsp;'}</div>`;
                    htmlB += `<div class="diff-line diff-inserted">${lineBHtml || '&nbsp;'}</div>`;

                } else if (lineA !== undefined) { // Deletion without corresponding insertion
                    htmlA += `<div class="diff-line diff-deleted">${escapeHtml(lineA)}</div>`;
                    htmlB += `<div class="diff-line diff-placeholder">&nbsp;</div>`;
                } else { // Insertion without corresponding deletion
                    htmlA += `<div class="diff-line diff-placeholder">&nbsp;</div>`;
                    htmlB += `<div class="diff-line diff-inserted">${escapeHtml(lineB)}</div>`;
                }
            }
            i++; // Skip the next diff block since we've processed it
        } else {
            // Process standalone inserts, deletes, and equals
            for (const line of lines) {
                const escapedLine = escapeHtml(line) || '&nbsp;';
                if (op === DIFF_INSERT) {
                    htmlA += `<div class="diff-line diff-placeholder">&nbsp;</div>`;
                    htmlB += `<div class="diff-line diff-inserted">${escapedLine}</div>`;
                } else if (op === DIFF_DELETE) {
                    htmlA += `<div class="diff-line diff-deleted">${escapedLine}</div>`;
                    htmlB += `<div class="diff-line diff-placeholder">&nbsp;</div>`;
                } else { // DIFF_EQUAL
                    htmlA += `<div class="diff-line">${escapedLine}</div>`;
                    htmlB += `<div class="diff-line">${escapedLine}</div>`;
                }
            }
        }
    }
    return { htmlA, htmlB };
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}