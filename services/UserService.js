import user from "../models/User.js"
import mongoose from "mongoose"

const User = mongoose.model("User", user)

class UserService{

    // SELECIONAR TODOS OS USERS
    SelectAll() {
        const user = User.find()
        return user
    }

    // CADASTRAR NOVO USUÁRIO
    Create(nome, email, senha) {
        const newUser = new User({
            nome : nome,
            email : email,
            senha : senha
        })
        newUser.save()
    }

    // SELECIONAR APENAS O NOME PARA TELA DE INÍCIO
    selectOne(email) {
        const user = User.findOne({
            nome : nome
        })
        return user
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
    Update(nome, email, senha) {
        User.findByIdAndUpdate(email, {
            nome: nome,
            email: email,
            senha: senha
        }).then(() => {
            console.log(`Usuário com email "${email}" alterado com sucesso`)
        }).catch(err => {
            console.log(err)
        })
    }

}

export default new UserService()