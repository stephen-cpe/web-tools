class Lightbox {
    constructor(lightboxId, closeId, imageId, detailsId) {
        this.lightbox = document.getElementById(lightboxId);
        this.closeButton = document.getElementById(closeId);
        this.lightboxImage = document.getElementById(imageId);
        this.lightboxDetails = document.getElementById(detailsId);
        this.active = false;

        this.closeButton.addEventListener('click', () => this.close());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (this.active && e.key === 'Escape') {
                this.close();
            }
        });
    }

    show(cert) {
        this.lightboxImage.src = `certificates/${cert.filename}`;
        let credlyLinkHtml = '';
        if (cert.credlyUrl) {
            credlyLinkHtml = `<p><a href="${cert.credlyUrl}" target="_blank" rel="noopener noreferrer" class="certificate-link">View on Credly</a></p>`;
        }
        this.lightboxDetails.innerHTML = `
            <h3>${cert.name}</h3>
            <p><strong>Certificate:</strong> ${cert.name}</p>
            <p><strong>Issuer:</strong> ${cert.issuer}</p>
            <p><strong>Date:</strong> ${cert.dateFormatted}</p>
            <p><strong>Filename:</strong> ${cert.filename}</p>
            ${credlyLinkHtml}
        `;
        this.lightbox.classList.add('active');
        this.active = true;
    }

    close() {
        this.lightbox.classList.remove('active');
        this.active = false;
    }
}
