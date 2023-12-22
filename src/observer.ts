import Experience from "./experience";
import { HumanCar } from "./physicWorld/car/car";
import PhysicsWorld from "./physicWorld/physicsWorld";
import UI from "./UI";

interface logEntry{
  readings:Array<number>,
  inputs:Array<number>
}

let instance:Observer|null = null;

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
    const inputs = [controls.up, controls.right, controls.down, controls.left]
    this.logs.push({
      readings: car.sensors.getReadings(),
      inputs: inputs
    })
  }
  reset(){
    this.logs = []
  }
}