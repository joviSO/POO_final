import { Publicacao } from "./class_publicacao";
import { Usuario } from "./class_usuario";
import { conteudoSchema, idSchema } from "../zod_schemas/zodSchemas";

class Comentario {
    readonly _id: number
    private _publicacao: Publicacao;
    private _usuario: Usuario;
    private _texto: string;
    private _dataHora: Date;

    constructor(id: number, publicacao: Publicacao, usuario: Usuario, texto: string, data: Date){
        idSchema.parse(id);
        conteudoSchema.parse(texto);

        this._id = id;
        this._usuario = usuario;
        this._texto = texto;
        this._dataHora = data;
        this._publicacao = publicacao;
    }

    get id(): number{
        return this._id;
    }

    get usuario(): Usuario{
        return this._usuario;
    }

    get texto(): string{
        return this._texto;
    }

    get dataHora(): Date{
        return this._dataHora;
    }

    get publicacao(): Publicacao{
        return this._publicacao;
    }

}

export { Comentario };