import mongoose from 'mongoose'

const sensores = new mongoose.Schema({
    tipo: String,
    data: Date,
    valor: Number
})

export default sensores