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
    set conteudo(novoConteudo) {
        zodSchemas_1.conteudoSchema.parse(novoConteudo);
        this._conteudo = novoConteudo;
        this._dataHora = new Date();
    }
}
exports.Publicacao = Publicacao;
