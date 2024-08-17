import { Neuron, Node } from "./neuron"

export default class NeuralNetwork{
  layers:Array<Array<Node>>
  constructor(nodeConfig:Array<number>){
    const layers = []
    for (let layerIndex = 0; layerIndex < nodeConfig.length; layerIndex++) {
      const layer:Array<Node> = []
      for (let nodeIndex = 0; nodeIndex < nodeConfig[layerIndex]; nodeIndex++) {
        if(layerIndex === 0){ // first layer fill with put input nodes
          layer.push(new Node(0))
        }else{ // subsequent layers fill with neurons
          layer.push(new Neuron(layers[layerIndex-1]))
        }
      }
      layers.push(layer)
    }
    this.layers = layers;
  }

  feedForward(inputs:Array<number>){
    if(inputs.length !== this.layers[0].length){console.error('inputs dont match first layer')}
    // set first layer
    for (let index = 0; index < inputs.length; index++) {
      this.layers[0][index].value = inputs[index]
    }
    // feedforward
    const lastLayer = this.layers[this.layers.length-1]
    const outputs = lastLayer.map((neuron)=>{
      const n = neuron as Neuron
      return n.getOutput()
    })
    return outputs
  }

  backProp(errors:Array<number>){
    // check for correct number of errors
    if(errors.length !== this.layers[this.layers.length-1].length){console.error('error and output mismatch')}
    // distribute error
    for (let index = 0; index < this.layers[this.layers.length-1].length; index++) {
      // for every last layer node set the error
      const lastNeuron = this.layers[this.layers.length-1][index] as Neuron
      lastNeuron.error = errors[index];
      // then ask each neuron to distribute the error
      lastNeuron.distributeError();
    }
    // ask each neuron to train
    for (let layerIndex = 1; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex]
      for (let neuronIndex = 0; neuronIndex < layer.length; neuronIndex++) {
        const neuron = layer[neuronIndex] as Neuron
        neuron.train()
      }
    }
  }
}