import Experience from "../experience";
import { createAICar } from "../physicWorld/objectCreation/createCar";
import Polygon from "../physicWorld/dataStructs/polygon";
import PhysicsObjects from "../physicWorld/physicsObject";
import PhysicsWorld from "../physicWorld/physicsWorld";
import { createTrafficBlock } from "../physicWorld/objectCreation/createTraffic";
import { roadVars } from "../physicWorld/objectCreation/roadConstants";
import { AICar } from "../physicWorld/car/car";
import UI from "../UI";
import NeuralNetwork from "./neuralNetwork";
import Observer from "../observer";

export default class Generations{
  //! this is a weird super tentacle class that reaches to differnt parts of the stack and chagnes things.
  //! very bad design !!. 
  //! i hope you fix this later
  physicsWorld:PhysicsWorld
  active:boolean;
  trafficCarGroup:PhysicsObjects;
  aiCarGroup:PhysicsObjects;
  farthestCar:AICar|null;
  bestNetwork:NeuralNetwork|null;
  observer:Observer = new Observer();
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
    this.bestNetwork = null;

    window.addEventListener('keydown', (e)=>{
      if(e.key === '0'){ this.freshStart()}
      if(e.key === '1'){ this.restartGeneration()}
      if(e.key === '2'){ this.createNewGeneration()}
    })
  }

  freshStart(){ // for a fresh 
    // *  -------------------
    // for a fresh start 
    // all ai cars random
    // just randomly populate ai cars by random networks
    this.#spawnAICarsAndTraffic();
  }

  restartGeneration(){
    // *  -------------------
    // clear all cars and colliders
    this.clearCars();
    // repopulate with mutations of the previous generation
    this.#spawnAICarsAndTraffic(this.bestNetwork ? this.bestNetwork : null);
  }

  createNewGeneration(){
    // * ----------------------
    // save best network
    const bestCar:any = this.farthestCar;
    this.bestNetwork = bestCar.controls.neuralNetwork;
    //clear cars
    this.clearCars();
    // start new generation with the mutations from the new network
    this.#spawnAICarsAndTraffic(this.bestNetwork);
  }

  #spawnAICarsAndTraffic(network:NeuralNetwork|null = null){
    if(!this.active){
      this.active = true;
      // populate the world with a certain amount of ai cars
      for (let index = 0; index < new UI().carsPerGeneration; index++) {
        const car = network ? createAICar(network) : createAICar();
        this.aiCarGroup.children.push(car);
      }
      this.physicsWorld.addObject('aiCarGroup', this.aiCarGroup);
      //populate road with a certain amount of traffic blocks
      const trafficRow = createTrafficBlock(5, -700, 1000, roadVars.laneCount, roadVars.allLanesWidth*2, 0.5);
      Object.keys(trafficRow).forEach((key)=>{
        this.trafficCarGroup.children.push(trafficRow[key]);
      })
      this.physicsWorld.addObject('trafficCarGroup', this.trafficCarGroup)
    }
  }

  clearCars(){
    // *  -------------------
    // clear all cars and colliders
    // if there is a performance improvement. save the network
    if(this.active){
      this.active = false;
      // depopulate all cars in the collection
      delete this.physicsWorld.objects['trafficCarGroup'];
      delete this.physicsWorld.objects['aiCarGroup'];
      // clear them from the children as well
      this.aiCarGroup.children = [];
      this.trafficCarGroup.children = [];
      // clear the phsycis groups as well (clear previous traffic)
      this.physicsWorld.colliderGroups['traffic'] = []
    }else{
      console.error('no generation is not currently active');
    }
  }



  update(){
    // get car with biggest y position
    if(this.active){
      this.farthestCar = this.observer.getBestCar();
    }

    // focus camera on that car
    this.physicsWorld.canvas.cameraSubject = this.farthestCar
  }
}