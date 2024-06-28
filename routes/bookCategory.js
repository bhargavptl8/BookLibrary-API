var express = require('express');
var router = express.Router();
const multer  = require('multer')
var bookCategoryController = require('../controller/bookCategory');
var adminAuthentication = require('../authentication/admin');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/create', adminAuthentication.sequre, upload.single('bookCategoryImage'), bookCategoryController.BookCategoryCreate);
router.get('/find', adminAuthentication.sequre, bookCategoryController.BookCategoryFind);
router.delete('/delete/:bookCategoryId', adminAuthentication.sequre, bookCategoryController.BookCategoryDelete);
router.patch('/update/:bookCategoryId', adminAuthentication.sequre, upload.single('bookCategoryImage'), bookCategoryController.BookCategoryUpdate);

module.exports = router;
