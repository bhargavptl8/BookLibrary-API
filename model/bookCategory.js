const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookCategorySchema = new Schema({

    bookCategoryName : {
        type : String,
        required : true,
    },
    bookCategoryImage : {
        type : String,
        required : true,
    }
})

const BookCategory  = mongoose.model('bookcategory',bookCategorySchema)

module.exports = BookCategory