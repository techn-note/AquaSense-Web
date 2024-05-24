import tanque from "../models/Tanque.js"
import mongoose from "mongoose"

const Tanque = mongoose.model("Tanque", tanque)

class TanqueService {
    //Consultar todos os tanques
    async selectAll() {
        const tanque = Tanque.find()
        return tanque
    }

    // Cadastrar um Novo Tanque
    Create(nome, capacidade, numero) {
        const newTanque = new Tanque({
            nome: nome,
            capacidade: capacidade
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
    Update(nome, capacidade, numero) {
        Tanque.findByIdAndUpdate(nome, {
            nome: nome,
            capacidade: capacidade,
            numero: numero
        }).then(() => {
            console.log(`Tanque com nome "${nome}" alterado com sucesso`)
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new TanqueService()