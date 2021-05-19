class Parede {
    constructor() {
        this.caixaEsquerda = null;
        this.caixaDireita = null;
        this.caixaCima = null;
        this.caixaBaixo = null;
        this.demolida = false;
    }

    demolir() {
        this.demolida = true;
    }
}

class Caixa {
    constructor() {
        this.paredeEsquerda = null;
        this.paredeDireita = null;
        this.paredeCima = null;
        this.paredeBaixo = null;
        this.visitada = false;
        // Debug apenas
        // this.x = null;
        // this.y = null;
    }

    paredeEsquerdaNaoVisitada() {
        return this.paredeEsquerda && this.paredeEsquerda.caixaEsquerda && !this.paredeEsquerda.caixaEsquerda.visitada;
    }

    paredeDireitaNaoVisitada() {
        return this.paredeDireita && this.paredeDireita.caixaDireita && !this.paredeDireita.caixaDireita.visitada;
    }

    paredeCimaNaoVisitada() {
        return this.paredeCima && this.paredeCima.caixaCima && !this.paredeCima.caixaCima.visitada;
    }

    paredeBaixoNaoVisitada() {
        return this.paredeBaixo && this.paredeBaixo.caixaBaixo && !this.paredeBaixo.caixaBaixo.visitada;
    }

    conectadoCima() {
        return this.paredeCima.demolida && this.paredeCima.caixaCima;
    }

    conectadoDireita() {
        return this.paredeDireita.demolida && this.paredeDireita.caixaDireita;
    }

    conectadoBaixo() {
        return this.paredeBaixo.demolida && this.paredeBaixo.caixaBaixo;
    }

    conectadoEsquerda() {
        return this.paredeEsquerda.demolida && this.paredeEsquerda.caixaEsquerda;
    }

    visitar() {
        this.visitada = true;
    }

    possuiVizinhosNaoVisitados() {
        return this.paredeEsquerdaNaoVisitada() || this.paredeDireitaNaoVisitada() ||
            this.paredeCimaNaoVisitada() || this.paredeBaixoNaoVisitada();
    }

    obterVizinhoNaoVisitadoAleatorio() {
        let naoVisitados = [];

        if (this.paredeEsquerdaNaoVisitada())
            naoVisitados.push({caixa: this.paredeEsquerda.caixaEsquerda, parede: this.paredeEsquerda});
        if (this.paredeDireitaNaoVisitada())
            naoVisitados.push({caixa: this.paredeDireita.caixaDireita, parede: this.paredeDireita});
        if (this.paredeCimaNaoVisitada())
            naoVisitados.push({caixa: this.paredeCima.caixaCima, parede: this.paredeCima});
        if (this.paredeBaixoNaoVisitada())
            naoVisitados.push({caixa: this.paredeBaixo.caixaBaixo, parede: this.paredeBaixo});

        return naoVisitados[Math.floor(Math.random() * naoVisitados.length)];
    }
}

class Ponto {
    constructor() {
        this.conexoes = [];
        // Debug apenas
        // this.x = null;
        // this.y = null;
    }
}

function inicializarPontos(dimensao) {
    let pontos = [];

    for (let y = 0; y < dimensao; y++) {
        pontos[y] = [];
        for (let x = 0; x < dimensao; x++) {
            // Debug apenas
            // ponto.x = x;
            // ponto.y = y;
            pontos[y][x] = new Ponto();
        }
    }

    return pontos;
}

function inicializarMatriz(dimensao) {
    let matriz = [];

    // Criacao das caixas
    for (let y = 0; y < dimensao; y++) {
        matriz[y] = [];
        for (let x = 0; x < dimensao; x++) {
            matriz[y][x] = new Caixa();
            // Debug apenas
            // matriz[y][x].x = x;
            // matriz[y][x].y = y;
        }
    }

    // Criacao Paredes Horizontais
    for (let y = 0; y < dimensao; y++) {

        // Parede mais a esquerda
        let paredeMatrizEsquerda = new Parede();
        paredeMatrizEsquerda.caixaDireita = matriz[y][0];
        matriz[y][0].paredeEsquerda = paredeMatrizEsquerda;

        // Paredes do meio
        for (let x = 0; x < (dimensao - 1); x++) {

            let parede = new Parede();
            parede.caixaEsquerda = matriz[y][x];
            parede.caixaDireita = matriz[y][x + 1];
            matriz[y][x].paredeDireita = parede;
            matriz[y][x + 1].paredeEsquerda = parede;
        }

        // Parade mais a direita
        let paredeMatrizDireita = new Parede();
        paredeMatrizDireita.caixaEsquerda = matriz[y][(dimensao - 1)];
        matriz[y][(dimensao - 1)].paredeDireita = paredeMatrizDireita;
    }

    // Criacao Paredes Verticais
    for (let x = 0; x < dimensao; x++) {

        // Parede mais a cima
        let paredeMatrizCima = new Parede();
        paredeMatrizCima.caixaBaixo = matriz[0][x];
        matriz[0][x].paredeCima = paredeMatrizCima;

        // Paredes do meio
        for (let y = 0; y < (dimensao - 1); y++) {

            let parede = new Parede();
            parede.caixaCima = matriz[y][x];
            parede.caixaBaixo = matriz[y + 1][x];
            matriz[y][x].paredeBaixo = parede;
            matriz[y + 1][x].paredeCima = parede;
        }

        // Parede mais a baixo
        let paredeMatrizBaixo = new Parede();
        paredeMatrizBaixo.caixaCima = matriz[(dimensao - 1)][x]
        matriz[(dimensao - 1)][x].paredeBaixo = paredeMatrizBaixo;
    }

    return matriz;
}


