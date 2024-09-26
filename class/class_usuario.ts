import { apelidoSchema, documentoSchema, emailSchema, idSchema } from "../zod_schemas/zodSchemas";

class Usuario {

    readonly _id: number;
    private _apelido: string;
    private _email: string;
    private _documento: string;

    constructor (id: number, apelido: string, email: string, documento: string) {
        idSchema.parse(id);
        apelidoSchema.parse(apelido);
        emailSchema.parse(email);
        documentoSchema.parse(documento);
        
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

    set apelido (novoApelido: string) {
        apelidoSchema.parse(novoApelido);
        this._apelido = novoApelido;
    }

    set email (novoEmail) {
        emailSchema.parse(novoEmail);
        this._email = novoEmail;
    }

    set documento (novoDocumento) {
        documentoSchema.parse(novoDocumento);
        this._documento = (novoDocumento);
    }

};


export {Usuario};