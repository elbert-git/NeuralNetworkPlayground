import Experience from "../../experience";
import Polygon from "../dataStructs/polygon";
import Vector2 from "../dataStructs/vector2";
import PhysicsObjects from "../physicsObject";

class SensorRay extends PhysicsObjects{
  reading:number;
  distance:number
  constructor(polygon:Polygon, distance:number){
    super(polygon)
    this.reading = 0
    this.distance = distance
  }

  update(): void {
    this.reading = 0
  }

  // get readings
  onCollision(collision: Vector2 | null): void {
    if(collision){
      const computedPosition = this.position.add(this.parentPosition);
      const relativeCollisionPos = computedPosition.subtract(computedPosition);
      const collisionMagnitude = relativeCollisionPos.magnitude();
      this.reading = (collisionMagnitude/this.distance)^-1;

      // temp draw ctx
      const circleIndicatorRadius = 10
      const ctx = new Experience().processes[0].canvas.ctx;
      ctx.fillStyle = 'yellow'
      ctx.arc(collision.x, collision.y, circleIndicatorRadius, 0, Math.PI*2)
      ctx.fill();
    }
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
      ]), rayLength)
      //style rays
      newRay.style.strokeStyle = "red";
      newRay.style.stroke = true;
      newRay.style.fill = false;
      newRay.physicsData.enabled = true;
      newRay.physicsData.collidesWith = ['road', 'traffic'];
      //push ray
      this.children.push(newRay)
    }
  }
}