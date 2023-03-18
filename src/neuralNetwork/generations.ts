import Experience from "../experience";
import { createAICar } from "../physicWorld/objectCreation/createCar";
import Polygon from "../physicWorld/dataStructs/polygon";
import PhysicsObjects from "../physicWorld/physicsObject";
import PhysicsWorld from "../physicWorld/physicsWorld";
import { createTrafficBlock } from "../physicWorld/objectCreation/createTraffic";
import { roadVars } from "../physicWorld/objectCreation/roadConstants";
import { AICar } from "../physicWorld/car/car";

export default class Generations{
  //! this is a weird super tentacle class that reaches to differnt parts of the stack and chagnes things.
  //! very bad design !!. 
  //! i hope you fix this later
  physicsWorld:PhysicsWorld
  active:boolean;
  trafficCarGroup:PhysicsObjects;
  aiCarGroup:PhysicsObjects;
  farthestCar:AICar|null;
  constructor(){
    this.physicsWorld = new Experience().processes[0];
    this.active = false
    
    // create groups
    this.aiCarGroup = new PhysicsObjects(new Polygon([]))
    this.aiCarGroup.style.fill = false; // this removes the white box
    this.trafficCarGroup = new PhysicsObjects(new Polygon([]))
    this.trafficCarGroup.style.fill = false; // this removes the white box

    // farthest car
    this.farthestCar = null;
  }
  startGeneration(num=100){
    if(!this.active){
      this.active = true;
      // populate the world with a certain amount of ai cars
      for (let index = 0; index < num; index++) {
        const car = createAICar();
        this.aiCarGroup.children.push(car);
      }
      this.physicsWorld.addObject('aiCarGroup', this.aiCarGroup);
      //populate road with a certain amount of traffic blocks
      const trafficRow = createTrafficBlock(5, -300, 500, roadVars.laneCount, roadVars.allLanesWidth*2, 0.5);
      Object.keys(trafficRow).forEach((key)=>{
        this.trafficCarGroup.children.push(trafficRow[key]);
      })
      this.physicsWorld.addObject('trafficCarGroup', this.trafficCarGroup)
    }else{
      console.error('a generation is currently active');
    }
  }
  update(){
    // get car with biggest y position
    this.farthestCar = this.#getFarthestCar();

    // focus camera on that car
    this.physicsWorld.canvas.cameraSubject = this.farthestCar
  }
  endGeneration(){
    if(this.active){
      this.active = false;
      // depopulate all cars in the collection
      delete this.physicsWorld.objects['tgrafficCarGroup'];
      delete this.physicsWorld.objects['aiCarGroup'];
      // todo save best car into memory
    }else{
      console.error('no generation is not currently active');
    }
  }
  #getFarthestCar():any{
    const allAICars = this.aiCarGroup.children;
    let farthestY = 0
    let fartherCar = allAICars[0];
    allAICars.forEach((car)=>{
      const posY = car.position.y
      if(posY < farthestY){
        farthestY = posY;
        fartherCar = car;
      }
    })
    return fartherCar
  }
}