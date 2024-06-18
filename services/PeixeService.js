import peixe from "../models/Peixe.js";
import mongoose from "mongoose"

const Peixe = mongoose.model("Peixes", peixe)

class PeixeService {
    // Consultar todos os peixes
    async selectAll() {
        const peixe = await Peixe.find();
        return peixe;
    }

    SelectOne(id) {
        return Peixe.findById(id);
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
        }).catch(err => {
            console.log(err)
        })
    }

    // ALTERAR um PEIXE
    Update(id, nomePeixe, idade, especie, peso, quantidade) {
        return Peixe.findByIdAndUpdate(
            id,
            {
                nomePeixe,
                idade,
                especie,
                peso,
                quantidade
            },
            { new: true }
        ).then(updatedPeixe => {
            return updatedPeixe;
        }).catch(err => {
            console.log(err);
            throw err;
        });
    }
}

export default new PeixeService();
