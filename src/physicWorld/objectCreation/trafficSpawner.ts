// this is to spawn traffic waves as the car travels
import { roadVars } from "./roadConstants";
import Car from "../car/car";
import { createRowOFTraffic } from "./createTraffic";
import Experience from "../../experience";
import PhysicsWorld from "../physicsWorld";

let instance:TrafficSpawner|null = null;
export class TrafficSpawner{
  car;
  threshold = 1700
  prevThreshold = 0
  newThreshold = 0
  constructor(car:Car){
    if(instance){return instance}
    instance = this;
    this.car = car
  }
  update(){
    const posY = this.car!.position.y
    if(posY < this.newThreshold){
      console.log('passed', posY)
      this.prevThreshold-= this.threshold
      this.newThreshold = this.prevThreshold - this.threshold
      // spawn new traffic row
      const newRow = createRowOFTraffic(roadVars.laneCount, roadVars.allLanesWidth*2, posY-this.threshold, 0.5);
      const physicsWorld = new Experience().processes[0] as PhysicsWorld;
      physicsWorld.addObject(`trafficRow${posY}`, newRow)
    }
  }
  reset(){
    this.prevThreshold = 0
    this.newThreshold = 0
  }
}