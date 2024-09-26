
import { conteudoSchema, idSchema } from "../zod_schemas/zodSchemas";
import { Usuario } from "./class_usuario";
import { Comentario } from "./class_comentario";


class Publicacao {
	readonly _id: number;
	private _usuario: Usuario;
	private _conteudo: string;
	private _dataHora: Date;
	private _comentarios: Comentario[];

	constructor (id: number, usuario: Usuario, conteudo: string, dataHora: Date){
		idSchema.parse(id);
		conteudoSchema.parse(conteudo);

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

	set conteudo (novoConteudo: string) {
		conteudoSchema.parse(novoConteudo);
		this._conteudo = novoConteudo;
		this._dataHora = new Date();
	}

	criarComentario(comentario: Comentario): void {
		this._comentarios.push(comentario);
	}

	showComentarios() {
		return this._comentarios.slice().sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime());
	}
	
	totalComentarios(): number {
		return this._comentarios.length;
	}

	obterUltimosComentarios(): Comentario[] {
		return this._comentarios.slice(-2).reverse();
	}
}

export {Publicacao};