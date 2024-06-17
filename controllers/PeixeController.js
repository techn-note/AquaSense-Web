import express from "express";
import { getUserImagePath } from "../services/userImagem.js";
import PeixeService from "../services/PeixeService.js";
import Auth from "../middleware/Auth.js";

const router = express.Router();


router.get("/cadastroPeixe", Auth, async (req, res) => {
    try {
        const user = req.session.user;
        const userImage = getUserImagePath(user.name);

            PeixeService.selectAll().then((peixes) => {
                res.render("cadastroPeixe", {
                    peixes : peixes,
                    user: {
                        name: user.name,
                        email: user.email,
                        image: userImage
                    },
                    url: req.url
                });
            })
    } catch (error) {
        res.status(500).send(`Erro ao cadastrar peixe: ${error.message}`);
    }
});

router.post("/cadastroPeixe/new", async (req, res) => {
    try {
        const nomePeixe = req.body.nomePeixe;
        const idade = req.body.idade;
        const especie = req.body.especie;
        const peso = req.body.peso;
        const quantidade = req.body.quantidade;

        await PeixeService.create(nomePeixe, idade, especie, peso, quantidade);

        res.redirect("/cadastroPeixe")
        req.flash("success", "Peixe cadastrado com sucesso!!");
    } catch (error) {
        res.status(500).send(`Erro ao cadastrar peixe: ${error.message}`)
    }
})

router.get("/cadastroPeixe/delete/:id", (req, res) => {
    const id = req.params.id
    PeixeService.Delete(id)
    res.redirect("/cadastroPeixe")
  })
  
  // ROTA DE EDIÇÃO DE CLIENTE
  router.get("/cadastroPeixe/edit/:id", (req, res) => {
    try {
        const user = req.session.user;
        const userImage = getUserImagePath(user.name);
        const id = req.params.id;
        PeixeService.SelectOne(id).then((peixe) => {
          res.render("cadastroPeixeEdit", {
            peixe: {
                nomePeixe: peixe.nomePeixe,
                idade: peixe.idade,
                especie: peixe.especie,
                peso: peixe.peso,
                quantidade: peixe.quantidade
            },
            user: {
                name: user.name,
                email: user.email,
                image: userImage
            },
            url: req.url
          })
        })
    } catch (error) {
        res.status(500).send(`Erro ao alterar: ${error.message}`)
    }
  })

  export default router