let colunas, linhas;
let w = 20;
let grid = [];
let atual;
let pilha = [];
let celula_mais_distante;
let comprimento_da_pilha = 0;
let labirinto_terminado = false;
let pilha_de_caminho_correto = [];
var countDown = 3;
let todos_nao_visitados = [];
let celula_fantasma = { i: 0, j: 0 };
let draw_fantasma = false;
let contador = 0;
let intervalo_fantasma = 1;
let contagem_de_framer = 0;
let pilha_de_copia;
//Intervalo  q verifica se o  labirinto  terminou  para começar uma contagem ate 3 para começar 
let time = setInterval(() => {
  if (labirinto_terminado) {
    if (countDown > 0) {
      countDown -= 1;
    }
    // intervalo  de vertices percorrido  sendo  de 1 ate 2 assim  evita q o ponto  pule vertices do  grafo
    if (countDown === 0) {
      if (2 === 2) {
        comprimento_da_pilha -= 2;
      }

    }
  }
}, 1000);
// metodo  para fazer o  ponto  pecorrer os vertices correto  no grafo  assim chegando  no  vertice mais distante
let fantamas_Timer = setInterval(() => {
  if (countDown === 0) {
    draw_fantasma = true;
    celula_fantasma = pilha_de_caminho_correto[(pilha_de_caminho_correto.length - (floor((2 * 0.6) * intervalo_fantasma)))]; // (floor) => retorna o menor número inteiro dentre o número "x". dentro  do  arrey
    if (celula_fantasma) {
      pilha_de_caminho_correto.splice((pilha_de_caminho_correto.length - (floor((2 * 0.6) * intervalo_fantasma))), pilha_de_caminho_correto.length); //  altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
    } else {
      ghostCell = celula_mais_distante;
    }
  }
}, intervalo_fantasma * 500);
// metodo  responsavel  para criar o canvas 
function setup() {
  createCanvas(400, 400);
  /* centerCanvas(); */
  colunas = floor(width / w);
  linhas = floor(height / w);

  for (let j = 0; j < linhas; j++) {
    for (let i = 0; i < colunas; i++) {
      var cell = new Cell(i, j);
      grid.push(cell); //  adiciona um ou mais elementos ao final de um array e retorna o novo comprimento desse array.
    }
  }
  atual = grid[0];

}
//metodo  responsavel  em  contruir o  labirinto  e definir o  caminho  correto  com uma adaptação  de bfs
function draw() {
  background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  atual.visitado = true;
  if (labirinto_terminado === false) {
    atual.realcar();
  }
  let next = atual.verificarVizinhos();
  if (next) { // parte para criação  do  labirinto
    next.visitado = true;
    pilha.push(atual); // adiciona um ou mais elementos ao final de um array e retorna o novo comprimento desse array.
    remover_paredes(atual, next);
    atual = next;
    todos_nao_visitados.push(atual);  //adiciona um ou mais elementos ao final de um array e retorna o novo comprimento desse array.
  } else if (pilha.length > 0) { // parte para definir a rotas 
    if (pilha.length > comprimento_da_pilha) {
      pilha_de_caminho_correto = [];
      todos_nao_visitados = [];
      comprimento_da_pilha = pilha.length;
      celula_mais_distante = atual;
      pilha_de_caminho_correto.push(atual); // adiciona um ou mais elementos ao final de um array e retorna o novo comprimento desse array.
    }
    atual = pilha.pop(); // remove o  ultimo  elemento  do  array

    if (pilha_de_caminho_correto.indexOf(atual) === -1 && todos_nao_visitados.indexOf(atual) === -1) {
      pilha_de_caminho_correto.push(atual); //  adiciona um ou mais elementos ao final de um array e retorna o novo comprimento desse array.
    }
  } else if (pilha.length === 0) { // quando  a pilha for de tamanho  0 liberar a celula fantasma 
    if (draw_fantasma === false) {
      draw_fantasma = true;
    }

    let fimX = (celula_mais_distante.i) * w; // define o  a cordenada x do  vertice mais distante 
    let fimy = (celula_mais_distante.j) * w; // define a cordenada  y  do  vertice mais distante 
    fill(0, 255, 0, 255);
    var entrada = ellipse(0 + w / 2, 0 + w / 2, w / 1.5, w / 1.5);// cria a entrada 
    var saida = ellipse(fimX + w / 2, fimy + w / 2, w / 1.5, w / 1.5); // cria a saida 
    labirinto_terminado = true; // Fleg para dizer se o  labirinto  já foi  todo  desenhado  e setados as variaveis de caminho.

  }
  noStroke(); // Desativa o desenho do traço (contorno). Se noStroke () e noFill () forem chamados, nada será desenhado na tela.
  fill(0, 255, 255, 255);
  if (draw_fantasma) {
    noStroke(); //Desativa o desenho do traço (contorno). Se noStroke () e noFill () forem chamados, nada será desenhado na tela.
    fill(255, 165, 0, 255);
    ellipse((celula_fantasma.i * w) + w / 2, (celula_fantasma.j * w) + w / 2, w / 1.5, w / 1.5);

  }
  if (atual === celula_mais_distante || celula_fantasma === celula_mais_distante) {
    noLoop(); // Impede que o p5.js execute continuamente o código em draw () . Se loop () for chamado, o código em draw () começará a ser executado continuamente novamente. Se estiver usando noLoop () em setup () , deve ser a última linha dentro do bloco.
  }

}

function index(i, j) {
  if (i < 0 || j < 0 || i > colunas - 1 || j > linhas - 1) {
    return -1;
  }
  return i + j * colunas;
}
// Metodo  q remove as paredes da celular 
function remover_paredes(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.paredes[3] = false;
    b.paredes[1] = false;
  } else if (x === -1) {
    a.paredes[1] = false;
    b.paredes[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.paredes[0] = false;
    b.paredes[2] = false;
  } else if (y === -1) {
    a.paredes[2] = false;
    b.paredes[0] = false;
  }
}

