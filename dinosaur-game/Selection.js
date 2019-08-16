class Selection {
    constructor() {

    }

    createNewGeneration(numDinos, lastGeneration, mutationRate) {

        this.lastGeneration = lastGeneration;

        var dinos = [];

        var selectionPool = this.getSelectionPool();

        for (let i = 0; i < numDinos; i++) {

            var dinoToPick = int(random(0, selectionPool.length));

            var selectedDinoBrain = selectionPool[dinoToPick].brain.copy();
            selectedDinoBrain.mutate(mutationRate);

            var newDino = new Dino(false, selectedDinoBrain);

            dinos.push(newDino);
        }

        return dinos;

    }

    // We are not breeding instead using something closer to natural selection
    getSelectionPool() {

        var maxScore = 0;
        var selectionPool = [];

        for (let i = 0; i < this.lastGeneration.length; i++) {
            if (this.lastGeneration[i].score > maxScore) {
                maxScore = this.lastGeneration[i].score;
            }
        }

        for (let i = 0; i < this.lastGeneration.length; i++) {

            if (!this.lastGeneration[i].playerControlled) {

                var selectionCount = int((this.lastGeneration[i].score / maxScore).toFixed(4) * 10);

                for (var j = 0; j < selectionCount; j++) {
                    selectionPool.push(this.lastGeneration[i])
                }
            }
        }

        return selectionPool;
    }
}