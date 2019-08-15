class DNA {

    constructor(length) {

        // Empty list for our genes
        this.genes = [];

        // Loop for the length we want
        for (var i = 0; i < length; i++) {
            // Set the gene at that index to a random vector
            this.genes[i] = p5.Vector.random2D();
            // Lower the magnitude of the vector to a reasonable amount
            this.genes[i].setMag(0.1);
        }
    }

    // Method to generate DNA with two parents
    generateMergedDNA(mutationRate, parentA, parentB) {

        // Our empty new sequence of genes
        var sequence = [];

        // Loop over the length of the parents dna
        for (var i = 0; i < parentA.dna.genes.length; i++) {

            // Choose a random parent
            var p = int(random())

            // Depending on the parent selected, use parentA or parentB for the gene in the new sequence
            sequence.push(p ? parentA.dna.genes[i] : parentB.dna.genes[i]);

            // Generate a random value between 0 and 1.
            var shouldMutate = random()

            // Check if our mutation rate is larger than the generated rate
            if (mutationRate > shouldMutate) {
                // If it is then we mutate by reseting the gene to a random value

                sequence[i] = p5.Vector.random2D();
                sequence[i].setMag(0.1);
            }

        }

        // Assign our dna genes to be the new sequence we created
        this.genes = sequence;
    }

}