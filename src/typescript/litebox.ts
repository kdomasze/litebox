class Litebox {
    private litebox: HTMLElement | null = null;
    private options = {
        enableEscClose: true,
        enableExitButton: true,
        fadeInTime: 300,
        fadeOutTime: 300
    };

    invoke = (anchor: Element) => {
        // get path to full image
        let imageSrc: string = '';
        if (
            anchor.getAttribute('href') !== null &&
            (anchor.getAttribute('href') as string) !== ''
        ) {
            imageSrc = anchor.getAttribute('href') as string;
        }

        // get description
        let description: string = '';
        if (
            anchor.getAttribute('data-litebox-description') !== null &&
            (anchor.getAttribute('data-litebox-description') as string) !== ''
        ) {
            description = anchor.getAttribute('data-litebox-description') as string;
        }

        // get alt text
        const imgChild = anchor.querySelector('img');
        let imageAlt: string = '';
        if (imgChild !== null && imgChild.getAttribute('alt') !== null) {
            imageAlt = imgChild.getAttribute('alt') as string;
        }

        // build litebox
        let output: HTMLElement = this.build(imageSrc, imageAlt, description);

        // append litebox to body
        const body = document.querySelector('body');
        if (body === null) return;
        body.appendChild(output);

        this.litebox = document.getElementById('js-litebox');
        if (this.litebox === null) return;

        // close litebox with x
        if(this.options.enableExitButton) {
            const exit = this.litebox.querySelector('#js-litebox-exit');
            if (exit === null) return;
            exit.addEventListener('click', () => {
                this.exit(this.litebox as HTMLElement);
            });
        } else {
            const exit = this.litebox.querySelector('#js-litebox-exit');

            if(exit === null) return;
            const parent = exit.parentNode;

            if(parent == null) return;
            parent.removeChild(exit);
            document.removeEventListener('keyup', this.escapeEvent);
        }

        // close litebox with escape
        if(this.options.enableEscClose) {
            document.addEventListener('keyup', this.escapeEvent);
        }

        fadeIn(this.litebox, this.options.fadeInTime);
    }

    exit = (litebox: HTMLElement) => {
        if(litebox === null) return;

        const parent = litebox.parentNode;
        if (parent === null) return;

        fadeOut(litebox, this.options.fadeOutTime, () => {
            parent.removeChild(litebox);
        });
        this.litebox = null;
    }

    private escapeEvent = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            this.exit(this.litebox as HTMLElement);
        }
    }

    private build = (imageSrc: string, imageAlt: string, description: string): HTMLElement => {
        let liteboxDiv = document.createElement('div');
        liteboxDiv.setAttribute('class', 'litebox');
        liteboxDiv.setAttribute('id', 'js-litebox');

        let contentDiv = document.createElement('div');
        contentDiv.setAttribute('class', 'litebox-content');
        liteboxDiv.appendChild(contentDiv);

        let img = document.createElement('img');
        img.setAttribute('src', imageSrc);
        img.setAttribute('alt', imageAlt);
        contentDiv.appendChild(img);

        let descriptionParagraph = document.createElement('p');
        descriptionParagraph.innerHTML = description;
        contentDiv.appendChild(descriptionParagraph);

        let exitDiv = document.createElement('div');
        exitDiv.setAttribute('class', 'litebox-exit');
        liteboxDiv.appendChild(exitDiv);

        let exitSpan = document.createElement('span');
        exitSpan.setAttribute('id', 'js-litebox-exit');
        exitSpan.innerText = '×';
        exitDiv.appendChild(exitSpan);

        return liteboxDiv as HTMLElement;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const anchors: NodeListOf<Element> = document.querySelectorAll('a[data-litebox]');

    const litebox: Litebox = new Litebox();

    anchors.forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            // prevents the anchor from redirecting
            event.preventDefault();
            litebox.invoke(anchor);
            return;
        });
    });
});

const fadeIn = (element: HTMLElement, duration: number) => {
    element.style.opacity = '0';
    element.style.display = 'block';

    let end = +new Date() + duration;

    (function fade() {
        let current = +new Date();
        let remaining = end - current;

        if(remaining < 60) {
            element.style.opacity = '1';
            return;
        } else {
            let rate = 1 - remaining / duration;
            element.style.opacity = rate.toString();
        }

        requestAnimationFrame(fade);
    })();
}

const fadeOut = (element: HTMLElement, duration: number, callback: () => any) => {
    element.style.opacity = '1';

    let end = +new Date() + duration;

    (function fade() {
        let current = +new Date();
        let remaining = end - current;

        if(remaining < 60) {
            element.style.opacity = '0';
            element.style.display = 'none';
            callback();
            return;
        } else {
            let rate = 1 - remaining / duration;
            element.style.opacity = (1 - rate).toString();
        }

        requestAnimationFrame(fade);
    })();
}