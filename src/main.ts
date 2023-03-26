import Experience from './experience'
import PhysicsWorld from './physicWorld/physicsWorld';
import './style.css'
import { roadObjects } from './physicWorld/objectCreation/createRoad';
import Generations from './neuralNetwork/generations';
import ImageLibrary from './LoadingAssets/LoadImages';
import carOutlines from "/assets/carOutlines.svg";
import carFillYellow from "/assets/carFillYellow.svg";
import carFillBlue from "/assets/carFillBlue.svg";
import carFillGrey from "/assets/carFillGrey.svg";
import UI from './UI';
import Observer from './observer';


(async()=>{
  const imageLibrary = new ImageLibrary();
  await imageLibrary.loadImage('carOutlines', carOutlines);
  await imageLibrary.loadImage('carFillYellow', carFillYellow);
  await imageLibrary.loadImage('carFillBlue', carFillBlue);
  await imageLibrary.loadImage('carFillGrey', carFillGrey);


  // create main process
  const experience = new Experience();

  // create phsyics world
  const physicWorld = new PhysicsWorld()
  experience.processes.push(physicWorld);
  // create create road objects
  Object.keys(roadObjects).forEach((key)=>{
    physicWorld.addObject(key, roadObjects[key])
  })

  // handle generations
  const generations = new Generations()
  experience.processes.push(generations);
   
  // setup ui
  const ui = new UI()
  // connect ui to generations
  // ui.startButtonPressed = generations.startGeneration.bind(generations)
})()
