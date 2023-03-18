import {NeuralNetworkData, NeuronData} from "./dataManagement/neuralNetworkData";
import {Neuron } from "./Neuron"

export function createNeuralNetworkFromData(nnData:NeuralNetworkData){
  const data = nnData.data;
  const neuralNetwork = new NeuralNetwork([0, 0, 0])
  data.forEach((layer, layerIndex)=>{
    layer.forEach((neuronData)=>{
      // create neuron
      const neuron = new Neuron();
      // set bias
      neuron.bias = neuronData.bias
      // handle connections
      if(layerIndex > 0){
        // create connections
        neuron.connectToLayer(neuralNetwork.layers[layerIndex-1])
        // set connection weights
        neuronData.connectionWeights.forEach((weight, weightIndex)=>{
          neuron.inputConnections[weightIndex].weight = weight
        })
      }
      // push neuron to layer
      neuralNetwork.layers[layerIndex].push(neuron)
    })
  })
}

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
        if(layerIndex > 0){
          neuron.connectToLayer(this.layers[layerIndex-1])
        }
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
  saveState(){
    const nnData:NeuralNetworkData = {
      data: []
    }
    // for all neurons convert to json and save to data
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex];
      const layerData:Array<NeuronData> = []
      for (let neuronIndex = 0; neuronIndex < layer.length; neuronIndex++) {
        const neuron = layer[neuronIndex];
        layerData.push(neuron.convertToJson());
      }
      nnData.data.push(layerData);
    }
    // save data to local storage
    window.localStorage.setItem('nnData', JSON.stringify(nnData));
  }
  loadState():NeuralNetworkData|null{
    // save data to local storage
    const rawData = window.localStorage.getItem('nnData');
    const data = rawData ? JSON.parse(rawData) : null;
    return data
  }
  mutate(mutateFactor:number){
    // for all neurons mutate
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex];
      for (let neuronIndex = 0; neuronIndex < layer.length; neuronIndex++) {
        const neuron = layer[neuronIndex];
        neuron.mutate(mutateFactor)
      }
    }
  }
}