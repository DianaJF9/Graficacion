let estadoJugador: string = "Quieto";

const desplegable = document.getElementById('Animaciones') as HTMLSelectElement;
desplegable.addEventListener('change', function (e: Event) {
    const target = e.target as HTMLSelectElement;
    estadoJugador = target.value;
});

const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const CANVAS_ANCHO = (canvas.width = 600);
const CANVAS_ALTURA = (canvas.height = 600);

const imageJugador = new Image();
imageJugador.src = 'shadow_dog.png';

const spriteAncho = 575;
const spriteAltura = 523;

let marcoJuego = 0;
const escalonarMarco = 5;

interface Marco {
    x: number;
    y: number;
}

interface AnimacionEstado {
    nombre: string;
    marcos: number;
}

const animacioneSprite: Record<string, { loc: Marco[] }> = {};

const estadosAnimacion: AnimacionEstado[] = [
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

estadosAnimacion.forEach((estado, index) => {
    const marcos = { loc: [] as Marco[] };
    for (let j = 0; j < estado.marcos; j++) {
        const posicionX = j * spriteAncho;
        const posicionY = index * spriteAltura;
        marcos.loc.push({ x: posicionX, y: posicionY });
    }
    animacioneSprite[estado.nombre] = marcos;
});

console.log(animacioneSprite);

function animar(): void {
    ctx.clearRect(0, 0, CANVAS_ANCHO, CANVAS_ALTURA);
    const posicion = Math.floor(marcoJuego / escalonarMarco) % animacioneSprite[estadoJugador].loc.length;
    const marcoX = spriteAncho * posicion;
    const marcoY = animacioneSprite[estadoJugador].loc[posicion].y;

    ctx.drawImage(
        imageJugador,
        marcoX,
        marcoY,
        spriteAncho,
        spriteAltura,
        0,
        0,
        spriteAncho,
        spriteAltura
    );

    marcoJuego++;
    requestAnimationFrame(animar);
}

animar();
