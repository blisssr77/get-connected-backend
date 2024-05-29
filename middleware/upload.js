const multer = require('multer');
const path = require('path');

<<<<<<< HEAD
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb) {
=======
// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
>>>>>>> origin/main
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

<<<<<<< HEAD
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('photo'); // 'photo' is the field name sent from the client

=======
// Initialize upload variable
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('photo');

// Check file type
>>>>>>> origin/main
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

<<<<<<< HEAD
module.exports = upload;
=======
module.exports = upload;
>>>>>>> origin/main