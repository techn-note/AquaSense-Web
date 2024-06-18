import mongoose from "mongoose";
import atualizacoes from "../models/Atualizacoes.js";
import sensores from "../models/Sensores.js";

const Atualizacoes = mongoose.model("Atualizacoes", atualizacoes);
const Sensores = mongoose.model("Sensores", sensores);

class AtualizacoesService {

    async analisarSensores() {
        const tiposSensores = ['ph', 'temperatura', 'oxigenacao', 'volume', 'amonia'];
        const mensagens = [];
        let temAnomalia = false;
    
        for (const tipo of tiposSensores) {

            const ultimoRegistro = await Sensores.findOne({ tipo }).sort({ data: -1 });
    
            if (!ultimoRegistro) {
                mensagens.push(`Nenhum dado encontrado para sensor ${tipo}`);
                continue;
            }
    
            let mensagem = '';
    
            switch (tipo) {
                case 'ph':
                    if (ultimoRegistro.valor < 6.0 || ultimoRegistro.valor > 7.5) {
                        mensagem = `Alerta! Nível de pH fora do ideal!`;
                        temAnomalia = true;
                    }
                    break;
                case 'temperatura':
                    if (ultimoRegistro.valor < 18 || ultimoRegistro.valor > 24) {
                        mensagem = `Alerta! Temperatura fora do ideal!`;
                        temAnomalia = true;
                    }
                    break;
                case 'oxigenacao':
                    if (ultimoRegistro.valor < 5) {
                        mensagem = `Alerta! Nível de oxigênio abaixo do ideal!`;
                        temAnomalia = true;
                    }
                    break;
                case 'volume':
                    if (ultimoRegistro.valor < 150 || ultimoRegistro.valor > 170) {
                        mensagem = `Alerta! Volume fora do ideal !`;
                        temAnomalia = true;
                    }
                    break;
                case 'amonia':
                    if (ultimoRegistro.valor < 0.25 || ultimoRegistro.valor > 1) {
                        mensagem = `Alerta! Amonia fora do ideal !`;
                        temAnomalia = true;
                    }
                    break;
                default:
                    mensagem = `Tipo de sensor '${tipo}' não reconhecido.`;
            }
    
            if (mensagem) {
                mensagens.push(mensagem);
            } else {
                mensagens.push(`Nenhuma anomalia detectada!`);
            }
        }
    
        if (temAnomalia) {
            for (const msg of mensagens) {
                this.registrarAtualizacao(msg);
            }
        }
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
