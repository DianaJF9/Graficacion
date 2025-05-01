export class CanvasLocal {
    constructor(g, canvas) {
        this.graphics = g;
        this.rWidth = 12;
        this.rHeight = 8;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / 12;
        this.centerY = this.maxY / 8 * 7;
    }
    iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
    iY(y) { return Math.round(this.centerY - y / this.pixelSize); }
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    drawRmboide(x1, y1, x2, y2, x3, y3, x4, y4, color) {
        // Color de relleno
        this.graphics.fillStyle = color;
        // Comenzamos la ruta de dibujo, o path
        this.graphics.beginPath();
        // Mover a la esquina superior izquierda
        this.graphics.moveTo(x1, y1);
        // Dibujar la línea hacia la derecha
        this.graphics.lineTo(x2, y2);
        // Ahora la que va hacia abajo
        this.graphics.lineTo(x3, y3); // A 80 porque esa es la altura
        // La que va hacia la izquierda
        this.graphics.lineTo(x4, y4);
        // Y dejamos que la última línea la dibuje JS
        this.graphics.closePath();
        // Hacemos que se dibuje
        this.graphics.stroke();
        // Lo rellenamos
        this.graphics.fill();
    }
    fx(x) {
        return Math.sin(x * 2.5);
    }
    paint() {
        let maxEsc = 100;
        let h = [10, 30, 80, 50];
        let colors = ['skyblue', 'limegreen', 'deeppink', 'darkorange'];
        this.drawLine(this.iX(0), this.iY(-0.7), this.iX(8), this.iY(-0.7)); //linea X
        this.drawLine(this.iX(0), this.iY(-0.7), this.iX(0), this.iY(5)); //Linea Y
        for (let y = 0; y <= 5; y += 1) {
            this.drawLine(this.iX(0.5), this.iY(y), this.iX(8), this.iY(y));
            this.drawLine(this.iX(0), this.iY(y - 0.7), this.iX(0.5), this.iY(y)); //diagonal
        }
        //this.graphics.strokeStyle = 'magenta';
        let ind = 0;
        for (let i = 0.5; i <= 8; i += 2) {
            let sombra;
            if (colors[ind] === 'skyblue')
                sombra = 'rgb(70, 130, 180)'; // versión más oscura
            else if (colors[ind] === 'limegreen')
                sombra = 'rgb(0, 100, 0)';
            else if (colors[ind] === 'deeppink')
                sombra = 'rgb(199, 21, 133)';
            else if (colors[ind] === 'darkorange')
                sombra = 'rgb(205, 102, 0)';
            else
                sombra = colors[ind];
            //this.graphics.strokeStyle = colors[ind];
            this.graphics.fillStyle = colors[ind];
            this.graphics.strokeStyle = colors[ind];
            console.log(this.rHeight * (h[ind] / maxEsc));
            /*this.drawLine(this.iX(i), this.iY(6 * h[ind] / maxEsc), this.iX(i), this.iY(0.2));*/
            //Frente de la barra
            this.graphics.fillRect(this.iX(i), this.iY((5 * h[ind] / maxEsc) - 0.5), this.iX(2) - this.iX(1), (this.iY(0) - this.iY(5 * h[ind] / maxEsc)));
            //Tapa romboide
            // this.drawRmboide(
            //   this.iX(i + 0.5), this.iY(5 * h[ind] / maxEsc),
            //   this.iX(i + 1.5), this.iY(5 * h[ind] / maxEsc),
            //   this.iX(i + 1), this.iY((5 * h[ind] / maxEsc) - 0.5),
            //   this.iX(i), this.iY((5 * h[ind] / maxEsc) - 0.5),
            //   sombra); 
            //Tapa romboide blanco
            this.graphics.save(); // guarda el estado actual
            this.graphics.strokeStyle = 'white';
            this.drawRmboide(this.iX(i + 0.5), this.iY(5), // Empieza en la parte superior coloreada
            this.iX(i + 1.5), this.iY(5), this.iX(i + 1), this.iY(5 - 0.5), // Termina en la parte superior de la gráfica
            this.iX(i) + 0.2, this.iY(5 - 0.5), // Termina en la parte superior de la gráfica
            'lightgray');
            this.graphics.restore(); // vuelve al estilo anterior
            //Romboide lado derecho
            this.drawRmboide(this.iX(i + 1), this.iY((5 * h[ind] / maxEsc) - 0.5), this.iX(i + 1.5), this.iY((5 * h[ind] / maxEsc)), this.iX(i + 1.5), this.iY(0), this.iX(i + 1), this.iY(-0.5), sombra);
            //Romboide lado derecho blanco  
            this.graphics.save(); // guarda el estado actual
            this.graphics.strokeStyle = 'white';
            this.drawRmboide(this.iX(i + 1), this.iY((5 * h[ind] / maxEsc) - 0.5), this.iX(i + 1.5), this.iY((5 * h[ind] / maxEsc)), this.iX(i + 1.5), this.iY(5), // Termina en la parte superior de la gráfica
            this.iX(i + 1), this.iY(5 - 0.5), // Ajuste vertical
            'lightgray'); // Ejemplo de sombra más visible);
            this.graphics.restore(); // vuelve al estilo anterior
            // FRente blanco
            this.graphics.fillStyle = 'white';
            this.graphics.fillRect(this.iX(i), this.iY(4.5), // Comenzar en la parte superior de la barra
            this.iX(2) - this.iX(1), // Ancho de la barra
            this.iY((5 * h[ind] / maxEsc) - 0.5) - this.iY(4.5) // Alto de la parte "vacía"
            );
            ind++;
        }
        // Nombre de las barras
        ind = 0;
        for (let x = 0; x < 8; x += 2) {
            this.graphics.fillStyle = 'black'; // Establece el color del texto en negro
            this.graphics.fillText(colors[ind++], this.iX(x + 0.5), this.iY(-1)); // Usa fillText para dibujar el texto en negro
        }
        for (let y = 0; y < h.length; y++) {
            this.graphics.fillStyle = 'black'; // Asegúrate de que el texto de los porcentajes sea negro
            this.graphics.fillText(`${h[y]}%`, this.iX(9), this.iY(4.9 - y));
            this.graphics.fillStyle = colors[y];
            this.graphics.fillRect(this.iX(8.5), this.iY(5 - y), 10, 10);
        }
    }
}
