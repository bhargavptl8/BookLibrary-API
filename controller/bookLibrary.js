var BookLibrary = require('../model/bookLibrary');


exports.BookLibraryCreate = async (req, res) => {

    try {

        let { bookName, bookImage, bookPdf, bookCategory, bookAuthor } = req.body;

        bookImage = req.files.bookImage?.map((el) => el.filename)
        bookPdf = req.files.bookPdf?.map((el) => el.filename)

        let bookLibraryCreate = await BookLibrary.create({ bookName, bookImage, bookPdf, bookCategory, bookAuthor });

        res.status(201).json({
            status: 'Success',
            message: 'BookLibrary Create SuccessFully',
            data: bookLibraryCreate
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.BookLibraryFind = async (req, res) => {

    try {

        let bookLibraryFind = await BookLibrary.find().populate('bookCategory')

        res.status(200).json({
            status: 'Success',
            message: 'BookLibrary Find SuccessFully',
            data: bookLibraryFind
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.BookLibraryDelete = async (req, res) => {

    try {

        let bookLibraryId = req.params.bookLibraryId

        let bookLibraryDelete = await BookLibrary.findByIdAndDelete(bookLibraryId)

        if (!bookLibraryDelete) {
            throw new Error('BookLibrary Not Found')
        }

        res.status(301).json({
            status: 'Success',
            message: 'BookLibrary Delete SuccessFully',
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.BookLibraryUpdate = async (req, res) => {

    try {

        let bookLibraryId = req.params.bookLibraryId

        let find = await BookLibrary.findById(bookLibraryId)

        let { bookName, bookAuthor } = req.body

        if (!bookName) {
            req.body.bookName = find?.bookName
        }

        if (!bookAuthor) {
            req.body.bookAuthor = find?.bookAuthor
        }

        req.body.bookImage = req.files?.bookImage?.map((el) => el.filename )
        req.body.bookPdf = req.files?.bookPdf?.map((el) => el.filename )


        let bookLibraryUpdate = await BookLibrary.findByIdAndUpdate(bookLibraryId, req.body, { new: true })

        if (!bookLibraryUpdate) {
            throw new Error('BookLibrary Not Found')
        }

        res.status(201).json({
            status: 'Success',
            message: 'BookLibrary Update SuccessFully',
            data: bookLibraryUpdate
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}