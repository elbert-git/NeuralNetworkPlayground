import Polygon from "../dataStructs/polygon";
import Vector2 from "../dataStructs/vector2";
import PhysicsObjects from "../physicsObject";

class SensorRay extends PhysicsObjects{
  constructor(polygon:Polygon){
    super(polygon)
  }
}

export default class Sensors extends PhysicsObjects{
  constructor(polygon:Polygon ,num:number, angle:number){
    super(polygon)
    
    // create rays
    for (let index = 0; index < num; index++) {
      this.children.push(new SensorRay(new Polygon([
        new Vector2(0,0),
        new Vector2(0,-10),
      ])))
    }
  }
}