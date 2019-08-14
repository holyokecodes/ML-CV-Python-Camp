class DNA {

    constructor(length) {

        this.genes = [];
        this.length = 0;

        this.length = length;
        for (var i = 0; i < length; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(0.1);
        }
    }

    generateMergedDNA(mutationRate, parentA, parentB){

        var sequence = [];

        for(var i = 0; i < parentA.dna.genes.length; i++){
            var p = int(random())

            sequence.push(p ? parentA.dna.genes[i] : parentB.dna.genes[i]);

        }

        var mutCount = 0;
        for(var i = 0; i < sequence.length; i++){

            var mutate = random()

            if(mutationRate > mutate && mutCount == 0){
                mutCount = 20; // MAGIC
            }

            if(mutCount > 0){
                this.sequence = p5.Vector.random2D();
                this.sequence.setMag(0.1);
                mutCount--;
            }

        }

        this.genes = sequence;
    }

}