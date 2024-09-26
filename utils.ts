import { Interacao } from "./class/class_interacao";
import { Publicacao } from "./class/class_publicacao";
import { Usuario } from "./class/class_usuario";
import fs from 'fs';



enum TipoInteracao {
    Like = "like",
    Dislike = "dislike",
    Riso = "riso",
    Aplauso = "aplauso",
    Amor = "amor"
};



function limparTela(): void {
  process.stdout.write("\x1Bc");
}
  

export {TipoInteracao, limparTela};

