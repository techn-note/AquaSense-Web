import tanque from "../models/Tanque.js"
import mongoose from "mongoose"

const Tanque = mongoose.model("Tanque", tanque)

class TanqueService {
    //Consultar todos os tanques
    async selectAll() {
        const tanques = await Tanque.find()
        return tanques
    }

    SelectOne(id) {
        return Tanque.findById(id);
    }
    // Cadastrar um Novo Tanque
    Create(nomeTanque, capacidade, numero) {
        const newTanque = new Tanque({
            nomeTanque: nomeTanque,
            capacidade: capacidade,
            numero: numero
        })
        newTanque.save()
    }

    //EXCLUIR um Tanque
    Delete(nome) {
        Tanque.findByIdAndDelete(nome).then(() => {
            console.log(`Tanque com nome "${nome}" foi deletado do sistema.`)
        }).catch(err => {
            console.log(err)
        })
    }

    // ALTERAR
    Update(id, nomeTanque, capacidade, numero) {
        return Tanque.findByIdAndUpdate(
            id,
            {
                nomeTanque,
                capacidade,
                numero
            },
            { new: true}
        ).then(updatedTanque => {
            return updatedTanque;
        }).catch(err => {
            console.log(err);
            throw err;
        })
    }
}

export default new TanqueService()