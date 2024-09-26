import { Usuario } from "./class_usuario";
import { Publicacao } from "./class_publicacao";
import { AppError } from "./class_AplicationError";
import { PublicacaoAvancada } from "./class_publicacaoAvancada";
import { Interacao } from "./class_interacao";
import fs from 'fs';
import { TipoInteracao } from "../utils";

class RedeSocial {
	private _usuarios: Usuario[];
	private _publicacoes: Publicacao[];
	private _interacoes: Interacao[];
	private _controleIdUsuario: number;
	private _controleIdPublicacao: number;
	private _controleIdInteracao: number;

	constructor (
		usuarios: Usuario[] = [],
		publicacoes: Publicacao [] = [],
		interacoes: Interacao[] = [],
		controleIdUsuario: number = 1,
		controleIdPublicacao: number = 1,
		controleIdInteracao: number = 1,
	) {
		this._usuarios = usuarios;
		this._publicacoes = publicacoes;
		this._interacoes = interacoes;
		this._controleIdUsuario = controleIdUsuario;
		this._controleIdPublicacao = controleIdPublicacao;
		this._controleIdInteracao = controleIdInteracao;
	}

	get usuarios() {
		return this._usuarios;
	}

	get publicacoes() {
		return this._publicacoes;
	}

	get interacoes() {
		return this._interacoes;
	}  

	get controleIdUsuario() {
		return this._controleIdUsuario;
	}

	get controleIdInteracao () {
		return this._controleIdInteracao;
	}

	get controleIdPublicacao() {
		return this._controleIdPublicacao;
	}

	validarIdUsuario (id: number): void {
		if (this._usuarios.some((u: Usuario) => u.id === id)) {
			throw new AppError(`\nJá existe um usuário com o ID: ${id}.`);
		}
	}

	validarApelidoUsuario (apelido: string): void {
		if (this._usuarios.some((u: Usuario) => u.apelido === apelido)) {
			throw new AppError(`\nJá existe um usuário com o apelido: ${apelido}.`);
		} 
	}

	validarEmailUsuario (email: string): void {
		if (this._usuarios.some((u: Usuario) => u.email === email)) {
			throw new AppError (`\nJá existe um usuário com o e-mail: ${email}.`);
		}
	}

	validarDocumentoUsuario (documento: string): void {
		if (this._usuarios.some((u: Usuario) => u.documento === documento)) {
			throw new AppError (`\nJá existe um usuário com o CPF: ${documento}.`);
		}
	}

	encontrarUsuarioPorApelido(apelido: string): Usuario {
		const usuario = this._usuarios.find(u => u.apelido === apelido);
		if (!usuario) {
			throw new AppError(`\nUsuário não encontrado`);
		}
		return usuario;
	}

	encontrarPublicacaoPorId(idPublicacao: number): Publicacao {
		const publicacao = this._publicacoes.find(p => p.id === idPublicacao);
		if (!publicacao) {
			throw new AppError(`\nPublicacação não encontrada`);
		}
		return publicacao;
	}

	adicionarUsuario(usuario: Usuario): void {
		this.validarIdUsuario(usuario.id);
		this.validarApelidoUsuario(usuario.apelido);
		this.validarEmailUsuario(usuario.email);
		this.validarDocumentoUsuario(usuario.documento);
		
		this._usuarios.push(usuario);
		this._controleIdUsuario +=1;
	}

	adicionarPublicacao(publicacao: Publicacao): void {
		this._publicacoes.push(publicacao);
		this._controleIdPublicacao += 1;
	}

	adicionarInteracao(publicacao: Publicacao, interacao: Interacao): void {
		if (!(publicacao instanceof PublicacaoAvancada)) {
			throw new AppError("\nEsta é uma Publicação Simples. Interações somente em Publicações Avançadas!");
		}

		publicacao.adicionarInteracao(interacao);
	
		this._interacoes.push(interacao);
		this._controleIdInteracao += 1;
	}

	listarUsuarios(): void {
		if (this._usuarios.length === 0) {
			throw new AppError("\nNão existem usuários cadastradaos.");
		}
		
		console.log("Lista de Usuários:");
		this._usuarios.forEach((usuario: Usuario) => {
			console.log();
			console.log(`ID: ${usuario.id}, Apelido: ${usuario.apelido}, Email: ${usuario.email}, Documento: ${usuario.documento}`);
		});
	}

	listarPublicacoes(): Publicacao[] {
		if (this._publicacoes.length === 0) {
			throw new AppError ("\nNenhuma publicação encontrada");
		}

		const publicacoesOrdenadas: Publicacao[] = [...this._publicacoes].sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime());

