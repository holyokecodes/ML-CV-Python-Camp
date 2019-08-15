class NeuralNetwork {

    constructor(a, b, c, d) {

        if (a instanceof tf.Sequential) {
            this.model = a;
            this.inputNodes = b;
            this.hiddenNodes = c;
            this.outputNodes = d;
        } else {
            this.inputNodes = a;
            this.hiddenNodes = b;
            this.outputNodes = c;
            this.model = this.createModel();
        }
    }

    createModel() {
        
        const model = tf.sequential();
        const hidden = tf.layers.dense({
            units: this.hiddenNodes,
            inputShape: [this.inputNodes], // What does the input look like (sample input array)
            activation: 'sigmoid' // Force between 0 and 1
        });
        model.add(hidden);
        const output = tf.layers.dense({
            units: this.outputNodes, // Don't need input shape because it can be infered from the hidden layer
            activation: 'softmax' // Force between 0 and 1, but all nodes must add up to 1 (prob)
        });
        model.add(output);

        return model;
    }

    dispose(){
        this.model.dispose();
    }

    predict(inputs) {

        return tf.tidy(() => { // Garbage Collection
            const xs = tf.tensor2d([inputs]); // x is commonly input, tensorflow uses tensors instead of arrays (matrixes that live on the GPU)

            const ys = this.model.predict(xs); // y is commonly output

            const outputs = ys.dataSync(); // convert back to normal array

            return outputs;
        });
    }

    copy() {

        return tf.tidy(() => {
            const modelCopy = this.createModel();
            const weights = this.model.getWeights();


            const weightCopies = [];
            for (let i = 0; i < weights.length; i++) {
                weightCopies[i] = weights[i].clone();
            }

            modelCopy.setWeights(weightCopies);

            return new NeuralNetwork(modelCopy, this.inputNodes, this.hiddenNodes, this.outputNodes);
        });
    }

    mutate(rate) {
        tf.tidy(() => { // Garbage Collection
            const weights = this.model.getWeights();
            const mutatedWeights = [];

            for (let i = 0; i < weights.length; i++) {
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice(); // Slice is copying the array

                for (let j = 0; j < values.length; j++) {
                    if (random(1) < rate) {
                        let w = values[j];
                        values[j] = w + randomGaussian(); // add random value near 0-1
                    }
                }

                let newTensor = tf.tensor(values, shape);

                mutatedWeights[i] = newTensor;

            }
            this.model.setWeights(mutatedWeights);
        });
    }

}