import express from "express"
import mongoose from "mongoose"
import session from "express-session"

import UsersController from "./controllers/UsersController.js"
import HomeController from "./controllers/HomeController.js"
import DadosController from "./controllers/DadosController.js"

import flash from 'express-flash'

const app = express()

app.use(flash())

app.use(session({
    secret: "aquasense",
    cookie: { maxAge: 7200000},
    saveUninitialized: false,
    resave: false
}))

app.use((req, res, next) => {
    res.locals.url = req.url;
    next();
  });

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/aquasense")

app.set("view engine", "ejs")

app.use(express.static('public'))

app.use("/", UsersController)
app.use("/", HomeController)
app.use("/", DadosController)

app.get("/", function(req, res) {
    res.render("index")
})

const port = 8000
app.listen(port, function (erro) {
    if (erro) {
        console.log("Ocorreu um erro!")
    } else {
        console.log(`Servidor iniciado com sucesso na porta ${port}!`)
    }
})