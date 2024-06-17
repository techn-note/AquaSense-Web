import express from "express";
import UserService from "../services/UserService.js";
import SensoresService from "../services/SensoresService.js";
import TanqueService from "../services/TanqueService.js";
import Auth from "../middleware/Auth.js";
import PDFPrinter from "pdfmake";
import { getUserImagePath } from "../services/userImagem.js";

const router = express.Router();

router.get('/dados', Auth, async (req, res) => {
    try {
        const [tempSensor, amoniaSensor, oxigenacaoSensor, phSensor, volumeSensor] = await Promise.all([
            SensoresService.selectAllTemp(),
            SensoresService.selectAllAmonia(),
            SensoresService.selectAllOxigenacao(),
            SensoresService.selectAllPh(),
            SensoresService.selectAllVolume()
        ]);

        const user = req.session.user;

        const userImage = getUserImagePath(user.name);

        res.render("dados", {
            user: {
                name: user.name,
                email: user.email,
                image: userImage
            },
            temperatura: tempSensor,
            amonia: amoniaSensor,
            oxigenacao: oxigenacaoSensor,
            ph: phSensor,
            volume: volumeSensor,
            url: req.url
        });
    } catch (error) {
        res.status(500).send(`Erro ao carregar dados dos sensores: ${error}`);
    }
});

router.get('/pdf', Auth, async (req, res) => {
    try {
        const [tempSensor, amoniaSensor, oxigenacaoSensor, phSensor, volumeSensor] = await Promise.all([
            SensoresService.selectAllTemp(),
            SensoresService.selectAllAmonia(),
            SensoresService.selectAllOxigenacao(),
            SensoresService.selectAllPh(),
            SensoresService.selectAllVolume()
        ]);

        // Cores para as tabelas, representando as cores dos gráficos
        const tableColors = ['#FFF0ED', '#F4FFF6', '#E3ECFE', '#E1EBFF', '#FFF9E6'];

        // Configurar o PDF
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
            pageSize: 'A4',
            pageMargins: [40, 60, 40, 60], // Margens superior, direita, inferior e esquerda
            defaultStyle: { font: "Helvetica" },
            content: [
                { text: 'Relatório de Sensores', style: 'header' },
                "\n\n",
                { text: "Este é um relatório dos dados coletados pelos sensores ao longo do tempo.", alignment: 'justify' },
                "\n\n",
                { text: "Sensor de Temperatura:", bold: true },
                createTable(tempSensor, tableColors[0]),
                "\n\n",
                { text: "Sensor de Amônia:", bold: true },
                createTable(amoniaSensor, tableColors[1]),
                "\n\n",
                { text: "Sensor de Oxigenação:", bold: true },
                createTable(oxigenacaoSensor, tableColors[2]),
                "\n\n",
                { text: "Sensor de pH:", bold: true },
                createTable(phSensor, tableColors[3]),
                "\n\n",
                { text: "Sensor de Volume:", bold: true },
                createTable(volumeSensor, tableColors[4])
            ],
            styles: {
                header: {
                    fontSize: 24,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 0, 0, 20] // Margem inferior de 20
                },
                tableHeader: {
                    bold: true,
                    fillColor: '#F2F2F2', // Cor de fundo do cabeçalho
                }
            }
        };

        function createTable(sensorData, color) {
            return {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'], // Divide a largura da página igualmente entre as duas colunas
                    body: [
                        [{ text: 'Data', style: 'tableHeader' }, { text: 'Valor', style: 'tableHeader' }],
                        ...sensorData.map(entry => [formatDate(entry.data), entry.valor])
                    ]
                },
                layout: {
                    fillColor: color // Cor de fundo da tabela
                },
                margin: [0, 10, 0, 10] // Margem superior, direita, inferior e esquerda
            };
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        const pdfDoc = printer.createPdfKitDocument(docDefinitions);

        // Configurar a resposta HTTP para enviar o PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');

        pdfDoc.pipe(res);
        pdfDoc.end();

    } catch (error) {
        res.status(500).send(`Erro ao carregar dados dos sensores: ${error}`);
    }
});



router.get("/cadastroTanque", Auth, async (req, res) => {
    try {
        const user = req.session.user;
        const userImage = getUserImagePath(user.name);

        const nomeTanque = req.body.nomeTanque;
        const capacidade = req.body.capacidade;
        const numero = req.body.numero;

        const tanque = await TanqueService.SelectOne(numero);

        if (tanque === undefined) {
            await TanqueService.Create(nomeTanque, capacidade, numero);
            res.redirect("/dados");
        } else {
            res.render("cadastroTanque", {
                user: {
                    name: user.name,
                    email: user.email,
                    image: userImage
                },
                url: req.url,
                message: req.flash("danger")
            });
        }
    } catch (error) {
        res.status(500).send(`Erro ao cadastrar tanque: ${error.message}`);
    }
});

export default router;
