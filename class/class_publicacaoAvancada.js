"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicacaoAvancada = void 0;
const class_publicacao_1 = require("./class_publicacao");
const class_AplicationError_1 = require("./class_AplicationError");
class PublicacaoAvancada extends class_publicacao_1.Publicacao {
    constructor(id, usuario, conteudo, dataHora) {
        super(id, usuario, conteudo, dataHora);
        this._interacoes = [];
        this._contadorInteracoes = { like: 0, dislike: 0, riso: 0, aplauso: 0, amor: 0 };
        this._emojiMap = { like: '👍', dislike: '👎', riso: '😂', aplauso: '👏', amor: '❤️' };
        this._usuariosInteragiram = [];
    }
    get interacoes() {
        return this._interacoes;
    }
    get usuariosInteragiram() {
        return this._usuariosInteragiram;
    }
    adicionarInteracao(interacao) {
        const apelido = interacao.usuario.apelido;
        if (this._usuariosInteragiram.includes(apelido)) {
            throw new class_AplicationError_1.AppError(`\nUsuário: ${interacao.usuario.apelido} já interagiu nessa publicacao.`);
        }
        if (this.usuario === interacao.usuario) {
            throw new class_AplicationError_1.AppError("\nVocê não pode interagir em sua própria publicação.");
        }
        this._interacoes.push(interacao);
        this._usuariosInteragiram.push(interacao.usuario.apelido);
        this._contadorInteracoes[interacao.tipoInteracao]++;
    }
    totalInteracoes() {
        return this._interacoes.length;
    }
    listarInteracoesPublicacao() {
        return Object.entries(this._contadorInteracoes)
            .map(([tipo, contagem]) => `${this._emojiMap[tipo]} ${contagem}`)
            .join('    ');
    }
}
exports.PublicacaoAvancada = PublicacaoAvancada;
;
