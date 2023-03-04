import Polygon from "../dataStructs/polygon";
import PhysicsObjects from "../physicsObject";
import { lerp } from "../../utilities";
import { CarControls, CarHumanControl } from "./carControls";
import Vector2 from "../dataStructs/vector2";
import Sensors from "./sensors";

export default class Car extends PhysicsObjects{
  controls:CarControls;
  pedal:number;
  turnSpeed:number;
  carSpeed:number;
  status:string;
  constructor(polygon:Polygon){
    super(polygon);
    this.controls = new CarControls();

    // carControl vars
    this.pedal = 0;
    this.turnSpeed = 5
    this.rotation = 0;
    this.carSpeed = 20;

    // car status
    this.status = 'enabled'

    // !! try sensor
    this.children.push(new Sensors( new Polygon([]), 9, 180, 500))
  }
  update(){
    if(this.status === 'enabled'){
      this.processControls();
    }
  }
  processControls(){
    //process pedal
    if(this.controls.signalsOut.up){
      this.pedal = lerp(this.pedal, 1, 0.1);
    }else if(this.controls.signalsOut.down){
      this.pedal = lerp(this.pedal, -1, 0.1);
    }else{
      this.pedal = lerp(this.pedal, 0, 0.1);
    }
     
    // process turn
    if(this.pedal !== 0){
      if(this.controls.signalsOut.left){
        this.rotation -= this.turnSpeed * this.pedal
      }else if(this.controls.signalsOut.right){
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
}
 
export class HumanCar extends Car{
  constructor(polygon:Polygon){
    super(polygon)
    this.controls = new CarHumanControl();
  }

  // on collision disable controls and physics and fade it
  onCollision(): void {
    this.status = 'crashed'
    this.physicsData.enabled = false;
    this.style.opacity = 0.5
    // disable sensors too
    this.children[0].children.forEach((child)=>{
      child.physicsData.enabled = false
    })
  }
}