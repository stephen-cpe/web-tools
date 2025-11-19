document.addEventListener('DOMContentLoaded', function() {
    const msseContainer = document.getElementById('msse-progress-container');
    if (msseContainer) {
        renderCourses(msseContainer, mssceCourses, true);
    }

    const otherContainer = document.getElementById('other-courses-container');
    if (otherContainer) {
        renderCourses(otherContainer, otherCourses, false);
    }

    const lightbox = new Lightbox('certificateLightbox', 'lightboxClose', 'lightboxImage', 'certificateDetailsContent');

    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('certificate-link')) {
            e.preventDefault();
            const certName = e.target.getAttribute('data-cert-name');
            const cert = certificatesData.find(c => c.name === certName);
            if (cert) {
                lightbox.show(cert);
            }
        }
    });
});

function renderCourses(container, courseData, isMSSE) {
    courseData.forEach(section => {
        const sectionElement = document.createElement(isMSSE ? 'details' : 'div');
        if (isMSSE) {
            sectionElement.className = 'course-section';
            sectionElement.open = true; // Optional: keep sections open by default
        }

        const titleElement = document.createElement(isMSSE ? 'summary' : 'h3');
        titleElement.textContent = section.title || section.platform;
        sectionElement.appendChild(titleElement);

        const contentWrapper = isMSSE ? document.createElement('div') : sectionElement;
        if (isMSSE) {
            contentWrapper.className = 'details-content';
            sectionElement.appendChild(contentWrapper);
        }

        const completedCount = section.courses.filter(c => c.status === 'complete').length;
        const totalCount = section.courses.length;
        const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

        if (isMSSE) {
            sectionElement.dataset.progress = progress;
            titleElement.textContent += ` (${Math.round(progress)}%)`;
            const progressBarContainer = document.createElement('div');
            progressBarContainer.className = 'progress-bar-container';
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${Math.round(progress)}%`;
            progressBarContainer.appendChild(progressBar);
            contentWrapper.appendChild(progressBarContainer);
        }

        const ul = document.createElement('ul');
        section.courses.forEach(course => {
            const li = document.createElement('li');
            const statusSpan = document.createElement('span');
            statusSpan.className = `status ${course.status}`;
            statusSpan.textContent = course.status === 'complete' ? '✓' : '●';
            li.appendChild(statusSpan);

            if (course.certificate) {
                const anchor = document.createElement('a');
                anchor.href = '#';
                anchor.className = 'certificate-link';
                anchor.dataset.certName = course.certificate.name;
                anchor.textContent = ` ${course.name}`;
                li.appendChild(anchor);
            } else {
                li.innerHTML += ` ${course.name}`;
            }
            ul.appendChild(li);
        });
        contentWrapper.appendChild(ul);
        container.appendChild(sectionElement);
    });
}
