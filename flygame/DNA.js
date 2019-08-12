class DNA {

    genes;
    length;

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

        var p = 0;
        var sequence = [];
        for(var i = 0; i < parentA.dna.genes.length; i++){
            
            if(p == 0){
                sequence.push(parentA.dna.genes[i]);
            }else{
                sequence.push(parentB.dna.genes[i])
            }
            p = !p;

            var mutValue = random()

            if(mutationRate > mutValue){
                sequence[i] = p5.Vector.random2D();
                sequence[i].setMag(0.1);
            }
        }

        this.genes = sequence;
    }

}