"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeSocial = void 0;
const class_usuario_1 = require("./class_usuario");
const class_publicacao_1 = require("./class_publicacao");
const class_AplicationError_1 = require("./class_AplicationError");
const class_publicacaoAvancada_1 = require("./class_publicacaoAvancada");
const class_interacao_1 = require("./class_interacao");
const fs_1 = __importDefault(require("fs"));
const class_comentario_1 = require("./class_comentario");
class RedeSocial {
    constructor(usuarios = [], publicacoes = [], interacoes = [], comentarios = [], controleIdUsuario = 1, controleIdPublicacao = 1, controleIdInteracao = 1, controleIdComentario = 1) {
        this._usuarios = usuarios;
        this._publicacoes = publicacoes;
        this._interacoes = interacoes;
        this._comentarios = comentarios;
        this._controleIdUsuario = controleIdUsuario;
        this._controleIdPublicacao = controleIdPublicacao;
        this._controleIdInteracao = controleIdInteracao;
        this._controleIdComentario = controleIdComentario;
    }
    get usuarios() {
        return this._usuarios;
    }
    get publicacoes() {
        return this._publicacoes;
    }
    get interacoes() {
        return this._interacoes;
    }
    get comentarios() {
        return this._comentarios;
    }
    get controleIdUsuario() {
        return this._controleIdUsuario;
    }
    get controleIdInteracao() {
        return this._controleIdInteracao;
    }
    get controleIdPublicacao() {
        return this._controleIdPublicacao;
    }
    get controleIdComentario() {
        return this._controleIdComentario;
    }
    validarIdUsuario(id) {
        if (this._usuarios.some((u) => u.id === id)) {
            throw new class_AplicationError_1.AppError(`\nJá existe um usuário com o ID: ${id}.`);
        }
    }
    validarApelidoUsuario(apelido) {
        if (this._usuarios.some((u) => u.apelido === apelido)) {
            throw new class_AplicationError_1.AppError(`\nJá existe um usuário com o apelido: ${apelido}.`);
        }
    }
    validarEmailUsuario(email) {
        if (this._usuarios.some((u) => u.email === email)) {
            throw new class_AplicationError_1.AppError(`\nJá existe um usuário com o e-mail: ${email}.`);
        }
    }
    validarDocumentoUsuario(documento) {
        if (this._usuarios.some((u) => u.documento === documento)) {
            throw new class_AplicationError_1.AppError(`\nJá existe um usuário com o CPF: ${documento}.`);
        }
    }
    encontrarUsuarioPorApelido(apelido) {
        const usuario = this._usuarios.find(u => u.apelido === apelido);
        if (!usuario) {
            throw new class_AplicationError_1.AppError(`\nUsuário não encontrado`);
        }
        return usuario;
    }
    encontrarPublicacaoPorId(idPublicacao) {
        const publicacao = this._publicacoes.find(p => p.id === idPublicacao);
        if (!publicacao) {
            throw new class_AplicationError_1.AppError(`\nPublicacação não encontrada`);
        }
        return publicacao;
    }
    adicionarUsuario(usuario) {
        this.validarIdUsuario(usuario.id);
        this.validarApelidoUsuario(usuario.apelido);
        this.validarEmailUsuario(usuario.email);
        this.validarDocumentoUsuario(usuario.documento);
        this._usuarios.push(usuario);
        this._controleIdUsuario += 1;
    }
    adicionarPublicacao(publicacao) {
        this._publicacoes.push(publicacao);
        this._controleIdPublicacao += 1;
    }
    adicionarInteracao(publicacao, interacao) {
        if (!(publicacao instanceof class_publicacaoAvancada_1.PublicacaoAvancada)) {
            throw new class_AplicationError_1.AppError("\nEsta é uma Publicação Simples. Interações somente em Publicações Avançadas!");
        }
        publicacao.adicionarInteracao(interacao);
        this._interacoes.push(interacao);
        this._controleIdInteracao += 1;
    }
    listarUsuarios() {
        if (this._usuarios.length === 0) {
            throw new class_AplicationError_1.AppError("\nNão existem usuários cadastradaos.");
        }
        console.log("Lista de Usuários:");
        this._usuarios.forEach((usuario) => {
            console.log();
            console.log(`ID: ${usuario.id}, Apelido: ${usuario.apelido}, Email: ${usuario.email}, Documento: ${usuario.documento}`);
        });
    }
    listarPublicacoes() {
        if (this._publicacoes.length === 0) {
            throw new class_AplicationError_1.AppError("\nNenhuma publicação encontrada");
        }
        const publicacoesOrdenadas = [...this._publicacoes]
            .sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime());
        return publicacoesOrdenadas.map((publicacao) => ({
            publicacao: publicacao,
            comentarios: publicacao.obterUltimosComentarios()
        }));
    }
    listarInteracoes() {
        if (this._interacoes.length === 0) {
            throw new class_AplicationError_1.AppError("\nnenhuma interação encontrada");
        }
        const interacoesOrdenadas = [...this._interacoes].sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime());
        return interacoesOrdenadas;
    }
    listarPublicacoesUsuario(usuario) {
        const publicacoesOrdenadas = [...this._publicacoes].sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime());
        const publicacoesUsuario = publicacoesOrdenadas.filter(p => p.usuario === usuario);
        if (publicacoesUsuario.length === 0) {
            throw new class_AplicationError_1.AppError("\nNenhuma publicação encontrada.");
        }
        return publicacoesUsuario;
    }
    editarPublicacao(usuario, publicacao, novoConteudo) {
        if (usuario !== publicacao.usuario) {
            throw new class_AplicationError_1.AppError("\nVocê não pode editar publicação de outro usuário.");
        }
        publicacao.conteudo = novoConteudo;
    }
    adicionarComentarioPublicacao(publicacao, comentario) {
        publicacao.criarComentario(comentario);
        this._comentarios.push(comentario);
        this._controleIdComentario += 1;
    }
    listarComentarios() {
        if (this._comentarios.length === 0) {
            throw new class_AplicationError_1.AppError("\nnenhum comentário encontrado");
        }
        const comentariosOrdenados = [...this._comentarios].sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime());
        return comentariosOrdenados;
    }
    editarComentario(usuario, comentario, novoComentario) {
        if (usuario !== comentario.usuario) {
            throw new class_AplicationError_1.AppError("\nVocê não pode editar comentário de outro usuário.");
        }
        comentario.texto = novoComentario;
    }
    listarComentariosPorUsuario(usuario) {
        return this._comentarios.filter(comentario => comentario.usuario === usuario);
    }
    salvarDados(arquivoUsuarios, arquivoPublicacoes, arquivoInteracoes, arquivoComentarios) {
        let usuariosContent = "USUÁRIOS\r\n";
        for (let usuario of this._usuarios) {
            usuariosContent += `${usuario.id};${usuario.apelido};${usuario.email};${usuario.documento}\r\n`;
        }
        usuariosContent = usuariosContent.slice(0, usuariosContent.length - 2);
        let publicacoesContent = "PUBLICAÇÕES\r\n";
        for (let publicacao of this._publicacoes) {
            const tipoPublicacao = publicacao instanceof class_publicacaoAvancada_1.PublicacaoAvancada ? 'PA' : 'PS';
            publicacoesContent += `${publicacao.id};${publicacao.usuario.id};${publicacao.conteudo};${publicacao.dataHora};${tipoPublicacao}\r\n`;
        }
        publicacoesContent = publicacoesContent.slice(0, publicacoesContent.length - 2);
        let interacoesContent = "INTERAÇÕES\r\n";
        for (let interacao of this._interacoes) {
            interacoesContent += `${interacao.id};${interacao.publicacao.id};${interacao.tipoInteracao};${interacao.usuario.id};${interacao.dataHora}\r\n`;
        }
        interacoesContent = interacoesContent.slice(0, interacoesContent.length - 2);
        // Seguindo o padrão do trabalho
        let comentariosContent = 'COMENTARIOS\r\n';
        for (let comentario of this._comentarios) {
            comentariosContent += `${comentario.id};${comentario.publicacao.id};${comentario.usuario.id};${comentario.texto};${comentario.dataHora}\r\n`;
        }
        comentariosContent = comentariosContent.slice(0, comentariosContent.length - 2);
        fs_1.default.writeFileSync(arquivoUsuarios, usuariosContent, 'utf-8');
        fs_1.default.writeFileSync(arquivoPublicacoes, publicacoesContent, 'utf-8');
        fs_1.default.writeFileSync(arquivoInteracoes, interacoesContent, 'utf-8');
        fs_1.default.writeFileSync(arquivoComentarios, comentariosContent, 'utf-8');
    }
    carregarDados(arquivoUsuarios, arquivoPublicacoes, arquivoInteracoes, arquivoComentarios) {
        if (!(fs_1.default.existsSync(arquivoUsuarios) && fs_1.default.existsSync(arquivoPublicacoes) && fs_1.default.existsSync(arquivoInteracoes))) {
            throw new Error('Primeiro Acesso [Arquivo não encontrado]. Iniciando com os dados padrão');
        }
        let usuariosData = fs_1.default.readFileSync(arquivoUsuarios, 'utf-8');
        usuariosData.split('\r\n').slice(1).map(linha => {
            const [id, apelido, email, documento] = linha.split(';');
            const usuario = new class_usuario_1.Usuario(Number(id), apelido, email, documento);
            this._usuarios.push(usuario);
        });
        const usuarioMap = {};
        this._usuarios.forEach(usuario => {
            usuarioMap[Number(usuario.id)] = usuario;
        });
        let publicacoesData = fs_1.default.readFileSync(arquivoPublicacoes, 'utf-8');
        publicacoesData.split('\r\n').slice(1).map(linha => {
            const [id, usuarioId, conteudo, dataHora, tipo] = linha.split(';');
            const usuario = usuarioMap[Number(usuarioId)];
            const data = new Date(dataHora);
            if (tipo === 'PA') {
                const publicacao = new class_publicacaoAvancada_1.PublicacaoAvancada(Number(id), usuario, conteudo, data);
                this.adicionarPublicacao(publicacao);
            }
            else {
                const publicacao = new class_publicacao_1.Publicacao(Number(id), usuario, conteudo, data);
                this.adicionarPublicacao(publicacao);
            }
        });
        const publicacaoMap = {};
        this._publicacoes.forEach(publicacao => {
            publicacaoMap[Number(publicacao.id)] = publicacao;
        });
        let interacoesData = fs_1.default.readFileSync(arquivoInteracoes, 'utf-8');
        interacoesData.split('\r\n').slice(1).map(linha => {
            const [id, publicacaoId, tipoInteracao, usuarioId, dataHora] = linha.split(';');
            const publicacao = publicacaoMap[Number(publicacaoId)];
            const usuario = usuarioMap[Number(usuarioId)];
            const data = new Date(dataHora);
            const tipo = tipoInteracao;
            const interacao = new class_interacao_1.Interacao(Number(id), publicacao, tipo, usuario, data);
            if (publicacao instanceof class_publicacaoAvancada_1.PublicacaoAvancada) {
                this.adicionarInteracao(publicacao, interacao);
            }
        });
        this._controleIdUsuario = this._usuarios.length + 1;
        let comentariosData = fs_1.default.readFileSync(arquivoComentarios, 'utf-8');
        comentariosData.split('\r\n').slice(1).map(linha => {
            const [id, publicacaoId, usuarioId, texto, dataHora] = linha.split(';');
            const publicacao = publicacaoMap[Number(publicacaoId)];
            const usuario = usuarioMap[Number(usuarioId)];
            const data = new Date(dataHora);
            const comentario = new class_comentario_1.Comentario(Number(id), publicacao, usuario, texto, data);
            this.adicionarComentarioPublicacao(publicacao, comentario);
        });
    }
}
exports.RedeSocial = RedeSocial;
