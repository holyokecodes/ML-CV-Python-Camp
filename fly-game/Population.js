class Population {

    constructor(lifeSpan, popSize, reward, punishment, newPopulation) {

        this.flies = [];
        this.popSize = popSize;
        this.food = new Food(width / 2, 50, 30);
        this.wall = new Wall(width/2, height - height/3, 300, 30)
        this.matingPool = [];
        this.reward = reward;
        this.punishment = punishment;

        if (newPopulation === undefined) {
            for (var i = 0; i < this.popSize; i++) {
                this.flies[i] = new Fly(lifeSpan, reward, punishment, this.food);
            }
        } else {
            this.flies = newPopulation;
        }
    }

    evaluate() {

        var maxFit = 0;

        for (var i = 0; i < this.popSize; i++) {
            
            this.flies[i].calcFitness();

            if(this.flies[i].fitness > maxFit){
                maxFit = this.flies[i].fitness;
            }
        }

        for(var i = 0; i < this.popSize; i++){

            var matingCount = int((this.flies[i].fitness/maxFit).toFixed(4) * 40); // MAGIC

            for(var j = 0; j < matingCount; j++){
                this.matingPool.push(this.flies[i])
            }
        }
    }

    generateNewPopulation(mutationRate) {
        var newFlies = [];

        for (var i = 0; i < this.popSize; i++) {

            var newFly = new Fly(lifeSpan, this.reward, this.punishment, this.food);


            var randomA = int(random(0, this.matingPool.length));
            var randomB = int(random(0, this.matingPool.length));

            var parentA = this.matingPool[randomA];
            var parentB = this.matingPool[randomB];

            newFly.dna.generateMergedDNA(mutationRate, parentA, parentB);

            newFlies.push(newFly);
        }

        return newFlies;
    }


    run(count) {
        this.food.show();
        this.wall.show();
        for (var i = 0; i < this.popSize; i++) {
            this.flies[i].update(count, this.wall);
            this.flies[i].show();
        }
    }
}