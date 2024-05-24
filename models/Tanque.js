import mongoose from 'mongoose'

const tanque = new mongoose.Schema({
    nome: String,
    capacidade: Number,
    numero: Number
})

export default tanque