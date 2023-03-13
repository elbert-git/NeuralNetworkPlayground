import {Neuron } from "./Neuron"

export default class NeuralNetwork{
  layers:Array<Array<Neuron>>
  constructor(startingArray:Array<number>){
    this.layers = [];
    // create network
    startingArray.forEach((layerCount, layerIndex)=>{
      //create layer
      const layer:Array<Neuron> = []
      for (let index = 0; index < layerCount; index++) {
        // create neuron
        const neuron = new Neuron();
        // connect neurons
        neuron.connectToLayer(this.layers[layerIndex-1])
        // add to layers
        layer.push(neuron)
      }
      //add layer to network
      this.layers.push(layer);
    })
  }
  feedFoward(signals:Array<number>){
    //set signal inputs
    this.layers[0].forEach((neuron, index)=>{
      neuron.rawInputValue = (signals[index])
    })
    // get all final output
    const finalResults:Array<number> = []
    const lastLayer = this.layers[this.layers.length-1];
    lastLayer.forEach((neuron)=>{
      finalResults.push(neuron.getOutput());
    })
    return finalResults;
  }
}