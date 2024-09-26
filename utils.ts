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
