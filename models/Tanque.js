import mongoose from 'mongoose'

const tanque = new mongoose.Schema({
    nomeTanque: String,
    capacidade: Number,
    numero: Number
})

export default tanque