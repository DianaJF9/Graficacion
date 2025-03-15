var cuadrado = (function () {
    function cuadrado(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.initCanvas();
        this.drawSquares();
    }
    cuadrado.prototype.initCanvas = function () {
        this.maxX = this.canvas.width - 1;
        this.maxY = this.canvas.height - 1;
        this.minMaxXY = Math.min(this.maxX, this.maxY);
        this.xCenter = this.maxX / 2;
        this.yCenter = this.maxY / 2;
    };
    cuadrado.prototype.drawSquares = function () {
        var side = 0.5 * this.minMaxXY;
        var angle = 0;
        for (var i = 0; i < 50; i++) {
            this.ctx.save();
            this.ctx.translate(this.xCenter, this.yCenter);
            this.ctx.rotate(angle);
            this.ctx.translate(-this.xCenter, -this.yCenter);
            this.ctx.strokeRect(this.xCenter - side / 2, this.yCenter - side / 2, side, side);
            this.ctx.restore();
            side *= 0.95;
            angle += Math.PI / 30;
        }
    };
    return cuadrado;
}());

window.onload = function () {
    new cuadrado("myCanvas");
};
