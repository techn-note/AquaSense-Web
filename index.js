import express from "express"
import mongoose from "mongoose"
import session from "express-session"

const app = express()

app.use(session({
    secret: "aquasense",
    cookie: { maxAge: 7200000},
    saveUninitialized: false,
    resave: false
}))

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/aquasense")

app.set("view engine", "ejs")

app.use(express.static('public'))

app.get("/", function(req, res) {
    res.render("index")
})

app.listen(4000, function (erro) {
    if (erro) {
        console.log("Ocorreu um erro!")
    } else {
        console.log("Servidor iniciado com sucesso!")
    }
})