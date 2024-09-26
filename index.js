"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const class_app_1 = require("./class/class_app");
const class_redeSocial_1 = require("./class/class_redeSocial");
const zod_1 = require("zod");
const class_AplicationError_1 = require("./class/class_AplicationError");
let input = (0, prompt_sync_1.default)();
let arquivoUsuarios = "./database/usuarios.csv";
let arquivoPublicacoes = "./database/publicacoes.csv";
let arquivoInteracoes = "./database/interacoes.csv";
let arquivoComentarios = './database/comentarios.csv';
function main() {
    let op = "";
    console.log("\nInicializando MIRC - Mini Interative Rede Social\nCarregando dados...");
    let redesocial = new class_redeSocial_1.RedeSocial();
    try {
        redesocial.carregarDados(arquivoUsuarios, arquivoPublicacoes, arquivoInteracoes, arquivoComentarios);
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
    finally {
        do {
            let app = new class_app_1.App(redesocial);
            app.telaPrincipal();
            op = input("Opção: ");
            switch (op) {
                case "1":
                    app.telaCadastrarUsuario();
                    break;
                case "2":
                    app.telaListarUsusario();
                    break;
                case "3":
                    app.telaInserirPublicacao();
                    break;
                case "4":
                    app.telaListarPublicacoes();
                    break;
                case "5":
                    app.telaInteragir();
                    break;
                case "6":
                    app.telaListarPublicacoesPorUsuario();
                    break;
                case "7":
                    app.telaEditarPublicacao();
                    break;
                case "8":
                    // app.telaComentar();
                    break;
                case "9":
                    app.telaListarInteracoes();
                    break;
                case "10":
                    // app.telaListarComentarios();
                    break;
                case "0":
                    app.redesocial.salvarDados(arquivoUsuarios, arquivoPublicacoes, arquivoInteracoes, arquivoComentarios);
                    console.log();
                    console.log("Salvando dados...");
                    break;
                default:
                    input("\nOpção Inválida. \n [enter]");
                    break;
            }
        } while (op != "0");
    }
    console.log();
    console.log("\nAplicação encerrada !! \n");
}
main();
