const BookCategory = require('../model/bookCategory');


exports.BookCategoryCreate = async (req, res) => {

    try {

        let { bookCategoryName, bookCategoryImage } = req.body;

        bookCategoryImage = req.file?.filename

        let bookCategoryCreate = await BookCategory.create({ bookCategoryName, bookCategoryImage });

        res.status(201).json({
            status: 'Success',
            message: 'BookCategory Create SuccessFully',
            data: bookCategoryCreate
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.BookCategoryFind = async (req, res) => {

    try {

        let bookCategoryFind = await BookCategory.find()

        res.status(200).json({
            status: 'Success',
            message: 'BookCategory Find SuccessFully',
            data: bookCategoryFind
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.BookCategoryDelete = async (req, res) => {

    try {

        let bookCategoryId = req.params.bookCategoryId

        let bookCategoryDelete = await BookCategory.findByIdAndDelete(bookCategoryId)

        if(!bookCategoryDelete)
            {
                throw new Error('BookCategory Not Found')
            }

        res.status(301).json({
            status: 'Success',
            message: 'BookCategory Delete SuccessFully',
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}

exports.BookCategoryUpdate = async (req, res) => {

    try {

        let bookCategoryId = req.params.bookCategoryId

        let find = await BookCategory.findById(bookCategoryId)

        let{bookCategoryName} = req.body

        if(!bookCategoryName)
            {
                req.body.bookCategoryName = find?.bookCategoryName
            }

         req.body.bookCategoryImage = req.file?.filename

        let bookCategoryUpdate = await BookCategory.findByIdAndUpdate(bookCategoryId, req.body, {new : true})

        if(!bookCategoryUpdate)
            {
                throw new Error('BookCategory Not Found')
            }

        res.status(201).json({
            status: 'Success',
            message: 'BookCategory Update SuccessFully',
            data : bookCategoryUpdate
        })

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}