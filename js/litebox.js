"use strict";
// TODO: create object to house options for litebox
// probably move all functions into a class
document.addEventListener('DOMContentLoaded', function () {
    var anchors = document.querySelectorAll('a[data-litebox]');
    anchors.forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            // prevents the anchor from redirecting
            event.preventDefault();
            // get path to full image
            var imageSrc = '';
            if (anchor.getAttribute('href') !== null &&
                anchor.getAttribute('href') !== '') {
                imageSrc = anchor.getAttribute('href');
            }
            // get alt text
            var imgChild = anchor.querySelector('img');
            var imageAlt = '';
            if (imgChild !== null && imgChild.getAttribute('alt') !== null) {
                imageAlt = imgChild.getAttribute('alt');
            }
            // build litebox
            buildLitebox(imageSrc, imageAlt);
            return;
        });
    });
});
var buildLitebox = function (imageSrc, imageAlt) {
    var liteboxTemplate = document.querySelector('#template-litebox');
    var output = '';
    if (liteboxTemplate !== null) {
        output = liteboxTemplate.innerHTML
            .replace(/{{image_src}}/g, imageSrc)
            .replace(/{{image_alt}}/g, imageAlt);
    }
    // append litebox to body
    var body = document.querySelector('body');
    if (body !== null) {
        body.insertAdjacentHTML('beforeend', output);
    }
    addLiteboxEventListeners();
};
var addLiteboxEventListeners = function () {
    var litebox = document.getElementById('js-litebox');
    // close litebox with escape
    if (litebox !== null) {
        document.addEventListener('keyup', function (event) {
            if (event.key === 'Escape') {
                exitLitebox(litebox);
            }
        });
        // close litebox with x
        var exit = litebox.querySelector('#js-litebox-exit');
        if (exit !== null) {
            exit.addEventListener('click', function (event) {
                exitLitebox(litebox);
            });
        }
    }
};
var exitLitebox = function (litebox) {
    var parent = litebox.parentNode;
    if (parent !== null) {
        parent.removeChild(litebox);
    }
};
//# sourceMappingURL=litebox.js.map