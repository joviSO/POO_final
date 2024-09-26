"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publicacao = void 0;
const zodSchemas_1 = require("../zod_schemas/zodSchemas");
class Publicacao {
    constructor(id, usuario, conteudo, dataHora) {
        zodSchemas_1.idSchema.parse(id);
        zodSchemas_1.conteudoSchema.parse(conteudo);
        this._id = id;
        this._usuario = usuario;
        this._conteudo = conteudo;
        this._dataHora = dataHora;
        this._comentarios = [];
    }
    get id() {
        return this._id;
    }
    get usuario() {
        return this._usuario;
    }
    get conteudo() {
        return this._conteudo;
    }
    get dataHora() {
        return this._dataHora;
    }
    get comentarios() {
        return [...this._comentarios].sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime());
    }
    set conteudo(novoConteudo) {
        zodSchemas_1.conteudoSchema.parse(novoConteudo);
        this._conteudo = novoConteudo;
        this._dataHora = new Date();
    }
    criarComentario(comentario) {
        this._comentarios.push(comentario);
    }
    showComentarios() {
        return this._comentarios.slice().sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime());
    }
    totalComentarios() {
        return this._comentarios.length;
    }
}
exports.Publicacao = Publicacao;
