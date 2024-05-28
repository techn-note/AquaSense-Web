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

    async selectAllPh() {
        const sensorVolume = await Sensores.find({ tipo: 'ph' });
        return sensorVolume;
    }

    // Selecionar o último valor inserido por tipo - TEMPERATURA
    async selectAllTemp() {
        const sensorTemp = await Sensores.find({ tipo: 'temperatura' });
        return sensorTemp;
    }

    // Selecionar o último valor inserido por tipo - AMONIA
    async selectAllAmonia() {
        const sensorAmonia = await Sensores.find({ tipo: 'amonia' });
        return sensorAmonia;
    }

    // Selecionar o último valor inserido por tipo - OXIGENAÇÃO
    async selectAllOxigenacao() {
        const sensorOxigenacao = await Sensores.find({ tipo: 'oxigenacao' });
        return sensorOxigenacao;
    }

    // Selecionar o último valor inserido por tipo - VOLUME
    async selectAllVolume() {
        const sensorVolume = await Sensores.find({ tipo: 'volume' });
        return sensorVolume;
    }
}

export default new SensoresService();
