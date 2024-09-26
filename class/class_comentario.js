"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comentario = void 0;
const zodSchemas_1 = require("../zod_schemas/zodSchemas");
class Comentario {
    constructor(id, publicacao, usuario, texto, data) {
        zodSchemas_1.idSchema.parse(id);
        zodSchemas_1.conteudoSchema.parse(texto);
        this._id = id;
        this._usuario = usuario;
        this._texto = texto;
        this._dataHora = data;
        this._publicacao = publicacao;
    }
    get id() {
        return this._id;
    }
    get usuario() {
        return this._usuario;
    }
    get texto() {
        return this._texto;
    }
    get dataHora() {
        return this._dataHora;
    }
    get publicacao() {
        return this._publicacao;
    }
}
exports.Comentario = Comentario;
