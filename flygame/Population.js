class Population {

    flies;
    popSize;
    food;
    matingPool;

    constructor(lifeSpan, newPopulation) {

        this.flies = [];
        this.popSize = 500;
        this.food = new Food(width / 2, 50, 20);
        this.matingPool = [];

        if (newPopulation === undefined) {
            for (var i = 0; i < this.popSize; i++) {
                this.flies[i] = new Fly(lifeSpan, this.food);
            }
        } else {
            this.flies = newPopulation;
        }
    }

    evaluate() {
        var matingPool = [];
        var totalFit = 0.0;
        for (var i = 0; i < this.popSize; i++) {
            this.flies[i].calcFitness();
            totalFit += this.flies[i].fitness;
        }

        var avg = totalFit / this.flies.length;

        for (var i = 0; i < this.popSize; i++) {
            if (this.flies[i].fitness > avg + (avg/5)) {
                matingPool.push(this.flies[i]);
            }
        }
    }

    generateNewPopulation(mutationRate) {
        var newFlies = [];

        for (var i = 0; i < this.popSize; i++) {

            var newFly = new Fly(lifeSpan, this.food);


            var randomA = random(0, this.matingPool.length);
            var randomB = random(0, this.matingPool.length);

            var parentA = this.flies[randomA];
            var parentB = this.flies[randomB];

            newFly.dna.generateMergedDNA(mutationRate, parentA, parentB);

            newFlies.push(newFly);
        }

        return newFlies;
    }


    run(count) {
        this.food.show();
        for (var i = 0; i < this.popSize; i++) {
            this.flies[i].update(count);
            this.flies[i].show();
        }
    }
}