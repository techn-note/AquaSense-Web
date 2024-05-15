import Sensores from "../models/Sensores.js";
import mongoose from "mongoose";

const SensoresModel = mongoose.model("Sensores", Sensores);

class SensoresService {
    // Consultar todos os sensores
    async selectAll() {
        const sensores = await SensoresModel.find();
        return sensores;
    }

    // Cadastrar um novo dado do sensor
    create(tipo, data, valor) {
        const newSensores = new SensoresModel({
            tipo: tipo,
            data: data,
            valor: valor
        });
        newSensores.save();
    }

    // Selecionar sensores por tipo
    async selectByType(tipo) {
        const sensores = await SensoresModel.find({ tipo: tipo });
        return sensores;
    }
}

export default new SensoresService();
