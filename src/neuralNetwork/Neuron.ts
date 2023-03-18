import { clamp, createRandomWeight } from "../utilities";
import { NeuronData } from "./dataManagement/neuralNetworkData";

class NeuronConnection{
  connectingNeuron:Neuron;
  weight:number;
  constructor(neuron:Neuron){
    this.connectingNeuron = neuron;
    this.weight = createRandomWeight();
  }
  getConnectionOutput(){
    // todo
  }
}

export class Neuron{
  inputConnections:Array<NeuronConnection>;
  bias:number;
  rawInputValue:number|null;
  constructor(){
    this.inputConnections = [];
    this.bias = createRandomWeight();
    this.rawInputValue = null;
  }
  connectToLayer(neurons:Array<Neuron>){
    neurons.forEach((n)=>{
      this.inputConnections.push(new NeuronConnection(n))
    })
  }
  #getSum():number{
    let total = 0;
    this.inputConnections.forEach((connection)=>{
      total += connection.connectingNeuron.getOutput() * connection.weight
    })
    return total
  }
  getOutput():number{
    if(this.rawInputValue === null){
      return (this.#getSum() > this.bias) ? 1 : 0
    }else{
      return this.rawInputValue;
    }
  }
  convertToJson():NeuronData{
    const data:NeuronData = {
      bias: this.bias,
      connectionWeights: this.inputConnections.map((connection)=>{
        return connection.weight
      })
    }
    return data;
  }
  mutate(mutateFactor:number){
    this.bias += createRandomWeight(mutateFactor);
    this.bias = clamp(this.bias);
    this.inputConnections.forEach((connection)=>{
      connection.weight += createRandomWeight(mutateFactor);
      connection.weight = clamp(connection.weight);
    })
  }
}