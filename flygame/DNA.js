class DNA {

    genes = [];
    length = 0;

    constructor(length) {
        this.length = length;
        for (var i = 0; i < length; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(0.1);
        }
    }
}