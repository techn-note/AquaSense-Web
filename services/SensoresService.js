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

    // Selecionar sensores por tipo
    async selectByType(tipo) {
        const sensores = await Sensores.find({ tipo: tipo });
        return sensores;
    }
}

export default new SensoresService();
