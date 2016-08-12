var path = require('path');
var merge = require('lodash.merge');

var imagick;
var imageHeaders = require('../assets/image-header');

try {
    //Check if gm (Graphics Magick) is installed
    require.resolve('gm');

    imagick = require('gm').subClass({
        imageMagick: true
    });
} catch(e) {}

module.exports = function(opts) {
    opts = opts || {};

    var qTablePath = opts.qTablePath || path.join(__dirname, '..', 'q-table.xml');

    return function compress(inputBuffer, cb) {
        if (!imagick) {
            console.warn('The npm module gm is not installed');
            return;
        }

        var image = imagick(inputBuffer, 'image.jpg');

        var size = image.size(function (err, size) {
            var ratio = size.width/size.height;

            if (ratio > 1) {
                width = 42;
                height = Math.floor(42 / ratio);
            } else {
                width = Math.floor(42 * ratio);
                height = 42;
            }

            imagick(inputBuffer, 'image.jpg')
                .resize(42, 42)
                .extent(42, 42)
                .noProfile()
                .quality(20)
                .define('jpeg:q-table=' + qTablePath)
                .define('jpeg:optimize-coding=false')
                .toBuffer('JPG', function(err, outputBuffer) {
                    var disposablePortionEnd = outputBuffer.indexOf(new Buffer([0xFF,0xDA]));

                    if (err) {
                        return cb(err);
                    }

                    // Return the image data part of the binary data buffer
                    cb(null, {
                        compressed: (
                            width + ':' +
                            height + ':' +
                            outputBuffer.slice(disposablePortionEnd + 2)
                        ),
                        width: size.width,
                        height: size.height
                    });
                });
        });
    }
};