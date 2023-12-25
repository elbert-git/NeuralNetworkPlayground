import { relu, sigmoid } from "./activationFunctions";

export class Node{
  value:number
  constructor(number:number){
    this.value = number
  }
  getOutput(){
    return this.value
  }
}

interface Connection{
  node:Node,
  weight:number
}


export class Neuron extends Node{
  connections:Array<Connection>
  bias = (Math.random()*2)-1;
  error=0;
  learningRate = 0.001
  // activationFunction = (num:number)=>{return num}
  activationFunction = sigmoid
  constructor(nodesToConnect:Array<Node>){
    // call parent's constructor
    super(0)
    // create connections
    this.connections = nodesToConnect.map((node)=>{
      const connection:Connection = {
        node:node,
        weight: (Math.random()*2)-1
      }
      return connection
    })
  }
  getOutput(){
    // for every connection
    let sum = 0
    // multilply output by weight
    this.connections.forEach((con)=>{
      sum += con.weight * con.node.getOutput();
    })
    sum+= this.bias
    this.value = sum;
    return this.activationFunction(this.value);
  }
  distributeError(){
    // get total weight
    let totalWeight = 0
    this.connections.forEach((con)=>{totalWeight+=con.weight})
    // reset every incoming neuron error
    this.connections.forEach((con)=>{
      const node = con.node as Neuron
      if(node instanceof Neuron){node.error = 0}
    })
    // for ever connection
    for (let index = 0; index < this.connections.length; index++) {
      const connection = this.connections[index]
      const neuron = connection.node;const weight = connection.weight
      //only work on neurons and not input nodes
      if((neuron instanceof Neuron)){
        // distribute the error based on weight contribution
        neuron.error += this.error*(weight/totalWeight);
        // then ask it to dstribute again
        neuron.distributeError();
      }
    }
  }
  train(){
    this.connections.forEach((con)=>{
      const input = con.node.getOutput();
      con.weight += this.error * input * this.learningRate;
      this.bias += this.error * this.learningRate;
    })
  }
}