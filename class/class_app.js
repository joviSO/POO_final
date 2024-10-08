"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const class_usuario_1 = require("./class_usuario");
const zod_1 = require("zod");
const zodSchemas_1 = require("../zod_schemas/zodSchemas");
const class_AplicationError_1 = require("./class_AplicationError");
const class_publicacao_1 = require("./class_publicacao");
const class_publicacaoAvancada_1 = require("./class_publicacaoAvancada");
const utils_1 = require("../utils");
const class_interacao_1 = require("./class_interacao");
const date_fns_1 = require("date-fns");
const class_comentario_1 = require("./class_comentario");
class App {
    constructor(redesocial) {
        this._input = (0, prompt_sync_1.default)();
        this._redesocial = redesocial;
        this._larguraPagina = 92;
        this._logo = "\t███╗   ███╗██╗██████╗  ██████╗\n" +
            "\t████╗ ████║██║██╔══██╗██╔════╝\n" +
            "\t██╔████╔██║██║██████╔╝██║     \n" +
            "\t██║╚██╔╝██║██║██╔══██╗██║     \n" +
            "\t██║ ╚═╝ ██║██║██║  ██║╚██████╗\n" +
            "\t╚═╝     ╚═╝╚═╝╚═╝  ╚═╝ ╚═════╝";
    }
    get redesocial() {
        return this._redesocial;
    }
    exibirCabecalho(titulo) {
        const espacoDisponivel = this._larguraPagina - titulo.length - 2;
        const espacosEsquerda = Math.floor(espacoDisponivel / 2);
        console.log("~".repeat(this._larguraPagina));
        console.log(` ${' '.repeat(espacosEsquerda)}${titulo}`);
        console.log("~".repeat(this._larguraPagina));
        console.log();
    }
    telaPrincipal() {
        (0, utils_1.limparTela)();
        console.log();
        console.log(this._logo);
        console.log();
        console.log();
        console.log(" [1] Cadastrar Usuário             [2] Listar Usuarios            [3] Postar\n", "[4] FEED de Postagens             [5] Acompanhar Postagem        [6] Interagir\n", "[7] Listar Postagens por Usuario  [8] Editar Postagem            [9] Relatório de Interações\n", "[10] Comentar em Publicações      [11] Relatório de Comentários  [12] Editar Comentario\n", "[0] Sair do sistema");
    }
    telaCadastrarUsuario() {
        let repetir = "";
        do {
            try {
                (0, utils_1.limparTela)();
                this.exibirCabecalho("CADASTRO DE USUÁRIO");
                console.log("insira os dados solicitados abaixo");
                console.log();
                const apelido = this._input("Apelido: ").toLowerCase();
                zodSchemas_1.apelidoSchema.parse(apelido);
                this._redesocial.validarApelidoUsuario(apelido);
                const email = this._input("E-mail: ");
                zodSchemas_1.emailSchema.parse(email);
                this._redesocial.validarEmailUsuario(email);
                const documento = this._input("CPF [números]: ");
                zodSchemas_1.documentoSchema.parse(documento);
                this._redesocial.validarDocumentoUsuario(documento);
                const id = this._redesocial.controleIdUsuario;
                console.log();
                const usuario = new class_usuario_1.Usuario(id, apelido.toLowerCase(), email.toLowerCase(), documento);
                this._redesocial.adicionarUsuario(usuario);
                console.log("Usuário cadastrado");
            }
            catch (e) {
                if (e instanceof zod_1.z.ZodError) {
                    console.log(e.errors.map(err => err.message));
                }
                else if (e instanceof class_AplicationError_1.AplicationError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro Desconhecido. Contate o Administrador:\n", e);
                }
            }
            console.log();
            repetir = this._input("Cadastrar novo Usuário? [s/n]: ");
        } while (repetir.toLowerCase() === 's');
    }
    telaListarUsusario() {
        let repetir = "";
        do {
            try {
                (0, utils_1.limparTela)();
                this.exibirCabecalho("RELATÓRIO DE USUÁRIOS");
                this._redesocial.listarUsuarios();
            }
            catch (e) {
                if (e instanceof zod_1.z.ZodError) {
                    console.log(e.errors.map(err => err.message));
                }
                else if (e instanceof class_AplicationError_1.AplicationError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro Desconhecido. Contate o Administrador:\n", e);
                }
            }
            console.log();
            repetir = this._input("Listar novamente? [s/n]: ");
        } while (repetir.toLowerCase() === "s");
    }
    telaInserirPublicacao() {
        let repetir = "";
        do {
            try {
                (0, utils_1.limparTela)();
                this.exibirCabecalho("POSTAR");
                const apelido = this._input("Usuário (apelido): ").toLowerCase();
                console.log();
                const usuario = this._redesocial.encontrarUsuarioPorApelido(apelido);
                console.log("Qual o Tipo de Postagem? \n [1] Postagem Simples\n [2] Postagem Avançada");
                console.log();
                const opTipo = this._input("R: ");
                if (opTipo !== "1" && opTipo !== "2") {
                    throw new class_AplicationError_1.AppError("\nOpção Inválida");
                }
                let conteudo = "";
                console.log();
                console.log("Conteúdo da publicação:\n");
                conteudo = this._input("> ");
                zodSchemas_1.conteudoSchema.parse(conteudo);
                switch (opTipo) {
                    case "1":
                        const publicacao = new class_publicacao_1.Publicacao(this._redesocial.controleIdPublicacao, usuario, conteudo, new Date());
                        this._redesocial.adicionarPublicacao(publicacao);
                        console.log("\nPostagem Simples com sucesso.");
                        break;
                    case "2":
                        const publicacaoAvancada = new class_publicacaoAvancada_1.PublicacaoAvancada(this._redesocial.controleIdPublicacao, usuario, conteudo, new Date());
                        this._redesocial.adicionarPublicacao(publicacaoAvancada);
                        console.log("\nPostagem Avançada com sucesso.");
                        break;
                    default:
                        throw new class_AplicationError_1.AppError("\nOpção Inválida.");
                }
            }
            catch (e) {
                if (e instanceof zod_1.z.ZodError) {
                    //console.log(e.errors[0].message);
                    console.log(e.errors.map(err => err.message));
                }
                else if (e instanceof class_AplicationError_1.AplicationError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro Desconhecido. Contate o Administrador:\n", e);
                }
            }
            console.log();
            repetir = this._input("Inserir nova postagem? [s/n]: ");
        } while (repetir.toLowerCase() === 's');
    }
    telaListarPublicacoes() {
        let repetir = "";
        do {
            try {
                (0, utils_1.limparTela)();
                this.exibirCabecalho("FEED DE POSTAGENS");
                const publicacoesComComentarios = this._redesocial.listarPublicacoes();
                console.log();
                publicacoesComComentarios.forEach(({ publicacao, comentarios }) => {
                    console.log("┌────────────────────────────────────────────────────────────────────┐");
                    console.log(`  [${publicacao._id}] ${publicacao.usuario.apelido}, em ${(0, date_fns_1.format)(publicacao.dataHora, "dd/MM/yyyy 'às' HH:mm")}`);
                    console.log();
                    console.log("\t" + publicacao.conteudo);
                    if (publicacao instanceof class_publicacaoAvancada_1.PublicacaoAvancada) {
                        console.log();
                        console.log();
                        console.log(`  ${publicacao.listarInteracoesPublicacao()}`);
                    }
                    console.log();
                    if (comentarios.length > 0) {
                        console.log("  Comentários:");
                        comentarios.forEach((comentario) => {
                            console.log(`  - ${comentario.usuario.apelido}: ${comentario.texto}`);
                        });
                    }
                    else {
                        console.log("  Nenhum comentário.");
                    }
                    console.log("└────────────────────────────────────────────────────────────────────┘");
                    console.log();
                });
            }
            catch (e) {
                if (e instanceof zod_1.z.ZodError) {
                    console.log(e.errors.map(err => err.message));
                }
                else if (e instanceof class_AplicationError_1.AplicationError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro Desconhecido. Contate o Administrador:\n", e);
                }
            }
            console.log();
            repetir = this._input("Listar novamente? [s/n]: ");
        } while (repetir.toLowerCase() === 's');
    }
    telaInteragir() {
        let repetir = "";
        do {
            try {
                (0, utils_1.limparTela)();
                this.exibirCabecalho("INTEGRAGIR EM POSTAGENS");
                const idPublicacao = Number(this._input("Publicação [Id]: "));
                zodSchemas_1.idSchema.parse(idPublicacao);
                const publicacao = this._redesocial.encontrarPublicacaoPorId(idPublicacao);
                if (!(publicacao instanceof class_publicacaoAvancada_1.PublicacaoAvancada)) {
                    throw new class_AplicationError_1.AppError("\nPublicação selecionada não é uma Publicação Avançada.");
                }
                console.log();
                console.log("Quem vai interagir?");
                console.log();
                const apelido = this._input("Usuário [apelido]: ").toLowerCase();
                const usuario = this._redesocial.encontrarUsuarioPorApelido(apelido);
                if (publicacao.usuariosInteragiram.includes(apelido)) {
                    throw new class_AplicationError_1.AppError(`\n${usuario.apelido} já interagiu nessa publicacao`);
                }
                if (usuario === publicacao.usuario) {
                    throw new class_AplicationError_1.AppError("\nVocê não pode interagir em sua própria publicação.");
                }
                console.log();
                console.log("Tipos de Interação:\n [1] Like\n [2] Dislike\n [3] Riso\n [4] Aplauso\n [5] Amor");
                console.log();
                const tipoInteracao = this._input("Opção: ");
                let tipo;
                switch (tipoInteracao) {
                    case "1":
                        tipo = utils_1.TipoInteracao.Like;
                        break;
                    case "2":
                        tipo = utils_1.TipoInteracao.Dislike;
                        break;
                    case "3":
                        tipo = utils_1.TipoInteracao.Riso;
                        break;
                    case "4":
                        tipo = utils_1.TipoInteracao.Aplauso;
                        break;
                    case "5":
                        tipo = utils_1.TipoInteracao.Amor;
                        break;
                    default:
                        throw new class_AplicationError_1.AppError("\nOpção Inválida");
                }
                const interacao = new class_interacao_1.Interacao(this._redesocial.controleIdInteracao, publicacao, tipo, usuario, new Date());
                this._redesocial.adicionarInteracao(publicacao, interacao);
                console.log("\nInteração registrada com sucesso!");
            }
            catch (e) {
                if (e instanceof zod_1.z.ZodError) {
                    console.log(e.errors.map(err => err.message));
                }
                else if (e instanceof class_AplicationError_1.AppError) {
                    console.log(e.message);
                }
                else {
                    console.log("\nErro Desconhecido. Contate o Administrador:\n", e);
                }
            }
            console.log();
            repetir = this._input("Interagir novamente? [s/n]: ");
        } while (repetir.toLowerCase() === 's');
    }
    telaListarPublicacoesPorUsuario() {
        let repetir = "";
        do {
            try {
                (0, utils_1.limparTela)();
                this.exibirCabecalho("POSTAGEM DE USUÁRIO");
                const apelido = this._input("Usuario (apelido): ").toLowerCase();
                const usuario = this._redesocial.encontrarUsuarioPorApelido(apelido);
                console.log();
                console.log(`# FEED DE ${apelido.toUpperCase()}`);
                console.log();
                const publicacoesUsuario = this._redesocial.listarPublicacoesUsuario(usuario);
                console.log();
                publicacoesUsuario.forEach((publicacao) => {
                    console.log("┌────────────────────────────────────────────────────────────────────┐");
                    console.log(`  [${publicacao.id}] ${publicacao.usuario.apelido}, em ${(0, date_fns_1.format)(publicacao.dataHora, "dd/MM/yyy 'às' HH:mm")}`);
                    console.log();
                    console.log();
                    console.log("\t" + publicacao.conteudo);
                    if (publicacao instanceof class_publicacaoAvancada_1.PublicacaoAvancada) {
                        console.log();
                        console.log();
                        console.log(`  ${publicacao.listarInteracoesPublicacao()}`);
                    }
                    console.log();
                    console.log("└────────────────────────────────────────────────────────────────────┘");
                    console.log();
                });
            }
            catch (e) {
                if (e instanceof zod_1.z.ZodError) {
                    console.log(e.errors.map(err => err.message));
                }
                else if (e instanceof class_AplicationError_1.AplicationError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro Desconhecido. Contate o Administrador:\n", e);
                }
            }
            console.log();
            repetir = this._input("Listar novamente? [s/n]: ");
        } while (repetir.toLowerCase() === 's');
    }
    telaListarInteracoes() {
        let repetir = "";
        do {
            try {
                (0, utils_1.limparTela)();
                this.exibirCabecalho("RELATÓRIO DE INTERAÇÕES");
                const interacoes = this._redesocial.listarInteracoes();
                console.log();
                interacoes.forEach((interacao) => {
                    console.log();
                    console.log(`Usuário[Id]: ${interacao.usuario.id} - Interacao[Id]: ${interacao.id} - Tipo: ${interacao.tipoInteracao} - Publicação[id]: ${interacao.publicacao.id} - Data/Hora: ${(0, date_fns_1.format)(interacao.dataHora, "dd/MM/yyy 'às' HH:mm")}`);
                });
            }
            catch (e) {
                if (e instanceof zod_1.z.ZodError) {
                    console.log(e.errors.map(err => err.message));
                }
                else if (e instanceof class_AplicationError_1.AplicationError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro Desconhecido. Contate o Administrador:\n", e);
                }
            }
            console.log();
            repetir = this._input("Gerar relatório novamente? [s/n]: ");
        } while (repetir.toLowerCase() === "s");
    }
    telaListarControleIds() {
        let repetir = "";
        do {
            try {
                (0, utils_1.limparTela)();
                this.exibirCabecalho("RELATÓRIO CONTROLE DE IDs");
                console.log(`Controle IdUsuário: ${this._redesocial.controleIdUsuario}`);
                console.log(`Controle IdPublicação: ${this._redesocial.controleIdPublicacao}`);
                console.log(`Controle IdInteracao: ${this._redesocial.controleIdInteracao}`);
            }
            catch (e) {
                if (e instanceof zod_1.z.ZodError) {
                    console.log(e.errors.map(err => err.message));
                }
                else if (e instanceof class_AplicationError_1.AplicationError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro Desconhecido. Contate o Administrador:\n", e);
                }
            }
            console.log();
            repetir = this._input("Gerar relatório novamente? [s/n]: ");
        } while (repetir.toLowerCase() === "s");
    }
    telaEditarPublicacao() {
        let repetir = "";
        do {
            try {
                (0, utils_1.limparTela)();
                this.exibirCabecalho("EDITAR POSTAGEM");
                const apelido = this._input("Usuário (apelido): ");
                const usuario = this._redesocial.encontrarUsuarioPorApelido(apelido);
                console.log();
                const idPublicacao = Number(this._input("Publicação [Id]: "));
                const publicacao = this._redesocial.encontrarPublicacaoPorId(idPublicacao);
                if (publicacao.usuario !== usuario) {
                    throw new class_AplicationError_1.AppError("\nVocê pode editar publicação de outro usuário.");
                }
                console.log();
                console.log("Novo conteúdo da publicação:\n");
                const novoConteudo = this._input("> ");
                zodSchemas_1.conteudoSchema.parse(novoConteudo);
                this._redesocial.editarPublicacao(usuario, publicacao, novoConteudo);
                console.log("\nPublicação atualizada com sucesso!");
            }
            catch (e) {
                if (e instanceof zod_1.z.ZodError) {
                    console.log(e.errors.map(err => err.message));
                }
                else if (e instanceof class_AplicationError_1.AplicationError) {
                    console.log(e.message);
                }
                else {
                    console.log("\nErro Desconhecido. Contate o Administrador:\n", e);
                }
            }
            console.log();
            repetir = this._input("Editar outra publicação? [s/n]: ");
        } while (repetir.toLowerCase() === 's');
    }
    telaCriarComentario() {
        let repetir = "";
        do {
            try {
                (0, utils_1.limparTela)();
                this.exibirCabecalho("COMENTAR POSTAGEM");
                console.log("Selecione uma publicação para comentar:\n");
                const publicacoes = this._redesocial.listarPublicacoes();
                publicacoes.forEach(({ publicacao }) => {
                    console.log("┌────────────────────────────────────────────────────────────────────┐");
                    console.log(`  [${publicacao.id}] ${publicacao.usuario.apelido}, em ${(0, date_fns_1.format)(publicacao.dataHora, "dd/MM/yyyy 'às' HH:mm")}`);
                    console.log("\t" + publicacao.conteudo);
                    console.log("└────────────────────────────────────────────────────────────────────┘");
                    console.log();
                });
                console.log("Escolha a publicação de sua preferencia");
                const idPublicacao = Number(this._input("Publicação [Id]: "));
                zodSchemas_1.idSchema.parse(idPublicacao);
                const publicacao = this._redesocial.encontrarPublicacaoPorId(idPublicacao);
                console.log("\nPublicação Selecionada:");
                console.log(`  [${publicacao._id}] ${publicacao.usuario.apelido}, em ${(0, date_fns_1.format)(publicacao.dataHora, "dd/MM/yyyy 'às' HH:mm")}`);
                console.log(`\n  ${publicacao.conteudo}`);
                console.log();
                console.log("Quem é você?");
                const apelido = this._input("Usuário [apelido]: ").toLowerCase();
                const usuario = this._redesocial.encontrarUsuarioPorApelido(apelido);
                console.log();
                console.log("Comentário:\n");
                const texto = this._input("> ");
                zodSchemas_1.conteudoSchema.parse(texto);
                const comentario = new class_comentario_1.Comentario(this._redesocial.controleIdComentario, publicacao, usuario, texto, new Date());
                this._redesocial.adicionarComentarioPublicacao(publicacao, comentario);
                console.log("\nComentário registrado com sucesso!");
            }
            catch (e) {
                if (e instanceof zod_1.z.ZodError) {
                    console.log(e.errors.map(err => err.message));
                }
                else if (e instanceof class_AplicationError_1.AppError) {
                    console.log(e.message);
                }
                else {
                    console.log("\nErro Desconhecido. Contate o Administrador:\n", e);
                }
            }
            console.log();
            repetir = this._input("Comentar novamente? [s/n]: ");
        } while (repetir.toLowerCase() === 's');
    }
    telaMostrarComentarios() {
        let repetir = "";
        do {
            try {
                (0, utils_1.limparTela)();
                this.exibirCabecalho("RELATÓRIO DE COMENTÁRIOS");
                const comentarios = this._redesocial.listarComentarios();
                console.log();
                comentarios.forEach((comentario) => {
                    console.log();
                    console.log(`Comentário[id]: ${comentario.id} - Usuário: ${comentario.usuario.apelido} - Publicação[Id]: ${comentario.publicacao.id} - em ${(0, date_fns_1.format)(comentario.dataHora, "dd/MM/yyy 'às' HH:mm")}`);
                    console.log(`Texto: "${comentario.texto}"`);
                });
            }
            catch (e) {
                if (e instanceof zod_1.z.ZodError) {
                    console.log(e.errors.map(err => err.message));
                }
                else if (e instanceof class_AplicationError_1.AplicationError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro Desconhecido. Contate o Administrador:\n", e);
                }
            }
            console.log();
            repetir = this._input("Gerar relatório novamente? [s/n]: ");
        } while (repetir.toLowerCase() === "s");
    }
    telaMostrarPublicacaoEComentarios() {
        let repetir = "";
        do {
            try {
                (0, utils_1.limparTela)();
                this.exibirCabecalho("VISUALIZAR PUBLICAÇÃO E COMENTÁRIOS");
                const idPublicacao = Number(this._input("Publicação [ID]: "));
                zodSchemas_1.idSchema.parse(idPublicacao);
                const publicacao = this._redesocial.encontrarPublicacaoPorId(idPublicacao);
                console.log("┌────────────────────────────────────────────────────────────────────┐");
                console.log(`  [${publicacao._id}] ${publicacao.usuario.apelido}, em ${(0, date_fns_1.format)(publicacao.dataHora, "dd/MM/yyyy 'às' HH:mm")}`);
                console.log();
                console.log("\t" + publicacao.conteudo);
                console.log();
                if (publicacao instanceof class_publicacaoAvancada_1.PublicacaoAvancada) {
                    console.log();
                    console.log(`  ${publicacao.listarInteracoesPublicacao()}`);
                }
                console.log();
                console.log("Comentários:");
                const comentarios = publicacao.showComentarios();
                if (comentarios.length > 0) {
                    comentarios.forEach((comentario) => {
                        console.log("┌────────────────────────────────────────────────────────────────────┐");
                        console.log(`  [${comentario._id}] ${comentario.usuario.apelido}, em ${(0, date_fns_1.format)(comentario.dataHora, "dd/MM/yyyy 'às' HH:mm")}`);
                        console.log();
                        console.log("\t" + comentario.texto);
                        console.log("└────────────────────────────────────────────────────────────────────┘");
                    });
                }
                else {
                    console.log("Nenhum comentário nesta publicação.");
                }
                console.log("└────────────────────────────────────────────────────────────────────┘");
                console.log();
            }
            catch (e) {
                if (e instanceof zod_1.z.ZodError) {
                    console.log(e.errors.map(err => err.message));
                }
                else if (e instanceof class_AplicationError_1.AppError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro Desconhecido. Contate o Administrador:\n", e);
                }
            }
            console.log();
            repetir = this._input("Visualizar outra publicação? [s/n]: ");
        } while (repetir.toLowerCase() === 's');
    }
    telaEditarComentario() {
        let repetir = "";
        do {
            try {
                (0, utils_1.limparTela)();
                this.exibirCabecalho("EDITAR COMENTÁRIO");
                const apelido = this._input("Usuário (apelido): ").toLowerCase();
                const usuario = this._redesocial.encontrarUsuarioPorApelido(apelido);
                const comentariosUsuario = this._redesocial.listarComentariosPorUsuario(usuario);
                if (comentariosUsuario.length === 0) {
                    throw new class_AplicationError_1.AppError(`\nO usuário ${apelido} não possui comentários registrados.`);
                }
                console.log();
                console.log(`# Comentários de ${apelido.toUpperCase()}:`);
                console.log();
                comentariosUsuario.forEach((comentario) => {
                    console.log("┌────────────────────────────────────────────────────────────────────┐");
                    console.log(`  [${comentario._id}] ${comentario.usuario.apelido}, em ${(0, date_fns_1.format)(comentario.dataHora, "dd/MM/yyyy 'às' HH:mm")}`);
                    console.log("\t" + comentario.texto);
                    console.log("└────────────────────────────────────────────────────────────────────┘");
                    console.log();
                });
                const idComentario = Number(this._input("Digite o ID do comentário que deseja editar: "));
                const comentarioSelecionado = comentariosUsuario.find(comentario => comentario._id === idComentario);
                if (!comentarioSelecionado) {
                    throw new class_AplicationError_1.AppError(`\nComentário com ID ${idComentario} não encontrado para o usuário ${apelido}.`);
                }
                console.log();
                const novoComentario = this._input("Digite novo comentário: ");
                zodSchemas_1.conteudoSchema.parse(novoComentario);
                this._redesocial.editarComentario(usuario, comentarioSelecionado, novoComentario);
                console.log("\nComentário editado com sucesso!");
            }
            catch (e) {
                if (e instanceof zod_1.z.ZodError) {
                    console.log(e.errors.map(err => err.message));
                }
                else if (e instanceof class_AplicationError_1.AppError) {
                    console.log(e.message);
                }
                else {
                    console.log("\nErro desconhecido. Contate o administrador:\n", e);
                }
            }
            console.log();
            repetir = this._input("Editar outro comentário? [s/n]: ");
        } while (repetir.toLowerCase() === 's');
    }
}
exports.App = App;
