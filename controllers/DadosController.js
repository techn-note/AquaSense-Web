import express from "express"
const router = express.Router()
import SensoresService from "../services/SensoresService.js"
import Auth from "../middleware/Auth.js"
import PDFPrinter from "pdfmake";

router.get('/dados', Auth, async (req, res) => {
    try {
        const [tempSensor, amoniaSensor, oxigenacaoSensor, phSensor, volumeSensor] = await Promise.all([
            SensoresService.selectAllTemp(),
            SensoresService.selectAllAmonia(),
            SensoresService.selectAllOxigenacao(),
            SensoresService.selectAllPh(),
            SensoresService.selectAllVolume()
        ]);

        res.render("dados", {
            temperatura: tempSensor,
            amonia: amoniaSensor,
            oxigenacao: oxigenacaoSensor,
            ph: phSensor,
            volume: volumeSensor,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).send(`Erro ao carregar dados dos sensores: ${error}`);
    }
});

router.get('/pdf', Auth, async (req, res) => {
    const fonts = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        }
    };

    const printer = new PDFPrinter(fonts);

    const docDefinitions = {
        defaultStyle: { font: "Helvetica" },
        content: [
            { text: 'Relatório de Sensores', style: 'header' },
            'Aqui você pode adicionar mais conteúdo ao PDF...'
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true
            }
        }
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinitions);

    // Configurando a resposta HTTP para enviar o PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');

    pdfDoc.pipe(res);
    pdfDoc.end();

});

export default router