function criarMatrizAdjacenciaLabirinto(lab) {
    let pontos = inicializarPontos(lab.length);

    for (let y = 0; y < lab.length; y++) {
        for (let x = 0; x < lab[y].length; x++) {
            if (lab[y][x].conectadoCima())
                pontos[y][x].conexoes.push(pontos[y - 1][x]);
            if (lab[y][x].conectadoDireita())
                pontos[y][x].conexoes.push(pontos[y][x + 1]);
            if (lab[y][x].conectadoBaixo())
                pontos[y][x].conexoes.push(pontos[y + 1][x]);
            if (lab[y][x].conectadoEsquerda())
                pontos[y][x].conexoes.push(pontos[y][x - 1]);
        }
    }

    return pontos;
}

function criarLabirinto(matrizOriginal) {
    let matriz = [...matrizOriginal];

    // numeroDeCaixas = dimensão ^ 2
    let numeroDeCaixas = matriz.length * matriz[0].length;
    let caixasVisitadas = 0;
    let pilhaDeCaixas = [];

    // Abre entrada
    matriz[0][0].paredeCima.demolir();
    matriz[0][0].visitar();
    pilhaDeCaixas.push(matriz[0][0]);
    caixasVisitadas++;

    let caixaAtual = matriz[0][0];

    while (caixasVisitadas < numeroDeCaixas) {
        if (caixaAtual.possuiVizinhosNaoVisitados()) {
            let caixaVizinha = caixaAtual.obterVizinhoNaoVisitadoAleatorio();
            caixaVizinha.parede.demolir();
            caixaAtual = caixaVizinha.caixa;
            caixaAtual.visitar();
            pilhaDeCaixas.push(caixaAtual);
            caixasVisitadas++;
        } else {
            caixaAtual = pilhaDeCaixas.pop();
        }
    }

    // Abre saida
    matriz[matriz.length - 1][matriz.length - 1].paredeBaixo.demolir();

    return matriz;
}

function esperar(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function renderizarLabirinto(matriz) {
    const TAMANHO_CAIXA = 23;
    const PAREDE_DEMOLIDA = "1px solid transparent";
    const PAREDE_EXISTENTE = "1px solid #BF360C";

    const tela = document.getElementById("tela");
    tela.innerHTML = "";

    for (let y = 0; y < matriz.length; y++) {
        for (let x = 0; x < matriz[y].length; x++) {

            let caixa = document.createElement("div");
            caixa.className = "caixa";

            caixa.style.top = (TAMANHO_CAIXA * y) + "px";
            caixa.style.left = (TAMANHO_CAIXA * x) + "px";
            caixa.style.width = TAMANHO_CAIXA + "px";
            caixa.style.height = TAMANHO_CAIXA + "px";

            caixa.style.borderLeft = matriz[y][x].paredeEsquerda.demolida ? PAREDE_DEMOLIDA : PAREDE_EXISTENTE;
            caixa.style.borderRight = matriz[y][x].paredeDireita.demolida ? PAREDE_DEMOLIDA : PAREDE_EXISTENTE;
            caixa.style.borderTop = matriz[y][x].paredeCima.demolida ? PAREDE_DEMOLIDA : PAREDE_EXISTENTE;
            caixa.style.borderBottom = matriz[y][x].paredeBaixo.demolida ? PAREDE_DEMOLIDA : PAREDE_EXISTENTE;

            await esperar(1);
            tela.appendChild(caixa);
        }
    }
}

function labirinto() {
    const DIMENSAO_MATRIZ = 15;
    var matriz = inicializarMatriz(DIMENSAO_MATRIZ);
    var labirinto = criarLabirinto(matriz);

    renderizarLabirinto(labirinto).then();
    MostrarCaminho(labirinto);
}

function MostrarCaminho(matriz){
    if(inicio == destino){

    }
    

}