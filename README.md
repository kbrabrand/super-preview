# Super preview
Super preview takes the work out of creating beautify, tiny thumbnails that's small enough to be embedded in responses, which can in turn be easily assembled to a proper image on the client.

This contains both compression and image assembler, and can be used client or server side.

## Inspiration
The package was inspired by a [blog post](https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/) on the Facebook Code blog explaining the tech behind their tiny, blurry and beautify cover photos.

## How does it work?
In a nutshell it does the following on the server side:

1. Scale down the image to a 42x42 pixel image (adding a white area on the side depending on the aspect ratio)
2. Compress it using a predefined JPEG quantization table
3. Strip away image headers, huffman tables and other data that will be the same because we're using the same Q-table for all images.
4. Prepend the width and height of the image.

The buffer returned from the `compress()` function is small enough to be returned inline in markup or as part of an API response.

## Example
### Compressing an image
```js
var SuperPreviewClient = require('super-preview-client');
var client = new SuperPreviewClient();

client.compress(
    fs.readFileSync('my-image.jpeg'),
    function(err, compressed) {
        /**
         * compressed contains:
         * {
         *     compressed: '...', // data
         *     width: 1234, // original image width
         *     height: 645, // original image height
         * }
         */
    }
);
```

### Assembling a compressed data
```js
var SuperPreviewClient = require('super-preview-client');
var client = new SuperPreviewClient();

// imageData = { base64: '...' };
var imageData = client.assemble(this.props.compressed);

// Exposing in a react component
() => (
    <img style={{
        height: imageData.height,
        width: imageData.width,
        background: `url(data:image/jpeg;base64,${ imageData.base64 })`
    }} />
)
```

## Dependencies
### Compressing images
Super preview depends on the `gm` (GraphicsMagick) package when scaling images.

### Assembling images
Assembling images has no other dependencies than `lodash.merge`, and will work both on the client and server.

## Response format
The `assemble()` function takes care of parsing the data string returned from the server. The underlying data is composed from three different segments, structured in the following way:

```sh
42:33:<image data as hexadecimal values>
```

##  License

Copyright (c) 2015-2016,
Kristoffer Brabrand kristoffer@brabrand.no

Licensed under the MIT License