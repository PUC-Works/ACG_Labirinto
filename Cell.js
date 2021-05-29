function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.paredes = [true, true, true, true];
    this.visitado = false;
    this.verificarVizinhos = function () {
        let vizinhos = [];
        let topo = grid[index(i, j - 1)];
        let direita = grid[index(i + 1, j)];
        let baixo = grid[index(i, j + 1)];
        let esquerda = grid[index(i - 1, j)];

        if (topo && !topo.visitado) {
            vizinhos.push(topo);
        }
        if (direita && !direita.visitado) {
            vizinhos.push(direita);
        }
        if (baixo && !baixo.visitado) {
            vizinhos.push(baixo);

        }
        if (esquerda && !esquerda.visitado) {
            vizinhos.push(esquerda);
        }
        if (vizinhos.length > 0) {
            let r = floor(random(0, vizinhos.length));
            return vizinhos[r];
        } else {
            return undefined;
        }
       

    };
    this.realcar = function () {
        let x = this.i * w;
        let y = this.j * w;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, w, w);
    };
    this.Celula_de_alta_corrente = function(){
        let x = this.i * w;
        let y = this.j * w;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, w, w);

    };
    this.show = function () {
        let x = this.i * w;
        let y = this.j * w;
        stroke(255);
        if (this.paredes[0]) {
            line(x, y, x + w, y);
        }
        if (this.paredes[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.paredes[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.paredes[3]) {
            line(x, y + w, x, y);
        }

        if (this.visitado) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, w, w);
        }

    };

}
