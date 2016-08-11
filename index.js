var path = require('path');
var merge = require('lodash.merge');
var imagick;

try {
    //Check if gm (Graphics Magick) is installed
    require.resolve('gm');

    imagick = require('gm').subClass({
        imageMagick: true
    });
} catch() {}

module.exports = function SuperPreviewClient(opts) {
    opts = merge({
        qTablePath: path.join(__dirname, 'q-table.xml')
    }, (options || {}));

    return {
        /**
         * Compress an inputBuffer (containing image data). Compressed
         * image data is returned to the callback function.
         *
         * @param inputBuffer Image data
         * @param cb function Callback function
         */
        compress: function compress(inputBuffer, cb) {
            if (!imagick) {
                console.warn('The npm module gm is not installed');
                return;
            }

            imagick(inputBuffer, 'image.jpg')
                .resize(42, 42)
                .extent(42, 42)
                .noProfile()
                .quality(20)
                .define('jpeg:q-table=' + opts.qTablePath)
                .define('jpeg:optimize-coding=false')
                .toBuffer('JPG', function(err, outputBuffer) {
                    if (err) {
                        return cb(err);
                    }

                    cb(null, outputBuffer);
                });
        },

        assemble: function assemble(inputBuffer, cb) {
            // Stich together the file from the super-preview buffer
        }
    }
}