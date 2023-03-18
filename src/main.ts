import Experience from './experience'
import PhysicsWorld from './physicWorld/physicsWorld';
import './style.css'
import { roadObjects } from './physicWorld/objectCreation/createRoad';
import Generations from './neuralNetwork/generations';
import ImageLibrary from './LoadingAssets/LoadImages';
import carOutlines from "/assets/carOutlines.svg";
import carFill from "/assets/carFill.svg";


// testing image loading
(async()=>{
  const imageLibrary = new ImageLibrary();
  await imageLibrary.loadImage('carOutlines', carOutlines);
  await imageLibrary.loadImage('carFill', carFill);

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
  generations.startGeneration(100);
})()
