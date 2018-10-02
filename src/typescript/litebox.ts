// TODO: create object to house options for litebox
// probably move all functions into a class

document.addEventListener('DOMContentLoaded', () => {
    const anchors: NodeListOf<Element> = document.querySelectorAll('a[data-litebox]');

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

            // build litebox
            buildLitebox(imageSrc, imageAlt);
            return;
        });
    });
});

const buildLitebox = (imageSrc: string, imageAlt: string) => {
    const liteboxTemplate = document.querySelector('#template-litebox');

    let output: string = '';
    if (liteboxTemplate !== null) {
        output = liteboxTemplate.innerHTML
            .replace(/{{image_src}}/g, imageSrc)
            .replace(/{{image_alt}}/g, imageAlt);
    }

    // append litebox to body
    const body = document.querySelector('body');
    if (body !== null) {
        body.insertAdjacentHTML('beforeend', output);
    }

    addLiteboxEventListeners();
};

const addLiteboxEventListeners = () => {
    const litebox = document.getElementById('js-litebox');

    // close litebox with escape
    if (litebox !== null) {
        document.addEventListener('keyup', (event) => {
            if (event.key === 'Escape') {
                exitLitebox(litebox);
            }
        });

        // close litebox with x
        const exit = litebox.querySelector('#js-litebox-exit');
        if (exit !== null) {
            exit.addEventListener('click', (event) => {
                exitLitebox(litebox);
            });
        }

        fadeIn(litebox);
    }
};

const exitLitebox = (litebox: HTMLElement) => {
    const parent = litebox.parentNode;
    if (parent !== null) {
        fadeOut(litebox, () => parent.removeChild(litebox));
    }
};

const fadeIn = (element: HTMLElement) => {
    element.style.opacity = '0';
    element.style.display = 'block';

    (function fade() {
        let value = parseFloat(element.style.opacity);
        value += 0.1;
        if(!(value > 1)) {
            element.style.opacity = value.toString();
            requestAnimationFrame(fade);
        }
    })();
}

const fadeOut = (element: HTMLElement, callback: () => any) => {
    element.style.opacity = '1';

    (function fade() {
        let value = parseFloat(element.style.opacity);
        value -= 0.1;
        if(value < 0) {
            element.style.display = 'none';
            callback();
        } else {
            element.style.opacity = value.toString();
            requestAnimationFrame(fade);
        }
    })();
}