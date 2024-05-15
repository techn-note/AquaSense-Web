import peixe from "../models/Sensores.js";
import mongoose from "mongoose";

const Peixe = mongoose.model("Sensores", peixe);

class PeixeService {
    // Consultar todos os peixes
    async selectAll() {
        const peixe = await Peixe.find();
        return peixe;
    }

    // Cadastrar um novo peixe
    create(nome, idade, especie, peso, quantidade) {
        const newPeixe = new Peixe({
            nome: nome,
            idade: idade,
            especie: especie,
            peso: peso,
            quantidade: quantidade
        });
        newPeixe.save();
    }

    //EXCLUIR um Peixe
    Delete(nome) {
        Peixe.findByIdAndDelete(nome).then(() => {
            console.log(`Peixe com nome "${nome}" foi deletado do sistema.`)
        }).catch(err => {
            console.log(err)
        })
    }

    // ALTERAR um PEIXE
    Update(nome, idade, especie, peso, quantidade) {
        Peixe.findByIdAndUpdate(nome, {
            nome: nome,
            idade : idade,
            especie : especie,
            peso : peso,
            quantidade : quantidade
        }).then(() => {
            console.log(`Peixe com nome "${nome}" alterado com sucesso`)
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new PeixeService();
