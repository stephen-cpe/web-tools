// Initialize the Mermaid diagram tool with panning and zooming capabilities
document.addEventListener('DOMContentLoaded', async function() {
    // Wait for Mermaid to be fully loaded
    if (typeof mermaid !== 'undefined') {
        // Reinitialize with updated settings if needed
        mermaid.initialize({ 
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: 'Arial',
            fontSize: 14
        });
    }

    // DOM Elements
    const mermaidInput = document.getElementById('mermaid-input');
    const mermaidOutput = document.getElementById('mermaid-output');
    const generateBtn = document.getElementById('mermaid-generate');
    const copyBtn = document.getElementById('mermaid-copy');
    const resetBtn = document.getElementById('mermaid-reset');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomDisplay = document.querySelector('.mermaid-zoom-display');

    // Initialize zoom level
    let zoomLevel = 100; // Percentage
    // Add these new variables for panning functionality
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    let lastTranslateX = 0;
    let lastTranslateY = 0;

    // Initialize with a sample diagram after a short delay to ensure Mermaid is ready
    setTimeout(() => {
        if (typeof mermaid !== 'undefined') {
            generateDiagram();
        } else {
            mermaidOutput.innerHTML = '<div class="mermaid-error">Mermaid library failed to load</div>';
        }
    }, 500);

    // Generate diagram when button is clicked
    generateBtn.addEventListener('click', function() {
        if (typeof mermaid !== 'undefined') {
            generateDiagram();
        } else {
            mermaidOutput.innerHTML = '<div class="mermaid-error">Mermaid library failed to load</div>';
        }
    });

    // Copy diagram SVG to clipboard
    copyBtn.addEventListener('click', copyDiagram);

    // Reset to default diagram
    resetBtn.addEventListener('click', resetDiagram);

    // Zoom functionality
    zoomInBtn.addEventListener('click', function() {
        zoomLevel += 25; // Increase zoom by 25%
        if (zoomLevel > 300) zoomLevel = 300; // Max zoom 300%
        updateZoom();
    });

    zoomOutBtn.addEventListener('click', function() {
        zoomLevel -= 25; // Decrease zoom by 25%
        if (zoomLevel < 25) zoomLevel = 25; // Min zoom 25%
        updateZoom();
    });

    // Generate diagram when input changes (with debounce)
    let debounceTimer;
    mermaidInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
            if (typeof mermaid !== 'undefined') {
                generateDiagram();
            }
        }, 500); // 500ms delay
    });

    // Generate the Mermaid diagram
    async function generateDiagram() {
        const code = mermaidInput.value.trim();
        if (!code) {
            mermaidOutput.innerHTML = '<div class="mermaid-placeholder">Enter Mermaid code to generate diagram</div>';
            return;
        }
        try {
            // Clear previous diagram
            mermaidOutput.innerHTML = '';
            // Render the Mermaid diagram - using the async version
            const {svg, bindFunctions} = await mermaid.render('mermaid-svg-' + Date.now(), code);
            mermaidOutput.innerHTML = svg;
            // Bind any event handlers if needed
            if (bindFunctions) {
                bindFunctions(mermaidOutput);
            }
            // Add responsive styling to the SVG
            const svgElement = mermaidOutput.querySelector('svg');
            if (svgElement) {
                svgElement.style.maxWidth = '100%';
                svgElement.style.height = 'auto';
                // Apply zoom level and translation for panning
                svgElement.style.transform = `scale(${zoomLevel / 100}) translate(${translateX}px, ${translateY}px)`;
                svgElement.style.transformOrigin = '0 0'; // Important for proper panning
                svgElement.style.display = 'block';
                svgElement.style.margin = '0 auto';
                svgElement.style.cursor = 'move';
                svgElement.style.userSelect = 'none';
                
                // Set up event listeners for panning
                svgElement.addEventListener('mousedown', startDragging);
                svgElement.addEventListener('touchstart', handleTouchStart);
            }
        } catch (error) {
            mermaidOutput.innerHTML = `<div class="mermaid-error">Error: ${error.message}</div>`;
            console.error('Mermaid diagram generation error:', error);
        }
    }

    // Copy diagram to clipboard
    function copyDiagram() {
        const svgElement = mermaidOutput.querySelector('svg');
        if (!svgElement) {
            alert('No diagram to copy. Please generate a diagram first.');
            return;
        }
        // Get the SVG as text
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        // Try to copy to clipboard
        if (navigator.clipboard && window.ClipboardItem) {
            navigator.clipboard.write([
                new ClipboardItem({
                    'image/svg+xml': blob
                })
            ]).then(() => {
                alert('Diagram copied to clipboard as SVG!');
            }).catch(err => {
                console.error('Failed to copy diagram: ', err);
                fallbackCopyTextToClipboard(svgData);
            });
        } else {
            fallbackCopyTextToClipboard(svgData);
        }
    }

    // Fallback copy method
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        // Avoid scrolling to bottom
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'Diagram copied to clipboard!' : 'Unable to copy diagram';
            alert(msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            alert('Failed to copy diagram. Please copy the text manually.');
        }
        document.body.removeChild(textArea);
    }

    // Reset to default diagram
    function resetDiagram() {
        mermaidInput.value = `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process Yes]
    B -->|No| D[Process No]
    C --> E[End]
    D --> E`;
        
        // Reset zoom and pan
        zoomLevel = 100;
        translateX = 0;
        translateY = 0;
        lastTranslateX = 0;
        lastTranslateY = 0;
        
        if (typeof mermaid !== 'undefined') {
            generateDiagram();
            updateZoom();
        }
    }

    // Update zoom level and apply to the SVG
    function updateZoom() {
        zoomDisplay.textContent = `${zoomLevel}%`;
        // Apply zoom and translation to the currently displayed diagram
        const svgElement = mermaidOutput.querySelector('svg');
        if (svgElement) {
            svgElement.style.transform = `scale(${zoomLevel / 100}) translate(${translateX}px, ${translateY}px)`;
            svgElement.style.transformOrigin = '0 0';
        }
    }

    // Panning event handlers
    function startDragging(e) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        mermaidOutput.style.cursor = 'grabbing';
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);
        
        // Prevent text selection while dragging
        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;
        
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        
        updateSvgTransform();
    }

    function stopDragging() {
        isDragging = false;
        mermaidOutput.style.cursor = 'move';
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDragging);
        
        // Save position for next drag
        lastTranslateX = translateX;
        lastTranslateY = translateY;
    }

    function handleTouchStart(e) {
        if (e.touches.length === 1) {
            isDragging = true;
            startX = e.touches[0].clientX - translateX;
            startY = e.touches[0].clientY - translateY;
            mermaidOutput.style.cursor = 'grabbing';
            
            e.preventDefault(); // Prevent scrolling while touching
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);
        }
    }

    function handleTouchMove(e) {
        if (!isDragging || e.touches.length !== 1) return;
        
        e.preventDefault(); // Prevent scrolling while touching
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        
        updateSvgTransform();
    }

    function handleTouchEnd() {
        isDragging = false;
        mermaidOutput.style.cursor = 'move';
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        
        // Save position for next drag
        lastTranslateX = translateX;
        lastTranslateY = translateY;
    }

    function updateSvgTransform() {
        const svgElement = mermaidOutput.querySelector('svg');
        if (svgElement) {
            svgElement.style.transform = `scale(${zoomLevel / 100}) translate(${translateX}px, ${translateY}px)`;
        }
    }
});