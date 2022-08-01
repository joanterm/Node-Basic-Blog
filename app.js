const express = require("express")
//to be able to use mongoDB
const mongoose = require("mongoose")
const morgan = require("morgan")
//secure password with dotenv
require('dotenv').config()
//schema
const Blog = require("./models/blog")
//set up express
const app = express()
//connect morgan if desired
app.use(morgan("dev"))

//connect to mongoDB and secure password
const dbUser = process.env.MONGOURI
mongoose.connect(dbUser)
    .then((result) => {
        console.log("connected to mongodb")
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })

//set up EJS
app.set("view engine", "ejs")
//middleware (connect css stylesheet)
app.use(express.static("public"))
// middleware (access form values)
app.use(express.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.redirect("/blogs")
})

app.get("/about", (req, res) => {
    res.render("about", {title: "About"})
})

//( ~ GET ~ )
app.get("/blogs", (req, res) => {
    Blog.find().sort({createdAt: -1}) //new first
        .then((response) => {
            res.render("index", {title: "Blogs", blogs: response})
        })
        .catch((err) => {
            console.log(err)
        })
})

//( ~ POST ~ )
app.post("/blogs", (req, res) => {
    const newBlog = new Blog(req.body)
    newBlog.save()
        .then((response) => {
            res.redirect("/blogs")
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get("/blogs/create", (req, res) => {
    res.render("createBlogs", {title: "Create"})
})

//( ~ GET ~ ) single blog
app.get("/blogs/:id", (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((response) => {
            res.render("create", {blogs: response, title: "Blog by ID"})
        })
        .catch((err) => {
            console.log(err)
        })
})

//(~ DELETE ~) and redirect
app.get("/blogs/delete/:id", (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then((response) => {
            res.redirect("/blogs")
        })
        .catch((err) => {
            console.log(err)
        })
})

//404
app.use((req, res) => {
    res.status(404).render("404", {title: "Error"})
})