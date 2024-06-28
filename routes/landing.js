var express = require('express');
var router = express.Router();
var BookLibrary = require('../model/bookLibrary');
var bookCategoryController = require('../controller/bookCategory');
var bookLibraryController = require('../controller/bookLibrary');

router.get('/bookcategory/find',bookCategoryController.BookCategoryFind)
router.get('/booklibrary/find',bookLibraryController.BookLibraryFind)

router.patch('/viewcount/update/:bookLibraryId', async (req, res) => {

    try {   

        let bookLibraryId = req.params.bookLibraryId

        let viewCountUpdate = await BookLibrary.findByIdAndUpdate(bookLibraryId, {$inc : {readCount_view : 1}}, {new : true})

        if(!viewCountUpdate)
            {
                throw new Error('BookLibrary Not Found')
            }

        res.status(201).json({
            status: 'Success',
            message: 'Book ViewCount Update SuccessFully',
            data : viewCountUpdate
        })
        
    } catch (error) {
        
        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
} )

module.exports = router;
