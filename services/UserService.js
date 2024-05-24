import user from "../models/User.js"
import mongoose from "mongoose"

const User = mongoose.model("User", user)

class UserService {

    // CADASTRAR NOVO USUÁRIO
    Create(name, email, password) {
        const newUser = new User({
            nome: name,
            email: email,
            password: password
        })
        newUser.save()
    }

    SelectOne(email) {
        const user = User.findOne({email: email})
        return user
    }

    // SELECIONAR APENAS O NOME PARA TELA DE INÍCIO
    selectName(email) {
        const user = User.findOne({ email });
        if (user) {
            return user.nome;
        } else {
            return null;
        }
    }


    //EXCLUIR um USER
    Delete(email) {
        User.findByIdAndDelete(email).then(() => {
            console.log(`Usuário com email "${email}" foi deletado do sistema.`)
        }).catch(err => {
            console.log(err)
        })
    }

    // ALTERAR
    Update(nome, email, password) {
        User.findByIdAndUpdate(email, {
            nome: nome,
            email: email,
            password: password
        }).then(() => {
            console.log(`Usuário com email "${email}" alterado com sucesso`)
        }).catch(err => {
            console.log(err)
        })
    }

}

export default new UserService()