import { HumanCar } from "./physicWorld/car/car";

export interface logEntry{
  readings:Array<number>,
  inputs:Array<number>
}

let instance:Observer|null = null;

// convert buttons to direcion
function convertToDirection(inputs:Array<number>){
  let final = [0, 1, 0];
  if(inputs[0] === 1){final = [1, 0, 0]}
  if(inputs[1] === 1){final = [0, 0, 1]}
  return final
}


export default class Observer{
  car:HumanCar|null = null;
  logs:Array<logEntry> = [];
  constructor(car:HumanCar){
    if(instance){return instance}
    instance = this;
    this.car = car 
  }
  update(){
    const car = this.car as HumanCar
    const controls = car.controls.signalsOut
    // convert inputs to what is should do

    const inputs = [controls.left, controls.right]
    const convertedInputs = convertToDirection(inputs)

    // filter out so it's not so many straight lines
    // if(convertedInputs[1] === 1){
    //   if(Math.random() < 0.3){ // only let 30 percent of straight direction data in
    //     this.logs.push({
    //       readings: car.sensors.getReadings(),
    //       inputs: convertedInputs
    //     })
    //   }
    // }
    // else{
      this.logs.push({
        readings: car.sensors.getReadings(),
        inputs: convertedInputs
      })
    // }
  }
  reset(){
    this.logs = []
  }
}