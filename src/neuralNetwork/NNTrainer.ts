import { logEntry } from "../observer";
import NeuralNetwork from "./neuralNetwork"

const nnConfig = [21, 21, 3]


function convertToNSignificantFigures(value: number, n: number): string {
  if (!isFinite(value) || isNaN(value)) {
    return 'Invalid number';
  }

  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const scale = Math.pow(10, n - 1 - exponent);
  const roundedValue = Math.round(value * scale) / scale;

  return roundedValue.toFixed(n);
}


function logErrors(errors:Array<number>){
  const errorsProper = errors.map((num)=>{return convertToNSignificantFigures(num, 5).replace('-', '')})
  console.log(errorsProper)
}



let instance:NNTrainer|null = null
export default class NNTrainer{
  train=false
  neuralNetwork:NeuralNetwork|null;
  logs:Array<logEntry> = [];
  constructor(){
    this.neuralNetwork = null
  }
  update(){
    if(this.train){
      this.logs.forEach((log)=>{
        // calculate errors
        const outputs = this.neuralNetwork?.feedForward(log.readings);
        const errors = outputs!.map((out,index)=>{return log.inputs[index] - out})
        logErrors(errors)
        // enter start training
        this.neuralNetwork!.backProp(errors)
      })
    }
  }

  reset(){
    this.train = false;
    this.neuralNetwork = new NeuralNetwork(nnConfig);
    this.logs = []
  }
}


