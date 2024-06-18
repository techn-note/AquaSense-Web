import express from "express";
import { getUserImagePath } from "../services/userImagem.js";
import TanqueService from "../services/TanqueService.js";
import Auth from "../middleware/Auth.js";

const router = express.Router();

router.get("/cadastroTanque", Auth, async (req, res) => {
    try {
        const user = req.session.user;
        const userImage = getUserImagePath(user.name);

        TanqueService.selectAll().then((tanques) => {
            res.render("cadastroTanque", {
                tanques: tanques,
                user: {
                    name: user.name,
                    email: user.email,
                    image: userImage
                },
                url: req.url
            });
        })
    } catch (error) {
        res.status(500).send(`Erro ao cadastrar tanque: ${error.message}`);
    }
});

router.post("/cadastroTanque/new", async (req, res) => {
    try {
        const nomeTanque = req.body.nomeTanque;
        const capacidade = req.body.capacidade;
        const numero = req.body.numero;

        await TanqueService.Create(nomeTanque, capacidade, numero);

        req.flash("success", "Tanque cadastrado com sucesso!");
        res.redirect("/cadastroTanque");
    } catch (error) {
        res.status(500).send(`Erro ao cadastrar tanque: ${error.message}`);
    }
});

router.get("/cadastroTanque/delete/:id", (req, res) => {
    const id = req.params.id
    TanqueService.Delete(id)
    res.redirect("/cadastroTanque")
})

router.get("/cadastroTanque/edit/:id", (req, res) => {
    try {
        const user = req.session.user;
        const userImage = getUserImagePath(user.name);
        const id = req.params.id;

        TanqueService.SelectOne(id).then((tanque) => {
            res.render("cadastroTanqueEdit", {
                tanque: {
                    _id: tanque._id,
                    nomeTanque: tanque.nomeTanque,
                    capacidade: tanque.capacidade,
                    numero: tanque.numero
                },
                user: {
                    name: user.name,
                    email: user.email,
                    image: userImage
                },
                url: req.url
            })
        }).catch(error => {
            res.status(500).send(`Erro ao buscar tanque ${error.message}`)
        });
    } catch (error) {
        res.status(500).send(`Erro ao alterar: ${error.message}`)
    }
});

router.post("/cadastroTanque/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {nomeTanque, capacidade, numero} = req.body;

        if (!nomeTanque || typeof nomeTanque !== 'string') {
            throw new Error('Nome do peixe inválido');
        }
        if (!capacidade || isNaN(capacidade) || capacidade <= 0) {
            throw new Error('Capacidade inválido');
        }
        if (!numero || isNaN(numero) || numero <= 0) {
            throw new Error('Número inválido');
        }

        await TanqueService.Update(id, nomeTanque, capacidade, numero);
        res.redirect("/cadastroTanque")
    } catch (error) {
        req.flash("error", `Erro ao atualizar tanque: ${error.message}`)
        res.redirect(`/cadastroTanque/edit/${id}`)
    }
})

export default router