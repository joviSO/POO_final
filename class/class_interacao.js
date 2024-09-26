"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interacao = void 0;
const zodSchemas_1 = require("../zod_schemas/zodSchemas");
class Interacao {
    constructor(id, publicacao, tipoInteracao, usuario, dataHora) {
        zodSchemas_1.idSchema.parse(id);
        zodSchemas_1.tipoInteracaoSchema.parse(tipoInteracao);
        this._id = id;
        this._publicacao = publicacao;
        this._tipoInteracao = tipoInteracao;
        this._usuario = usuario;
        this._dataHora = dataHora;
    }
    get id() {
        return this._id;
    }
    get publicacao() {
        return this._publicacao;
    }
    get tipoInteracao() {
        return this._tipoInteracao;
    }
    get usuario() {
        return this._usuario;
    }
    get dataHora() {
        return this._dataHora;
    }
}
exports.Interacao = Interacao;
