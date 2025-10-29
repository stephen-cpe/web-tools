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
                let footerContent = data;
                // Check if the current page is about.html or certificates.html
                if (window.location.pathname.endsWith('about.html')) {
                    // Replace the ABOUT link with WEB TOOLS link
                    footerContent = footerContent.replace('<a href="about.html">ABOUT</a>', '<a href="index.html">WEB TOOLS</a>');
                } else if (window.location.pathname.endsWith('certificates.html')) {
                    // Replace the CERTIFICATES link with WEB TOOLS link
                    footerContent = footerContent.replace('<a href="certificates.html">CERTIFICATES</a>', '<a href="index.html">WEB TOOLS</a>');
                }
                document.getElementById('footer-container').innerHTML = footerContent;
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            // Fallback: add the full footer content if fetch fails
            const fallbackFooter = document.createElement('footer');
            fallbackFooter.className = 'site-footer';
            let fallbackContent = `
    <a href="https://github.com/stephen-cpe/inventory_management_system" target="_blank">PROJECT 1</a> |
    <a href="#">PROJECT 2</a> |
    <a href="#">PROJECT 3</a> |
    <a href="#">PROJECT 4</a> |
    <a href="#">PROJECT 5</a> |
    <a href="#">PROJECT 6</a> |
    <a href="certificates.html">CERTIFICATES</a> |
    <a href="about.html">ABOUT</a>
`;
            if (window.location.pathname.endsWith('about.html')) {
                fallbackContent = fallbackContent.replace('<a href="about.html">ABOUT</a>', '<a href="index.html">WEB TOOLS</a>');
            } else if (window.location.pathname.endsWith('certificates.html')) {
                fallbackContent = fallbackContent.replace('<a href="certificates.html">CERTIFICATES</a>', '<a href="index.html">WEB TOOLS</a>');
            }
            fallbackFooter.innerHTML = fallbackContent;
            document.body.appendChild(fallbackFooter);
        });
});
