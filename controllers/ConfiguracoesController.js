import express from "express";
import UserService from "../services/UserService.js";
import bcrypt from "bcrypt";
import Auth from "../middleware/Auth.js";
import upload from "../middleware/upload.js";
import { getUserImagePath } from "../services/userImagem.js";
import PeixeService from "../services/PeixeService.js";

const router = express.Router();

router.get("/configuracoes", Auth, async (req, res) => {
    try {
        const user = req.session.user;
        const email = user.email;
        const usuario = await UserService.SelectOne(email);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const userImage = getUserImagePath(user.name);

        res.render("configuracoes", {
            user: {
                name: user.name,
                email: user.email,
                image: userImage,
                password: user.password
            },
            url: req.url
        });
    } catch (error) {
        res.status(500).send(`Erro ao carregar dados do usuário: ${error.message}`);
    }
});

router.get("/alterar", Auth, async (req, res) => {
    try {
        const user = req.session.user;
        const email = user.email;
        const usuario = await UserService.SelectOne(email);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const userImage = getUserImagePath(user.name);

        res.render("alterar", {
            user: {
                name: user.name,
                email: user.email,
                image: userImage,
                password: user.password
            },
            url: req.url
        });
    } catch (error) {
        res.status(500).send(`Erro ao carregar dados do usuário: ${error.message}`);
    }
});

router.post("/alterar", Auth, async (req, res) => {
    const { name, email, newPassword } = req.body;
    const user = req.session.user;

    try {
        const usuario = await UserService.SelectOne(user.email);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        usuario.name = name;
        usuario.email = email;

        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            usuario.password = hashedPassword;
        }

        await usuario.save();

        req.session.user.name = name;
        req.session.user.email = email;

        res.redirect("/configuracoes");
    } catch (error) {
        console.error(error);
        res.status(500).send(`Erro ao atualizar usuário: ${error.message}`);
    }
});

router.post("/autenticar", async (req, res) => {
    const { password } = req.body;
    const user = req.session.user;

    try {
        const usuario = await UserService.SelectOne(user.email);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const correct = bcrypt.compareSync(password, usuario.password);

        if (correct) {
            req.flash("success", "Senha confirmada com sucesso!");
            res.redirect("/alterar");
        } else {
            req.flash("danger", "Senha incorreta. Tente novamente.");
            res.redirect("/configuracoes");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(`Erro ao autenticar usuário: ${error.message}`);
    }
});

router.post("/upload-imagem", Auth, upload.single('imagem'), async (req, res) => {
    try {
        req.flash("success", "Imagem de perfil atualizada com sucesso!");
        res.redirect("/configuracoes");
    } catch (error) {
        console.error(error);
        res.status(500).send(`Erro ao fazer upload da imagem: ${error.message}`);
    }
});


router.post("/verificarSenha", Auth, async (req, res) => {
    const user = req.session.user;
    const { nome, email, senha } = req.body;

    const senhaAtual = req.body.senhaAtual;
    const senhaCorreta = await bcrypt.compare(senhaAtual, user.password);

    if (!senhaCorreta) {
        req.flash('error', 'Senha atual incorreta. Por favor, tente novamente.');
        return res.redirect('/configuracoes');
    }

    req.session.dadosAlterarUsuario = { nome, email, senha };
    res.redirect('/alterarUsuario');
});


// Rota para processar a alteração de usuário após a senha ser verificada
router.get("/alterarUsuario", Auth, (req, res) => {
    const dadosAlterarUsuario = req.session.dadosAlterarUsuario;
    if (!dadosAlterarUsuario) {
        req.flash('error', 'Por favor, verifique sua senha antes de alterar.');
        return res.redirect('/configuracoes');
    }


    res.render('confirmarAlteracaoUsuario', { dadosAlterarUsuario });
});

router.post("/alterarUsuario", Auth, async (req, res) => {
    const user = req.session.user;
    const { nome, email, senha } = req.session.dadosAlterarUsuario;

    try {

        let novoHashSenha = user.password;
        if (senha) {
            const salt = bcrypt.genSaltSync(10);
            novoHashSenha = bcrypt.hashSync(senha, salt);
        }

        await UserService.Update(user._id, nome, email, novoHashSenha);

        req.flash('success', 'Perfil atualizado com sucesso.');
        delete req.session.dadosAlterarUsuario;
        res.redirect('/configuracoes');
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        req.flash('error', 'Ocorreu um erro ao atualizar o perfil. Por favor, tente novamente mais tarde.');
        res.redirect('/configuracoes');
    }
});

export default router;
