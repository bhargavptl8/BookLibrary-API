var express = require('express');
var router = express.Router();
const multer = require('multer')
var bookLibraryController = require('../controller/bookLibrary');
var adminAuthentication = require('../authentication/admin');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {


        let imageFileExtension = ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp', 'apng', 'avif', 'gif']

        let extension = file.originalname.split('.').reverse()[0];

        if (imageFileExtension.includes(extension)) {
            cb(null, 'public/images')
        }
        else {
            cb(null, 'public/pdf')
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage })

let filed = [
    { name: 'bookImage', maxCount: 1 },
    { name: 'bookPdf', maxCount: 1 }
]

router.post('/create', adminAuthentication.sequre, upload.fields(filed), bookLibraryController.BookLibraryCreate);
router.get('/find', adminAuthentication.sequre, bookLibraryController.BookLibraryFind);
router.delete('/delete/:bookLibraryId', adminAuthentication.sequre, bookLibraryController.BookLibraryDelete);
router.patch('/update/:bookLibraryId', adminAuthentication.sequre, upload.fields(filed), bookLibraryController.BookLibraryUpdate);

module.exports = router;
