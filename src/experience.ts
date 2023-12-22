import Vector2 from "./physicWorld/dataStructs/vector2";
import { roadObjects } from "./physicWorld/objectCreation/createRoad";
import { createTrafficBlock } from "./physicWorld/objectCreation/createTraffic";
import { roadVars } from "./physicWorld/objectCreation/roadConstants";
import { createCar } from "./physicWorld/objectCreation/createCar";
import Observer from "./observer";
import { TrafficSpawner } from "./physicWorld/objectCreation/trafficSpawner";

let instance:Experience|null = null;
export default class Experience{
  processes:Array<any>;
  updateRate:number;
  constructor(){
    // vars
    this.processes = []
    this.updateRate = 60
    // singleton
    if(instance){return instance}
    else{
      instance = this;
    }
    // start update loop
    this.update()
  }

  startHumanCar(){
    const physicsWorld = this.processes[0]
    // create create road objects
    Object.keys(roadObjects).forEach((key)=>{
      physicsWorld.addObject(key, roadObjects[key])
    })
    // creat traffic
    //populate road with a certain amount of traffic blocks
    const trafficRow = createTrafficBlock(5, -700, 1000, roadVars.laneCount, roadVars.allLanesWidth*2, 0.1);
    physicsWorld.addObject('car', createCar())
    // set focus on car for canvas, observer and traffic spawner
    physicsWorld.canvas.cameraSubject = physicsWorld.objects['car']
    if(this.processes[1] && this.processes[2]){
      this.processes[1].car = physicsWorld.objects['car']
      this.processes[2].car = physicsWorld.objects['car']
    }
  }
  startDefaultCar(){}
  startTrainedCar(){}
  
  reset(){
    // reset physics world
    const physWorld = this.processes[0]
    physWorld.objects = {}
    physWorld.colliderGroups = {}
    physWorld.canvas.cameraPosition = new Vector2(0, 0)
    // reset traffic spawner
    const trafficSpawner = this.processes[2] as TrafficSpawner
    trafficSpawner.reset();
    // reset observer 
    const obs = this.processes[1] as Observer
    obs.reset()
  }

  update(){
    this.processes.forEach((process)=>{
      process.update();
    })

    requestAnimationFrame(this.update.bind(this));
  }
}