		return publicacoesOrdenadas;
	}

	listarInteracoes(): Interacao[]{
		if (this._interacoes.length === 0){
			throw new AppError("\nnenhuma interação encontrada");
		}

		const interacoesOrdenadas: Interacao[] = [...this._interacoes].sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime());

		return interacoesOrdenadas;
	}

	listarPublicacoesUsuario(usuario: Usuario): Publicacao[] {
		const publicacoesOrdenadas: Publicacao[] = [...this._publicacoes].sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime());

		const publicacoesUsuario = publicacoesOrdenadas.filter(p => p.usuario === usuario);

		if (publicacoesUsuario.length === 0) {
			throw new AppError ("\nNenhuma publicação encontrada.");
		}

		return publicacoesUsuario;
	}

	editarPublicacao(usuario: Usuario, publicacao: Publicacao, novoConteudo: string): void {
		if (usuario !== publicacao.usuario) {
			throw new AppError("\nVocê não pode editar publicação de outro usuário.");
		}

		publicacao.conteudo = novoConteudo;
	}


	salvarDados (arquivoUsuarios:string, arquivoPublicacoes: string, arquivoInteracoes: string): void{
		let usuariosContent: string = "USUÁRIOS\r\n";
		for (let usuario of this._usuarios){
			usuariosContent += `${usuario.id};${usuario.apelido};${usuario.email};${usuario.documento}\r\n`;
		}
		
		usuariosContent = usuariosContent.slice(0, usuariosContent.length - 2);

		let publicacoesContent: string = "PUBLICAÇÕES\r\n";
		for (let publicacao of this._publicacoes){
			const tipoPublicacao = publicacao instanceof PublicacaoAvancada ? 'PA' : 'PS';
			publicacoesContent += `${publicacao.id};${publicacao.usuario.id};${publicacao.conteudo};${publicacao.dataHora};${tipoPublicacao}\r\n`
		}

		publicacoesContent = publicacoesContent.slice(0, publicacoesContent.length - 2);

		let interacoesContent: string = "INTERAÇÕES\r\n";
		for (let interacao of this._interacoes){
			interacoesContent += `${interacao.id};${interacao.publicacao.id};${interacao.tipoInteracao};${interacao.usuario.id};${interacao.dataHora}\r\n`
		}

		interacoesContent = interacoesContent.slice(0, interacoesContent.length - 2);

		fs.writeFileSync(arquivoUsuarios, usuariosContent, 'utf-8');
		fs.writeFileSync(arquivoPublicacoes, publicacoesContent, 'utf-8');
		fs.writeFileSync(arquivoInteracoes, interacoesContent, 'utf-8');
	}


	carregarDados (arquivoUsuarios:string, arquivoPublicacoes: string, arquivoInteracoes:string): void {
		if (!(fs.existsSync(arquivoUsuarios) && fs.existsSync(arquivoPublicacoes) && fs.existsSync(arquivoInteracoes))) {
			throw new Error('Primeiro Acesso [Arquivo não encontrado]. Iniciando com os dados padrão');
		}

		let usuariosData = fs.readFileSync(arquivoUsuarios, 'utf-8');
		usuariosData.split('\r\n').slice(1).map(linha => {
			const [id, apelido, email, documento] = linha.split(';');
			const usuario = new Usuario(Number(id), apelido, email, documento);
			this._usuarios.push(usuario);
		});
	  
		const usuarioMap: { [key: number]: Usuario } = {};
		this._usuarios.forEach(usuario => {
			usuarioMap[Number(usuario.id)] = usuario;
		});

		let publicacoesData = fs.readFileSync(arquivoPublicacoes, 'utf-8');
		publicacoesData.split('\r\n').slice(1).map(linha => {
			const [id, usuarioId, conteudo, dataHora, tipo] = linha.split(';');
			const usuario = usuarioMap[Number(usuarioId)];
			const data = new Date(dataHora);

			if (tipo === 'PA') {
				const publicacao = new PublicacaoAvancada(Number(id), usuario, conteudo, data);
				this.adicionarPublicacao(publicacao);
			} else {
				const publicacao = new Publicacao(Number(id), usuario, conteudo, data);
				this.adicionarPublicacao(publicacao);
			}

		});
		const publicacaoMap: { [key: number]: Publicacao } = {};
		this._publicacoes.forEach(publicacao => {
			publicacaoMap[Number(publicacao.id)] = publicacao;  
		});
		
		let interacoesData = fs.readFileSync(arquivoInteracoes, 'utf-8');
		interacoesData.split('\r\n').slice(1).map(linha => {
			const [id, publicacaoId, tipoInteracao, usuarioId, dataHora] = linha.split(';');
			const publicacao = publicacaoMap[Number(publicacaoId)];
			const usuario = usuarioMap[Number(usuarioId)];
			const data = new Date(dataHora);
			const tipo = tipoInteracao as TipoInteracao;

			const interacao = new Interacao(Number(id), publicacao, tipo, usuario, data);

			if (publicacao instanceof PublicacaoAvancada) {   
				this.adicionarInteracao(publicacao, interacao);
			}
		});
  
		this._controleIdUsuario = this._usuarios.length + 1;
	}
}

export {RedeSocial};