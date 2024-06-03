import mongoose from 'mongoose'

const user = new mongoose.Schema({
    nome: String,
    email: String,
    password: String
})

export default user