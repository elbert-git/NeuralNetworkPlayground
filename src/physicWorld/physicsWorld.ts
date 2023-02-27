import PhysicsObjects from "./physicsObject"
import Canvas from "./canvas";

export interface physicsObjectList{
  [key: string]: PhysicsObjects
}

export default class PhysicsWorld{
  objects:physicsObjectList
  canvas:Canvas;

 constructor(){
  this.objects = {}
  this.canvas = new Canvas(document.getElementById('road')!)
 }

 update(){
  // draw each object with canvas
  this.canvas.draw(this.objects);
 }
}