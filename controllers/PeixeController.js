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
                peixes: peixes,
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
        req.flash("success", "Peixe cadastrado com sucesso!");
    } catch (error) {
        res.status(500).send(`Erro ao cadastrar peixe: ${error.message}`)
    }
})

router.get("/cadastroPeixe/delete/:id", (req, res) => {
    const id = req.params.id
    PeixeService.Delete(id)
    res.redirect("/cadastroPeixe")
})

// ROTA DE EDIÇÃO DE PEIXE
router.get("/cadastroPeixe/edit/:id", (req, res) => {
    try {
        const user = req.session.user;
        const userImage = getUserImagePath(user.name);
        const id = req.params.id;

        PeixeService.SelectOne(id).then((peixe) => {
            res.render("cadastroPeixeEdit", {
                peixe: {
                    _id: peixe._id,
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
        }).catch(error => {
            res.status(500).send(`Erro ao buscar peixe: ${error.message}`)
        });
    } catch (error) {
        res.status(500).send(`Erro ao alterar: ${error.message}`)
    }
});


router.post("/cadastroPeixe/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { nomePeixe, idade, especie, peso, quantidade } = req.body;

        if (!nomePeixe || typeof nomePeixe !== 'string') {
            throw new Error('Nome do peixe inválido');
        }
        if (!idade || isNaN(idade) || idade <= 0) {
            throw new Error('Idade inválida');
        }
        if (!especie || typeof especie !== 'string') {
            throw new Error('Espécie inválida');
        }
        if (!peso || isNaN(peso) || peso <= 0) {
            throw new Error('Peso inválido');
        }
        if (!quantidade || isNaN(quantidade) || quantidade <= 0) {
            throw new Error('Quantidade inválida');
        }

        await PeixeService.Update(id, nomePeixe, idade, especie, peso, quantidade);
        res.redirect("/cadastroPeixe");
    } catch (error) {
        req.flash('error', `Erro ao atualizar peixe: ${error.message}`);
        res.redirect("/cadastroPeixe/edit/:id");
    }
});

export default router