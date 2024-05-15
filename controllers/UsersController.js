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

    const nome = req.body.nome
    const email = req.body.email
    const password = req.body.password

    UserService.SelectOne(email).then(user => {

        if (user == undefined) {

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            UserService.Create(email, hash)
            res.redirect("/login")

        } else {
            res.send(`Usuário já cadastrado!
        <br><a href="/cadastro">Tentar novamente.</a>`)
        }
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
                        email: user.email
                    }
                    res.redirect("/")
                } else {
                    res.send(`Senha inválida!
          <br><a href="/login">Tentar novamente.</a>`)
                }
            } else {
                res.send(`Usuário não existe.
        <br><a href="/login">Tentar novamente.</a>`)
            }
        })
    })
})

export default router