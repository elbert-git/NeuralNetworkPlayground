import { NeuralNetworkData } from "./neuralNetwork/dataManagement/neuralNetworkData";

let instance:DataManagement|null = null;

interface dataFormat{
  bestNetwork:NeuralNetworkData;
  generation:number;
  RowsOfTrafficPassed:number;
}

export default class DataManagement{
  constructor(){
    if(instance){return instance};instance = this;
  }
  loadData(){
    const data:dataFormat = JSON.parse(localStorage.getItem('data')!);
    return data;
  }
  saveData(data:dataFormat){
    localStorage.setItem('data', JSON.stringify(data));
  }
}