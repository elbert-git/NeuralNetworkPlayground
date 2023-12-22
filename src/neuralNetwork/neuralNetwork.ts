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
  static createFromData(data:NeuralNetworkData){
    const newNN = new NeuralNetwork([]);
    const nnData = data.data
    // for each layer data
    nnData.forEach((layer, layerIndex)=>{
      const newLayer:Array<Neuron> = []
      // for each nueron
      layer.forEach((neuronData)=>{
        // add  new neuron
        const newNeuron = new Neuron()
        // copy bias
        newNeuron.bias = neuronData.bias
        // if not first layer. copy connections
        if(layerIndex > 0){
          //create connections
          newNeuron.connectToLayer(newNN.layers[layerIndex-1]);
          // modify connections
          newNeuron.inputConnections.forEach((connection, connectionIndex)=>{
            connection.weight = neuronData.connectionWeights[connectionIndex]
          })
        }
        //add new nueron to new layer
        newLayer.push(newNeuron)
      })
      //save new layer
      newNN.layers[layerIndex] =  newLayer
    })
    return newNN
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
  convertToJson(){
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
    return nnData
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
  clone(){
    const thisNeuralNetworkData = this.convertToJson();
    const newNetwork = NeuralNetwork.createFromData(thisNeuralNetworkData);
    return newNetwork;
  }
  backProp(errors:Array<number>){
    // match error output
    if(errors.length !== this.layers[this.layers.length-1].length){console.error('error mismatch')}
    // reset all neuron errors
    this.layers.forEach((layer)=>{
      layer.forEach((neuron)=>{
        neuron.error = 0
      })
    })
    // for all neurons distribute error and train
    const lastLayer = this.layers[this.layers.length-1];
    lastLayer.forEach((neuron, index)=>{
      neuron.error = errors[index]
      neuron.distributeError();
      neuron.train();
    })
  }
}