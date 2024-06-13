import express from "express";
const router = express.Router();
import SensoresService from "../services/SensoresService.js";
import AtualizacoesService from "../services/AtualizacoesService.js";
import Auth from "../middleware/Auth.js";
import { getUserImagePath } from "../services/userImagem.js";

router.get('/home', Auth, async (req, res) => {
    try {
        const [tempSensor, amoniaSensor, oxigenacaoSensor, phSensor, volumeSensor, mensagem] = await Promise.all([
            SensoresService.selectTemp(),
            SensoresService.selectAmonia(),
            SensoresService.selectOxigenacao(),
            SensoresService.selectPh(),
            SensoresService.selectVolume(),
            AtualizacoesService.selectMensagem()
        ]);

        await AtualizacoesService.analisarSensores();

        const user = req.session.user;
        const userImage = getUserImagePath(user.name);

        res.render("home", {
            user: {
                name: user.name,
                email: user.email,
                image: userImage
            },
            temperatura: tempSensor,
            amonia: amoniaSensor,
            oxigenacao: oxigenacaoSensor,
            ph: phSensor,
            volume: volumeSensor,
            mensagem: mensagem,
            url: req.url
        });
    } catch (error) {
        res.status(500).send(`Erro ao carregar dados dos sensores ou analisar sensores: ${error}`);
    }
});

export default router;
