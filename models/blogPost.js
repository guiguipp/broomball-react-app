const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema ({
    author: ObjectId,
    body: String,
    date: Date
})

