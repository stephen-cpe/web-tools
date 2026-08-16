document.addEventListener('DOMContentLoaded', function() {
    // Create a container for the footer to ensure it's always added
    const footerContainer = document.createElement('div');
    footerContainer.id = 'footer-container';
    document.body.appendChild(footerContainer);
    
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            if (document.getElementById('footer-container')) {
                document.getElementById('footer-container').innerHTML = data;
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation: error');
            // Fallback: add the full footer content if fetch fails
            const fallbackFooter = document.createElement('footer');
            fallbackFooter.className = 'site-footer';
            fallbackFooter.innerHTML = `
    <a href="https://github.com/stephen-cpe/study-and-learn" target="_blank">PROJECT 1</a> |
    <a href="https://github.com/stephen-cpe/notebook-project" target="_blank">PROJECT 2</a> |
    <a href="https://github.com/stephen-cpe/inventory_management_system" target="_blank">PROJECT 3</a> |
    <a href="https://github.com/stephen-cpe/eternal_fusion_pavilion" target="_blank">PROJECT 4</a> |
    <a href="#">PROJECT 5</a> |
    <a href="https://github.com/stephen-cpe/meteoric-garden-shop-v4" target="_blank">PROJECT 6</a> |
    <a href="https://stephen-cpe.github.io/" target="_blank">ABOUT</a>
`;
            document.body.appendChild(fallbackFooter);
        });
});