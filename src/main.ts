import Experience from './experience'
import PhysicsWorld from './physicWorld/physicsWorld';
import './style.css'
import ImageLibrary from './LoadingAssets/LoadImages';
import carOutlines from "/assets/carOutlines.svg";
import carFillYellow from "/assets/carFillYellow.svg";
import carFillBlue from "/assets/carFillBlue.svg";
import carFillGrey from "/assets/carFillGrey.svg";
import UI from './UI';
import { TrafficSpawner } from './physicWorld/objectCreation/trafficSpawner';
import Car, { HumanCar } from './physicWorld/car/car';
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

  // start human car on page load
  // todo when you have default agent, loaddefautl again instead
  experience.startHumanCar()

  // add observer
  experience.processes.push(new Observer(physicWorld.objects['car'] as HumanCar))

  // start traffic spawner
  experience.processes.push(new TrafficSpawner(physicWorld.objects['car'] as Car))
   
  // setup ui
  const ui = new UI();ui
})()
