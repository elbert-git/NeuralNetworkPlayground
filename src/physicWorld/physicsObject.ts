import ObjectStyle from "./dataStructs/ObjectStyle";
import Vector2 from "./dataStructs/vector2";
import Polygon from "./dataStructs/polygon";
import Experience from "../experience";
import Edge from "./dataStructs/edge";
import { deg2Rad } from "../utilities";

interface PhysicsData {
  enabled:boolean,
  colliderTag:string|null,
  collidesWith:Array<string>;
}

export default class PhysicsObjects{
  position:Vector2;
  rotation:number;
  polygon:Polygon;
  style:ObjectStyle;
  children:Array<PhysicsObjects>;
  parentPosition:Vector2;
  parentAngle:number;
  physicsData:PhysicsData

  constructor(polygon:Polygon){
    this.position = new Vector2(0,0);
    this.rotation = 0;
    this.polygon = polygon
    this.style = new ObjectStyle();
    this.children = []
    this.parentPosition = new Vector2(0,0);
    this.parentAngle = 0
    this.physicsData = {
      enabled: false,
      colliderTag: null,
      collidesWith: []
    }
  }

  draw(ctx:CanvasRenderingContext2D){
    ctx.beginPath();
    // update objects
    this.update();

    // check collision and physics
    if(this.physicsData.enabled){
      this.handlePhysics();
    }

    // handle children
    this.children.forEach((obj)=>{
      obj.parentPosition = this.position.add(this.parentPosition);
      obj.parentAngle = this.rotation + this.parentAngle
      obj.draw(ctx);
    })


    //trace vertices
    const transformedVertices = this.computeTransformedVertices()
    transformedVertices.forEach((vert, index)=>{
      if(index === 0){
        ctx.beginPath();
        ctx.moveTo(vert.x, vert.y)
      }
      else{
        ctx.lineTo(vert.x, vert.y);
      }
    })


     
    // styles
    this.#styleCtx(ctx);

    // draw
    if(this.style.closePath){
      ctx.closePath();
    }
    if(this.style.fill){
      ctx.fill();
    }
    if(this.style.stroke){
      ctx.stroke();
    }
    if(this.style.images.length > 0){
      // handle image rotation
      const angle = this.rotation;
      const angleToRotateCtx = deg2Rad(angle)
      ctx.rotate(angleToRotateCtx)

      // handle image position
      const relativePos = transformedVertices[0].subtract(this.position);
      const rotatedRelativePos = relativePos.rotate(0);
      const finalPos = rotatedRelativePos.add(this.position).rotate(-angle);

      //draw image
      for (let index = 0; index < this.style.images.length; index++) {
        ctx.drawImage(this.style.images[index], finalPos.x, finalPos.y, this.style.imageSize.x, this.style.imageSize.y);
      }
       
      // restore contextk
      ctx.rotate(-angleToRotateCtx)
    }
  }
   
  #styleCtx(ctx:CanvasRenderingContext2D){
    ctx.fillStyle = this.style.fillStyle
    ctx.strokeStyle = this.style.strokeStyle
    ctx.lineWidth = this.style.lineWidth;
    ctx.setLineDash(this.style.lineDash);
    ctx.globalAlpha = this.style.opacity;
  }

  computeTransformedVertices(){
    let transformedVertices = [...this.polygon.vertices]

    //rotate
    transformedVertices = transformedVertices.map((vert)=>{
      const rotated = vert.rotate(this.rotation+this.parentAngle);
      const rotatedAndPositioned = rotated.add(this.position.add(this.parentPosition));
      return rotatedAndPositioned
    })

    return transformedVertices
  }
   
  update(){
  }

  handlePhysics(){
    // get array of possible polygons to collide with
    const world = new Experience().processes[0];
    let collidersToCollideWith:Array<PhysicsObjects> = []
    if(this.physicsData.collidesWith.length > 0){
      this.physicsData.collidesWith.forEach((tag)=>{
        collidersToCollideWith = [...collidersToCollideWith, ...world.colliderGroups[tag]]
      })
    }

    // for every polygon get all collisions points
    let collisions:Array<Vector2> = []
    for (let index = 0; index < collidersToCollideWith.length; index++) {
      collisions = [...collisions, ...this.checkCollisionWith(collidersToCollideWith[index])]
    }

    // if have collission points, call OnCollisios
    if(collisions.length > 0){
      // console.log('collision detected')
      this.onCollision(collisions);
    }
  }
   
  checkCollisionWith(object:PhysicsObjects){
    // get this computed vertices
    const thisVertices = this.computeTransformedVertices();
    // get this edges
    const thisEdges = Edge.getEdges(thisVertices);
    // get other objects vertices
    const otherVertices = object.computeTransformedVertices();
    // get other objects edges
    const otherEdges = Edge.getEdges(otherVertices);
     
    const collisions:Array<Vector2> = []
    for (let thisEdgeIndex = 0; thisEdgeIndex < thisEdges.length; thisEdgeIndex++) {
      for (let otherEdgeIndex = 0; otherEdgeIndex < otherEdges.length; otherEdgeIndex++) {
        const thisEdge = thisEdges[thisEdgeIndex];
        const otherEdge = otherEdges[otherEdgeIndex]
        const collision = thisEdge.getIntersectionWith(otherEdge)
        if(collision){collisions.push(collision)}
      }
    }
    return collisions // just to satify typsecript squiggly lines
  }

  onCollision(collision:Array<Vector2>){}
}
 