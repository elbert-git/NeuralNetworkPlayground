import Experience from "../../experience";
import Polygon from "../dataStructs/polygon";
import Vector2 from "../dataStructs/vector2";
import PhysicsObjects from "../physicsObject";

class SensorRay extends PhysicsObjects{
  reading:number;
  distance:number
  visible:boolean = true;
  constructor(polygon:Polygon, distance:number){
    super(polygon)
    this.reading = 0
    this.distance = distance
  }

  update(): void {
    this.reading = 1
  }

  // get readings
  onCollision(collisions:Array<Vector2>): void {
    // get nearest collision point. 
    let nearestPoint:Vector2|null = null;
    let currentNearestDistance = Infinity;
    collisions.forEach((point)=>{
      const distance = Math.abs(
        point.subtract(this.position.add(this.parentPosition)).magnitude()
      );
      if(distance < currentNearestDistance){
        nearestPoint = point
        currentNearestDistance = distance;
      }
      
      //temp draw closest points
      if(this.visible){
        const circleIndicatorRadius = 10
        const ctx = new Experience().processes[0].canvas.ctx;
        ctx.beginPath()
        ctx.fillStyle = 'yellow'
        ctx.arc(point!.x, point!.y, circleIndicatorRadius, 0, Math.PI*2)
        ctx.globalOpacity = this.reading;
        ctx.fill();
        ctx.globalOpacity = 1;
      }
    })

    // handle reading
    const computedPosition = this.position.add(this.parentPosition);
    const relativeCollisionPos = computedPosition.subtract(nearestPoint!);
    const collisionMagnitude = relativeCollisionPos.magnitude();
    this.reading = (collisionMagnitude/this.distance);

    // visualise the point
    const circleIndicatorRadius = 10;circleIndicatorRadius
    const ctx = new Experience().processes[0].canvas.ctx;ctx;
    // draw all intersection points
    if(this.visible){
      // ctx.beginPath()
      // ctx.fillStyle = 'red'
      // ctx.arc(nearestPoint!.x, nearestPoint!.y, circleIndicatorRadius, 0, Math.PI*2)
      // ctx.fill();
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
      this.highlight();
    }
  }
   
  getReadings(){
    const finalResults:Array<number> = []
    this.children.forEach((ray:any)=>{
      finalResults.push(ray.reading);
    })
    return finalResults
  }

  highlight(b:boolean=false){
    this.children.forEach((child)=>{
      const ray:any = child
      ray.style.stroke = b;
      ray.visible = b
    })
  }
}