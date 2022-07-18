const express = require("express")

//set up express
const app = express()

//connect to mongoDB
const dbUser = "mongodb+srv://joannaterm:jk6HV@cluster0.a9gur.mongodb.net/?retryWrites=true&w=majority"

app.listen(3000)

//set up EJS
app.set("view engine", "ejs")

//middleware (connect css stylesheet)
app.use(express.static("public"))

app.get("/", (req, res) => {
    const blogs = [
        {name: "title1", snippet: "snippet 1..."},
        {name: "title2", snippet: "snippet 2..."},
        {name: "title3", snippet: "snippet 3..."}
    ]
    res.render("index", {title: "Home", blogs:blogs})
})

app.get("/about", (req, res) => {
    res.render("about", {title: "About"})
})

app.get("/blogs/create", (req, res) => {
    res.render("createBlogs", {title: "Create"})
})

app.use((req, res) => {
    res.status(404).render("404", {title: "Error"})
})