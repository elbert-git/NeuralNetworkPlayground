import Experience from './experience'
import PhysicsWorld from './physicWorld/physicsWorld';
import { createdObjects } from './physicWorld/createPhysicsObjects';
import './style.css'

// create main process
const experience = new Experience();

// create phsyics world
const physicWorld = new PhysicsWorld()
experience.processes.push(physicWorld);

// create create road objects
Object.keys(createdObjects).forEach((key)=>{
  physicWorld.addObject(key, createdObjects[key])
})

