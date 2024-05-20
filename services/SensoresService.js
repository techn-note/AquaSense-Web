import sensores from "../models/Sensores.js"
import mongoose from "mongoose"

const Sensores = mongoose.model("Sensores", sensores)

class SensoresService {
    // Consultar todos os sensores
    async selectAll() {
        const sensores = await Sensores.find();
        return sensores;
    }

    // Cadastrar um novo dado do sensor
    create(tipo, data, valor) {
        const newSensores = new Sensores({
            tipo: tipo,
            data: data,
            valor: valor
        });
        newSensores.save();
    }

    // Selecionar o último valor inserido por tipo - PH
    async selectPh() {
        const sensorPh = await Sensores.findOne({ tipo: 'ph' }).sort({ data: -1 });
        return sensorPh;
    }

    // Selecionar o último valor inserido por tipo - TEMPERATURA
    async selectTemp() {
        const sensorTemp = await Sensores.findOne({ tipo: 'temperatura' }).sort({ data: -1 });
        return sensorTemp;
    }

    // Selecionar o último valor inserido por tipo - AMONIA
    async selectAmonia() {
        const sensorAmonia = await Sensores.findOne({ tipo: 'amonia' }).sort({ data: -1 });
        return sensorAmonia;
    }

    // Selecionar o último valor inserido por tipo - OXIGENAÇÃO
    async selectOxigenacao() {
        const sensorOxigenacao = await Sensores.findOne({ tipo: 'oxigenacao' }).sort({ data: -1 });
        return sensorOxigenacao;
    }

    // Selecionar o último valor inserido por tipo - VOLUME
    async selectVolume() {
        const sensorVolume = await Sensores.findOne({ tipo: 'volume' }).sort({ data: -1 });
        return sensorVolume;
    }

}

export default new SensoresService();
