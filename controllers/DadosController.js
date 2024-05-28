import express from "express"
const router = express.Router()
import SensoresService from "../services/SensoresService.js"
import Auth from "../middleware/Auth.js"

router.get('/dados', Auth, async (req, res) => {
    try {
        const [tempSensor, amoniaSensor, oxigenacaoSensor, phSensor, volumeSensor] = await Promise.all([
            SensoresService.selectAllTemp(),
            SensoresService.selectAllAmonia(),
            SensoresService.selectAllOxigenacao(),
            SensoresService.selectAllPh(),
            SensoresService.selectAllVolume()
        ]);

        res.render("dados", {
            temperatura: tempSensor,
            amonia: amoniaSensor,
            oxigenacao: oxigenacaoSensor,
            ph: phSensor,
            volume: volumeSensor,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).send(`Erro ao carregar dados dos sensores: ${error}`);
    }
});

export default router