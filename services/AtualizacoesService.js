import mongoose from "mongoose";
import atualizacoes from "../models/Atualizacoes.js";
import sensores from "../models/Sensores.js";

const Atualizacoes = mongoose.model("Atualizacoes", atualizacoes);
const Sensores = mongoose.model("Sensores", sensores);

class AtualizacoesService {

    async analisarSensores() {
        const dadosSensores = await Sensores.find().sort({ data: -1 }).limit(1);
    
        dadosSensores.forEach(sensor => {
            let mensagem = '';
    
            if (sensor.tipo === 'ph' && (sensor.valor < 6.0 || sensor.valor > 7.5)) {
                mensagem = `Alerta! Nível de pH fora do ideal!`;
                console.log("Olá")
                console.log(sensor.valor)
            } else if (sensor.tipo === 'temperatura' && (sensor.valor < 18 || sensor.valor > 24)) {
                mensagem = `Alerta! Temperatura fora do ideal!`;
                console.log(sensor.valor)
            } else if (sensor.tipo === 'oxigenacao' && sensor.valor < 5) {
                mensagem = `Alerta! Nível de oxigênio abaixo do ideal!`;
                console.log(sensor.valor)
            }
    
            if (mensagem) {
                this.registrarAtualizacao(mensagem);
            } else {
                this.registrarAtualizacao('Nenhuma anomalia detectada');
            }
        });
    }

    async registrarAtualizacao(mensagem) {
        const novaAtualizacao = new Atualizacoes({ mensagem: mensagem || 'Nenhuma mensagem fornecida', data: new Date() });
        await novaAtualizacao.save();
        console.log(`Atualização registrada: ${mensagem}`);
    }
}

export default new AtualizacoesService();
