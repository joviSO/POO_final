
import { conteudoSchema, idSchema } from "../zod_schemas/zodSchemas";
import { Usuario } from "./class_usuario";


class Publicacao {

    readonly _id: number;
    private _usuario: Usuario;
    private _conteudo: string;
    private _dataHora: Date;

    constructor (id: number, usuario: Usuario, conteudo: string, dataHora: Date){
        idSchema.parse(id);
        conteudoSchema.parse(conteudo);

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

    set conteudo (novoConteudo: string) {
        conteudoSchema.parse(novoConteudo);
        this._conteudo = novoConteudo;
        this._dataHora = new Date();
    }
}


export {Publicacao};