import Polygon from "../dataStructs/polygon";
import PhysicsObjects from "../physicsObject";
import { lerp } from "../../utilities";
import { AICarControl, CarControls, CarHumanControl, CarTrafficControl } from "./carControls";
import Vector2 from "../dataStructs/vector2";
import Sensors from "./sensors";
import ImageLibrary from "../../LoadingAssets/LoadImages";
import NeuralNetwork from "../../neuralNetwork/neuralNetwork";

function indexOfHighestNumber(arr: number[]): number {
  if (arr.length === 0) {
    throw new Error('Array is empty');
  }
  let maxIndex = 0;
  let maxValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxValue) {
      maxValue = arr[i];
      maxIndex = i;
    }
  }

  return maxIndex;
}

// convert direction to signals
function directionToSignals(dirs:Array<number>){
  // highest direction is???
  // const dirLabels = ['left', 'forward', 'right']
  const dirLabels = [[0, 1], [0, 0], [1, 0]]
  const index = indexOfHighestNumber(dirs);
  return dirLabels[index]
}


export default class Car extends PhysicsObjects {
    controls: CarControls;
    pedal: number;
    turnSpeed: number;
    carSpeed: number;
    status: string;
    constructor(polygon: Polygon) {
        super(polygon);
        this.controls = new CarControls();

<<<<<<< HEAD
        // carControl vars
        this.pedal = 0;
        this.turnSpeed = 5
        this.rotation = 0;
        this.carSpeed = 20;

        // car status
        this.status = 'enabled'
    }
    update() {
        if (this.status === 'enabled') {
            this.processControls();
        }
=======
    // carControl vars
    this.pedal = 0;
    this.turnSpeed = 3
    this.rotation = 0;
    this.carSpeed = 20;

    // car status
    this.status = 'enabled'

  }
  update(){
    if(this.status === 'enabled'){
      this.processControls();
    }
  }
  processControls(){
    //process pedal
    if(this.controls.signalsOut.up > 0){
      this.pedal = lerp(this.pedal, 1, 0.1);
    }else if(this.controls.signalsOut.down > 0){
      this.pedal = lerp(this.pedal, -1, 0.1);
    }else{
      this.pedal = lerp(this.pedal, 0, 0.1);
    }
     
    // process turn
    if(this.pedal !== 0){
      if(this.controls.signalsOut.left > 0){
        this.rotation -= this.turnSpeed * this.pedal
      }else if(this.controls.signalsOut.right > 0){
        this.rotation += this.turnSpeed * this.pedal
      }
      else{ // if you want to auto return to straith
        this.rotation = lerp(this.rotation, 0, 0.03)
      }
>>>>>>> 6539c3bf301d463aa4989fab86d814dc4064ef5a
    }
    processControls() {
        //process pedal
        if (this.controls.signalsOut.up) {
            this.pedal = lerp(this.pedal, 1, 0.1);
        } else if (this.controls.signalsOut.down) {
            this.pedal = lerp(this.pedal, -1, 0.1);
        } else {
            this.pedal = lerp(this.pedal, 0, 0.1);
        }

        // process turn
        if (this.pedal !== 0) {
            if (this.controls.signalsOut.left) {
                this.rotation -= this.turnSpeed * this.pedal
            } else if (this.controls.signalsOut.right) {
                this.rotation += this.turnSpeed * this.pedal
            }
        }

        // get final movement vector
        let finalVector = new Vector2(0, -this.carSpeed);
        // forward speed
        finalVector = finalVector.scale(this.pedal);
        // turn
        finalVector = finalVector.rotate(this.rotation);

        //translate position
        this.position = this.position.add(finalVector);
    }

    // on collision disable controls and physics and fade it
    onCollision(collisions: Array<Vector2>): void {
        collisions
        this.status = 'crashed'
        this.physicsData.enabled = false;
        this.style.opacity = 0.5
        // disable sensors too
        this.children[0].children.forEach((child) => {
            child.physicsData.enabled = false
        })
    }
}
<<<<<<< HEAD

export class HumanCar extends Car {
    constructor(polygon: Polygon) {
        super(polygon)
        this.controls = new CarHumanControl();
        // create sensor for driving car
        this.children.push(new Sensors(new Polygon([]), 7, 180, 500))
    }
=======
 
export class HumanCar extends Car{
  sensors:Sensors;
  constructor(polygon:Polygon){
    super(polygon)
    this.controls = new CarHumanControl();
    // create sensor for driving car
    // this.children.push(new Sensors( new Polygon([]), 7, 180, 500))
    // create sensor for driving car
    this.sensors = new Sensors( new Polygon([]), 21, 180, 1200) 
    this.children.push(this.sensors);
    this.sensors.highlight(true)
  }
  update(): void {
    super.update()
    this.sensors.rotation = -this.rotation
  }
>>>>>>> 6539c3bf301d463aa4989fab86d814dc4064ef5a
}

export class TrafficCar extends Car {
    constructor(polygon: Polygon) {
        super(polygon);
        this.controls = new CarTrafficControl();
        this.status = 'enabled'
    }
}

<<<<<<< HEAD
export class AICar extends Car {
    sensors: Sensors;
    isHighlighted: boolean = false;
    constructor(polygon: Polygon) {
        super(polygon)
        this.controls = new AICarControl();
        this.status = 'enabled'
        // create sensor for driving car
        this.sensors = new Sensors(new Polygon([]), 3, 45, 900)
        this.children.push(this.sensors);
    }
    update(): void {
        const sensorReadings = this.sensors.getReadings();
        const controls: any = this.controls; // to shut the typescript up
        if (this.isHighlighted) { controls.updateNetwork(sensorReadings, true) }
        else { controls.updateNetwork(sensorReadings); }
        super.update();
    }
    highlight(b: boolean = false) {
        if (b) {
            this.isHighlighted = true;
            // change car color
            this.style.images[0] = new ImageLibrary().library['carFillYellow'];
            // turn on sensors
            const sensor: any = this.children[0];
            sensor.highlight(true);
        } else {
            this.isHighlighted = false;
            // change car color 
            this.style.images[0] = new ImageLibrary().library['carFillBlue'];
            // turn off sensors
            const sensor: any = this.children[0];
            sensor.highlight();
        }
    }
=======
export class AICar extends Car{
  sensors:Sensors;
  isHighlighted:boolean = false;
  nn:NeuralNetwork;
  constructor(polygon:Polygon, nn:NeuralNetwork){
    super(polygon)
    // this.controls = new AICarControl(nn);
    this.status = 'enabled'
    this.nn = nn;
    // create sensor for driving car
    this.sensors = new Sensors( new Polygon([]), 21, 180, 1200) 
    this.children.push(this.sensors);
    this.sensors.highlight(true)
  }
  update(): void {
    // feed data to nn
    const sensorReadings = this.sensors.getReadings();
    const outputs = this.nn.feedForward(sensorReadings)
    console.log('raw out',outputs);
    // convert inputs to signals
    const finalOut = directionToSignals(outputs)!
    console.log('final out', finalOut)
    // feed signals to controls
    this.controls.signalsOut.up = 1
    this.controls.signalsOut.right = finalOut[0]
    this.controls.signalsOut.down = 0
    this.controls.signalsOut.left = finalOut[1]
    super.update();
    this.sensors.rotation = -this.rotation
  }
>>>>>>> 6539c3bf301d463aa4989fab86d814dc4064ef5a
}