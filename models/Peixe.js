import mongoose from 'mongoose'

const peixe = new mongoose.Schema({
    nome: String,
    idade: Number,
    especie: String,
    peso: Number,
    quantidae: Number
})

export default peixe