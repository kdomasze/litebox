document.addEventListener('DOMContentLoaded', () => {
    const anchors: NodeListOf<Element> = document.querySelectorAll('a[data-lightbox]');

    anchors.forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            // prevents the anchor from redirecting
            event.preventDefault();

            // get path to full image
            let imageSrc: string = '';
            if (
                anchor.getAttribute('href') !== null &&
                (anchor.getAttribute('href') as string) !== ''
            ) {
                imageSrc = anchor.getAttribute('href') as string;
            }

            // get alt text
            const imgChild = anchor.querySelector('img');
            let imageAlt: string = '';
            if (imgChild !== null && imgChild.getAttribute('alt') !== null) {
                imageAlt = imgChild.getAttribute('alt') as string;
            }

            // build lightbox
            buildLightbox(imageSrc, imageAlt);
            return;
        });
    });
});

const buildLightbox = (imageSrc: string, imageAlt: string) => {
    const lightboxTemplate = document.querySelector('#template-lightbox');

    let output: string = '';
    if (lightboxTemplate !== null) {
        output = lightboxTemplate.innerHTML
            .replace(/{{image_src}}/g, imageSrc)
            .replace(/{{image_alt}}/g, imageAlt);
    }

    // append lightbox to body
    const body = document.querySelector('body');
    if (body !== null) {
        body.insertAdjacentHTML('beforeend', output);
    }

    addLightboxEventListeners();
};

const addLightboxEventListeners = () => {
    const lightbox = document.getElementById('lightbox');

    // close lightbox with escape
    if (lightbox !== null) {
        document.addEventListener('keyup', (event) => {
            if (event.key === 'Escape') {
                exitLightbox(lightbox);
            }
        });

        // close lightbox with x
        const exit = lightbox.querySelector('#lightbox-exit');
        if (exit !== null) {
            exit.addEventListener('click', (event) => {
                exitLightbox(lightbox);
            });
        }
    }
};

const exitLightbox = (lightbox: HTMLElement) => {
    const parent = lightbox.parentNode;
    if (parent !== null) {
        parent.removeChild(lightbox);
    }
};
