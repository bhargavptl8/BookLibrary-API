const mongoose = require('mongoose');
const moment = require('moment-timezone');
const Schema = mongoose.Schema;

const bookLibrarySchema = new Schema({

    bookName : {
        type : String,
        required : true,
    },
    bookImage : [{
        type : String,
        required : true,
    }],
    bookPdf : [{
        type : String,
        required : true,
    }],
    bookCategory : {
        type : Schema.Types.ObjectId,
        ref : 'bookcategory'
    },
    bookAuthor : {
        type : String,
        required : true,
    },
    readCount_view : {
        type : Number,
        default : 0
    },
    publish_Date : {
        type : String,
        default : () => moment().format('L')
    }

})

const BookLibrary  = mongoose.model('booklibrary',bookLibrarySchema)

module.exports = BookLibrary