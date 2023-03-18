import Experience from './experience'
import PhysicsWorld from './physicWorld/physicsWorld';
import { createdObjects } from './physicWorld/createPhysicsObjects';
import './style.css'
import Generations from './neuralNetwork/generations';

// create main process
const experience = new Experience();

// create phsyics world
const physicWorld = new PhysicsWorld()
experience.processes.push(physicWorld);

// create create road objects
Object.keys(createdObjects).forEach((key)=>{
  physicWorld.addObject(key, createdObjects[key])
})



//! test * -------------------- handle generations
const gen = new Generations();
gen.startGeneration(3);
window.addEventListener('keydown', (e)=>{
  if(e.key === 'k'){
    gen.endGeneration()
  }
})
