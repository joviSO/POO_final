"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const zodSchemas_1 = require("../zod_schemas/zodSchemas");
class Usuario {
    constructor(id, apelido, email, documento) {
        zodSchemas_1.idSchema.parse(id);
        zodSchemas_1.apelidoSchema.parse(apelido);
        zodSchemas_1.emailSchema.parse(email);
        zodSchemas_1.documentoSchema.parse(documento);
        this._id = id;
        this._apelido = apelido;
        this._email = email;
        this._documento = documento;
    }
    get id() {
        return this._id;
    }
    get apelido() {
        return this._apelido;
    }
    get email() {
        return this._email;
    }
    get documento() {
        return this._documento;
    }
    set apelido(novoApelido) {
        zodSchemas_1.apelidoSchema.parse(novoApelido);
        this._apelido = novoApelido;
    }
    set email(novoEmail) {
        zodSchemas_1.emailSchema.parse(novoEmail);
        this._email = novoEmail;
    }
    set documento(novoDocumento) {
        zodSchemas_1.documentoSchema.parse(novoDocumento);
        this._documento = (novoDocumento);
    }
}
exports.Usuario = Usuario;
;
