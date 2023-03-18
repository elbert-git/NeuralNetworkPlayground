export interface NeuronData{
  bias:number, 
  connectionWeights:Array<number>
}

export interface NeuralNetworkData{
  data:Array<Array<NeuronData>>
}