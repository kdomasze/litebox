# Litebox
A clone of the basic functionalities of Lightbox without external libraries.

A demo is available [here](https://kdomasze.github.io/litebox/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

#### Required

-   [Sass](https://sass-lang.com/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Node.js](https://nodejs.org/en/)

This project makes use of TSLint for linting and Prettier for formatting.

### Compilation

Run `npm install` from the root project directory to download all the required development dependancies.

Run `npm run build` from the root project directory to compile the Sass and Typescript files and output them to the correct destination.

### Deployment

Add `litebox.css` and `litebox.js` to your project. Link both files in the header of your html page. 

### Usage

To create a Litebox link, adapt the following example to you needs:
```
<a href="image.jpg" data-litebox data-litebox-description="My image description">
    <img src="thumbnail.jpg" alt="Alt text for thumbnail">
</a>
```

`image.jpg` should point to the full sized image that the Litebox will display.

`thumbnail.jpg` should point to a lower resolution image that will act as a preview.

`data-litebox-description` is optional and will create a description under the image when the Litebox is invoked. It supports HTML tags.

#### Additional Options

Litebox can be invoked manually in javascript by making use of the method `Litebox.invoke()` and passing in the required parameters. This allows for more flexiblity in the application of Litebox.

In addition, several options can be changed for Litebox by passing an object into the constructor for `Litebox`. The available options are listed below:
-   `enableEscClose`: default - `true`. Toggles whether pressing escape on the keyboard will close the Litebox.
-   `enableExitButton`: default - `true`. Toggles whether an 'x' will be displayed under the Litebox to close.
-   `fadeInTime`: default - `300`. Defines the time it will take for the Litebox to fade-in (in ms).
-   `fadeOutTime`: default - `300`. Defines the time it will take for the Litebox to fade-out (in ms).

## Todo

-   Convert project into a module (most likely for require.js).
-   Add a few more options.

## Built With

-   [Node.js](https://nodejs.org/en/) - The JavaScript runtime used to run tooling
-   [Sass](https://sass-lang.com/) - the CSS Preprocessor used
-   [Typescript](https://www.typescriptlang.org/) - The compile-to-JavaScript language used

## Authors

-   **Kyle Domaszewicz** - [kdomasze](https://github.com/kdomasze)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

-   Functionality of the original [Lightbox](https://lokeshdhakar.com/projects/lightbox2/) analized for this implementation.
