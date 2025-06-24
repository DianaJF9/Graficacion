var estadoJugador = "Quieto";
var desplegable = document.getElementById('Animaciones');
desplegable.addEventListener('change', function (e) {
    var target = e.target;
    estadoJugador = target.value;
});
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var CANVAS_ANCHO = (canvas.width = 600);
var CANVAS_ALTURA = (canvas.height = 600);
var imageJugador = new Image();
imageJugador.src = 'shadow_dog.png';
var spriteAncho = 575;
var spriteAltura = 523;
var marcoJuego = 0;
var escalonarMarco = 5;
var animacioneSprite = {};
var estadosAnimacion = [
    { nombre: 'Quieto', marcos: 7 },
    { nombre: 'Brinca', marcos: 7 },
    { nombre: 'Cae', marcos: 7 },
    { nombre: 'Corre', marcos: 9 },
    { nombre: 'Mareado', marcos: 11 },
    { nombre: 'Abajo', marcos: 5 },
    { nombre: 'Rueda', marcos: 7 },
    { nombre: 'Ataca', marcos: 7 },
    { nombre: 'Derrotado', marcos: 12 },
    { nombre: 'Golpeado', marcos: 4 }
];
estadosAnimacion.forEach(function (estado, index) {
    var marcos = { loc: [] };
    for (var j = 0; j < estado.marcos; j++) {
        var posicionX = j * spriteAncho;
        var posicionY = index * spriteAltura;
        marcos.loc.push({ x: posicionX, y: posicionY });
    }
    animacioneSprite[estado.nombre] = marcos;
});
console.log(animacioneSprite);
function animar() {
    ctx.clearRect(0, 0, CANVAS_ANCHO, CANVAS_ALTURA);
    var posicion = Math.floor(marcoJuego / escalonarMarco) % animacioneSprite[estadoJugador].loc.length;
    var marcoX = spriteAncho * posicion;
    var marcoY = animacioneSprite[estadoJugador].loc[posicion].y;
    ctx.drawImage(imageJugador, marcoX, marcoY, spriteAncho, spriteAltura, 0, 0, spriteAncho, spriteAltura);
    marcoJuego++;
    requestAnimationFrame(animar);
}
animar();
