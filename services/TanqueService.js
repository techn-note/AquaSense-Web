import tanque from "../models/Tanque.js"
import mongoose from "mongoose"

const Tanque = mongoose.Model("Tanque", tanque)

class TanqueService {
    //Consultar todos os tanques
    SelectAll() {
        const tanque = Tanque.find()
        return tanques
    }

    // Cadastrar um Novo Tanque
    Create(nome, capacidade) {
        const newTanque = new Tanque({
            nome: nome,
            capacidade: capacidade
        })
        newTanque.save()
    }

    //EXCLUIR um Tanque
    Delete(nome) {
        User.findByIdAndDelete(nome).then(() => {
            console.log(`Tanque com nome "${nome}" foi deletado do sistema.`)
        }).catch(err => {
            console.log(err)
        })
    }

    // ALTERAR
    Update(nome, capacidade) {
        User.findByIdAndUpdate(nome, {
            nome: nome,
            capacidade: capacidade
        }).then(() => {
            console.log(`Tanque com nome "${nome}" alterado com sucesso`)
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new TanqueService()