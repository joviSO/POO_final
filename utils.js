"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoInteracao = void 0;
exports.limparTela = limparTela;
var TipoInteracao;
(function (TipoInteracao) {
    TipoInteracao["Like"] = "like";
    TipoInteracao["Dislike"] = "dislike";
    TipoInteracao["Riso"] = "riso";
    TipoInteracao["Aplauso"] = "aplauso";
    TipoInteracao["Amor"] = "amor";
})(TipoInteracao || (exports.TipoInteracao = TipoInteracao = {}));
;
function limparTela() {
    process.stdout.write("\x1Bc");
}
