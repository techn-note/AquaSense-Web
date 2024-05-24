import mongoose from 'mongoose'

const atualizacoes = new mongoose.Schema({
    mensagem: String,
    data: Date
})

export default atualizacoes