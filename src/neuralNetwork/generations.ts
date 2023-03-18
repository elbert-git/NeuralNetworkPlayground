import Experience from "../experience";
import { createAICar } from "../objectCreation/createCar";
import { AICar } from "../physicWorld/car/car";
import Polygon from "../physicWorld/dataStructs/polygon";
import PhysicsObjects from "../physicWorld/physicsObject";
import PhysicsWorld from "../physicWorld/physicsWorld";

export default class Generations{
  physicsWorld:PhysicsWorld
  constructor(){
    this.physicsWorld = new Experience().processes[0];
  }
  startGeneration(num=100){
    // populate the world with a certain amount of cars
    const aiCarGroup = new PhysicsObjects(new Polygon([]))
    for (let index = 0; index < num; index++) {
      const car = createAICar();
      aiCarGroup.children.push(car);
    }
    this.physicsWorld.addObject('carGroup', aiCarGroup)
  }
  update(){
    // for each car in the current collection. 
      // get car with biggest y position
      // focus camera on that car
  }
  endGeneration(){
    // depopulate all cars in the collection
    delete this.physicsWorld.objects['carGroup'];


    // todo save best car into memory
  }
}