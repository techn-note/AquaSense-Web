import tanque from "../models/Tanque.js"
import mongoose from "mongoose"

const Tanque = mongoose.Model("Tanque", tanque)

class TanqueService{

    Create(nome, capacidade) {
        const newTanque = new Tanque({
            nome : nome,
            capacidade : capacidade
        })
        newTanque.save()
    }
    
}

export default new TanqueService()