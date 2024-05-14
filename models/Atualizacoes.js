import mongoose from 'mongoose'

const atualizacoes = new mongoose.Schema({
    mensagemAlerta: String,
    dataAlerta: String
})

export default atualizacoes