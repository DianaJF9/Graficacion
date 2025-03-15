let side = 3;
let sideHalf = 0.5 * side;
// Cambiamos las coordenadas para formar un cuadrado en lugar de un triángulo
let xA = -sideHalf, yA = -sideHalf; // Vértice A (esquina superior izquierda)
let xB = sideHalf, yB = -sideHalf;  // Vértice B (esquina superior derecha)
let xC = sideHalf, yC = sideHalf;   // Vértice C (esquina inferior derecha)
let xD = -sideHalf, yD = sideHalf;  // Vértice D (esquina inferior izquierda) - NUEVO
let p = 0.95, q = 1 - p;

for (let i = 0; i < 50; i++) {
    // Dibujamos las cuatro líneas del cuadrado
    this.drawLine(this.iX(xA), this.iY(yA), this.iX(xB), this.iY(yB)); // Línea superior
    this.drawLine(this.iX(xB), this.iY(yB), this.iX(xC), this.iY(yC)); // Línea derecha
    this.drawLine(this.iX(xC), this.iY(yC), this.iX(xD), this.iY(yD)); // Línea inferior - NUEVO
    this.drawLine(this.iX(xD), this.iY(yD), this.iX(xA), this.iY(yA)); // Línea izquierda - NUEVO

    // Actualizamos las coordenadas de los vértices para el siguiente cuadro
    let xA1 = p * xA + q * xB;
    let yA1 = p * yA + q * yB;
    let xB1 = p * xB + q * xC;
    let yB1 = p * yB + q * yC;
    let xC1 = p * xC + q * xD; // NUEVO: Interpolamos con el vértice D
    let yC1 = p * yC + q * yD; // NUEVO
    let xD1 = p * xD + q * xA; // NUEVO: Interpolamos con el vértice A
    let yD1 = p * yD + q * yA; // NUEVO

    // Asignamos las nuevas coordenadas
    xA = xA1; xB = xB1; xC = xC1; xD = xD1; // NUEVO: Incluimos xD
    yA = yA1; yB = yB1; yC = yC1; yD = yD1; // NUEVO: Incluimos yD
}
