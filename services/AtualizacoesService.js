import mongoose from "mongoose";
import atualizacoes from "../models/Atualizacoes.js";
import sensores from "../models/Sensores.js";

const Atualizacoes = mongoose.model("Atualizacoes", atualizacoes);
const Sensores = mongoose.model("Sensores", sensores);

class AtualizacoesService {

    async analisarSensores() {
        const dadosSensores = await Sensores.find().sort({ data: -1 }).limit(5);
    
        dadosSensores.forEach(sensor => {
            let mensagem = '';
    
            if (sensor.tipo === 'ph' && (sensor.valor < 6.0 || sensor.valor > 7.5)) {
                mensagem = `Alerta! Nível de pH fora do ideal!`;
            } else if (sensor.tipo === 'temperatura' && (sensor.valor < 18 || sensor.valor > 24)) {
                mensagem = `Alerta! Temperatura fora do ideal!`;
            } else if (sensor.tipo === 'oxigenacao' && sensor.valor < 5) {
                mensagem = `Alerta! Nível de oxigênio abaixo do ideal!`;
                console.log(sensor.valor)
            } else if (sensor.tipo === 'volume' && (sensor.valor < 150 || sensor.valor > 170)) {
                mensagem = `Alerta! Volume fora do ideal !`;
            } else if (sensor.tipo === 'amonia' && (sensor.valor < 0,25 || sensor.valor > 1)) {
                mensagem = `Alerta! Amonia fora do ideal !`;
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
    }

    async selectMensagem() {
        const mensagem = await Atualizacoes.findOne().sort({ data: -1 });
        return mensagem;
    }
}

export default new AtualizacoesService();
