const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        title: String,
        required: true
    },
    body: {
        title: String,
        required: true
    }
}, {
    timestamps: true
})

const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog