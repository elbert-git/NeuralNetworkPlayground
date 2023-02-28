import PhysicsObjects from "./physicsObject"
import Canvas from "./canvas";

export interface physicsObjectList{
  [key: string]: PhysicsObjects
}

export interface ColliderGroups{
  [key: string]: Array<PhysicsObjects>
}

export default class PhysicsWorld{
  objects:physicsObjectList
  canvas:Canvas;
  colliderGroups:ColliderGroups;

 constructor(){
  this.objects = {}
  this.canvas = new Canvas(document.getElementById('road')!)
  this.colliderGroups = {}
 }

 update(){
  // draw each object with canvas
  this.canvas.draw(this.objects);
 }

 //todo remmever to recusively add children
 addObject(key:string ,physicsObject:PhysicsObjects){
  // add to list.
  this.objects[key] = physicsObject

  // to collider groups
  this.addObjectToColliderGroups(physicsObject);
 }

 addObjectToColliderGroups(physicsObject:PhysicsObjects){
  // add to collider groups
  const tag = physicsObject.physicsData.colliderTag;
  if(tag){
    if(this.colliderGroups.tag){
      this.colliderGroups.tag.push(physicsObject);
    }else{
      this.colliderGroups[tag] = [physicsObject];
    }
  }

  // if has children
  if(physicsObject.children){
    physicsObject.children.forEach((child)=>{
      this.addObjectToColliderGroups(child)
    })
  }
 }
}