import express from "express"
import UserService from "../services/UserService.js"
import bcrypt from "bcrypt"

const router = express.Router()

// ROTA DE LOGIN
router.get("/login", (req, res) => {
    res.render("login", {
        loggedOut: true
    })
})

// ROTA DE CADASTRO DE USUÁRIO
router.get("/cadastro", (req, res) => {
    res.render("cadastro", {
        loggedOut: true
    })
})

// ROTA DE CRIAÇÃO DE USUÁRIO NO BANCO
router.post("/createUser", (req, res) => {

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    UserService.SelectOne(email).then(user => {

        if (user == undefined) {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            UserService.Create(name, email, hash)
            res.redirect("/login")

        } else {
            req.flash('danger', 'O usuário já está cadastrado! Faça o login.')
            res.redirect("/cadastro")
        }
    })


})

// ROTA DE AUTENTICAÇÃO
router.post("/authenticate", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    UserService.SelectOne(email).then(user => {

        if (user != undefined) {
            const correct = bcrypt.compareSync(password, user.password)

            if (correct) {
                req.session.user = {
                    id: user._id,
                    email: user.email,
                    name: user.nome
                }
                req.flash('success', 'Login efetuado com sucesso!')
                res.redirect("/home")
            } else {
                req.flash('danger', 'A senha informada está incorreta! Tente novamente.')
                res.redirect("/login")
            }
        } else {
            req.flash('danger', 'O usuário informado não existe! Verifique os dados digitados.')
            res.redirect("/login")
        }
    })
})

export default router