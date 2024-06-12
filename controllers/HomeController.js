import express from "express";
const router = express.Router();
import SensoresService from "../services/SensoresService.js";
import AtualizacoesService from "../services/AtualizacoesService.js";
import Auth from "../middleware/Auth.js";

router.get('/home', Auth, async (req, res) => {
    try {
        const [tempSensor, amoniaSensor, oxigenacaoSensor, phSensor, volumeSensor] = await Promise.all([
            SensoresService.selectTemp(),
            SensoresService.selectAmonia(),
            SensoresService.selectOxigenacao(),
            SensoresService.selectPh(),
            SensoresService.selectVolume()
        ]);

        await AtualizacoesService.analisarSensores();

        res.render("home", {
            temperatura: tempSensor,
            amonia: amoniaSensor,
            oxigenacao: oxigenacaoSensor,
            ph: phSensor,
            volume: volumeSensor,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).send(`Erro ao carregar dados dos sensores ou analisar sensores: ${error}`);
    }
});

export default router;
