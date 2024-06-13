import express from "express";
const router = express.Router();
import UserService from "../services/UserService.js";
import Auth from "../middleware/Auth.js";

router.get("/configuracoes", Auth, async (req, res) => {
    try {
       
        const userEmail = req.user.email;
        const user = await UserService.SelectOne(userEmail);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res.status(200).json({
            nome: user.nome,
            email: user.email,
            password: user.password
        });

    } catch (err) {
        console.error("Erro ao buscar informações do usuário:", err);
        return res.status(500).json({ error: "Erro ao buscar informações do usuário" });
    }
});

export default router;
