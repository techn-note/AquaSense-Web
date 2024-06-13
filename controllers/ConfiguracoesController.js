import express from "express";
import UserService from "../services/UserService.js";
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

export default router;
