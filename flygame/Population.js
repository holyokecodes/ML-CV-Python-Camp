class Population {

    flies = [];
    popSize = 100;

    constructor() {
        for (var i = 0; i < this.popSize; i++) {
            this.flies[i] = new Fly();
        }
    }

    run() {
        for (var i = 0; i < this.popSize; i++) {
            this.flies[i].update();
            this.flies[i].show();
        }
    }
}