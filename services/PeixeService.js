import peixe from "../models/Peixe.js";
import peixe from "../models/Peixe.js"
import mongoose from "mongoose"

const Peixe = mongoose.model("Sensores", peixe)

class PeixeService {
    // Consultar todos os peixes
    async selectAll() {
        const peixe = await Peixe.find();
        return peixe;
    }

    SelectOne(nomePeixe) {
        const peixe = Peixe.findOne({nomePeixe: nomePeixe})
        return peixe
    }

    // Cadastrar um novo peixe
    create(nomePeixe, idade, especie, peso, quantidade) {
        const newPeixe = new Peixe({
            nomePeixe: nomePeixe,
            idade: idade,
            especie: especie,
            peso: peso,
            quantidade: quantidade
        });
        newPeixe.save();
    }

    //EXCLUIR um Peixe
    Delete(nomePeixe) {
        Peixe.findByIdAndDelete(nomePeixe).then(() => {
            console.log(`Peixe com nomePeixe "${nomePeixe}" foi deletado do sistema.`)
        }).catch(err => {
            console.log(err)
        })
    }

    // ALTERAR um PEIXE
    Update(nomePeixe, idade, especie, peso, quantidade) {
        Peixe.findByIdAndUpdate(nomePeixe, {
            nomePeixe: nomePeixe,
            idade : idade,
            especie : especie,
            peso : peso,
            quantidade : quantidade
        }).then(() => {
            console.log(`Peixe com nomePeixe "${nomePeixe}" alterado com sucesso`)
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new PeixeService();
