import express from "express";
import UserService from "../services/UserService.js";
import bcrypt from "bcrypt";
import Auth from "../middleware/Auth.js";
import { getUserImagePath } from "../services/userImagem.js";

const router = express.Router();

router.get("/configuracoes", Auth, async (req, res) => {
    try {
        const user = req.session.user;
        const email = user.email;
        const usuario = await UserService.SelectOne(email);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const userImage = getUserImagePath(user.name);

        res.render("configuracoes", {
            user: {
                name: user.name,
                email: user.email,
                image: userImage,
                password: user.password
            },
            url: req.url
        });
    } catch (error) {
        res.status(500).send(`Erro ao carregar dados do usuário: ${error.message}`);
    }
});


router.get("/alterar", Auth, async (req, res) => {
    try {
        const user = req.session.user;
        const email = user.email;
        const usuario = await UserService.SelectOne(email);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const userImage = getUserImagePath(user.name);

        res.render("alterar", {
            user: {
                name: user.name,
                email: user.email,
                image: userImage,
                password: user.password
            },
            url: req.url
        });
    } catch (error) {
        res.status(500).send(`Erro ao carregar dados do usuário: ${error.message}`);
    }
});


router.post("/alterar", Auth, async (req, res) => {
    
    const { name, email, newPassword } = req.body;
    const user = req.session.user;

    try {

        const usuario = await UserService.SelectOne(user.email);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        usuario.name = name;
        usuario.email = email;

        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            usuario.password = hashedPassword;
        }

        await usuario.save();

        req.session.user.name = name;
        req.session.user.email = email;

        res.redirect("/configuracoes");
    } catch (error) {
        console.error(error);
        res.status(500).send(`Erro ao atualizar usuário: ${error.message}`);
    }
});

router.post("/autenticar", async (req, res) => {
    const { password } = req.body;
    const user = req.session.user;

    try {
        const usuario = await UserService.SelectOne(user.email);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const correct = bcrypt.compareSync(password, usuario.password);

        if (correct) {

            req.flash("success", "Senha confirmada com sucesso!");
            res.redirect("/alterar");
        } else {

            req.flash("danger", "Senha incorreta. Tente novamente.");
            res.redirect("/configuracoes");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(`Erro ao autenticar usuário: ${error.message}`);
    }
});

export default router;
