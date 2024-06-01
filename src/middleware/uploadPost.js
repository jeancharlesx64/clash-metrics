const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/upload/post');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        const extensionImage = [
            'image/png',
            'image/jpg',
            'image/jfif',
            'image/jpeg'
        ].find(formatAccepted => formatAccepted == file.mimetype);

        if (extensionImage) {
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    }
});
