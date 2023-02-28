import Polygon from "../dataStructs/polygon";
import Vector2 from "../dataStructs/vector2";
import PhysicsObjects from "../physicsObject";

class SensorRay extends PhysicsObjects{
  constructor(polygon:Polygon){
    super(polygon)
  }
}

export default class Sensors extends PhysicsObjects{
  constructor(polygon:Polygon ,num:number, angle:number, rayLength:number){
    super(polygon)
    
    // create rays
    for (let index = 0; index < num+0; index++) {
      // get angle
      const rayAngle = (0 - angle/2) + ((angle/(num-1))*index+1)
      // get vector
      //create
      const newRay = new SensorRay(new Polygon([
        new Vector2(0,0),
        new Vector2(0,-rayLength).rotate(rayAngle),
      ]))
      //style rays
      newRay.style.strokeStyle = "red";
      newRay.style.stroke = true;
      newRay.style.fill = false;
      //push ray
      this.children.push(newRay)
    }
  }
}