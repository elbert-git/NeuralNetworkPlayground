import ObjectStyle from "./dataStructs/ObjectStyle";
import Vector2 from "./dataStructs/vector2";
import Polygon from "./dataStructs/polygon";
import Experience from "../experience";
import Edge from "./dataStructs/edge";

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
    // update objects
    this.update();

    // check collision and physics
    if(this.physicsData.enabled){
      this.handlePhysics();
    }

    // styles
    this.#styleCtx(ctx);

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

    if(this.style.closePath){
      ctx.closePath();
    }
     
    // draw
    if(this.style.fill){
      ctx.closePath();
      ctx.fill()
    }
    if(this.style.stroke){
      ctx.closePath();
      ctx.stroke()
    }

    // handle children
    this.children.forEach((obj)=>{
      obj.parentPosition = this.position.add(this.parentPosition);
      obj.parentAngle = this.rotation + this.parentAngle
      obj.draw(ctx);
    })

  }
   
  #styleCtx(ctx:CanvasRenderingContext2D){
    ctx.fillStyle = this.style.fillStyle
    ctx.strokeStyle = this.style.strokeStyle
    ctx.lineWidth = this.style.lineWidth;
    ctx.setLineDash(this.style.lineDash);
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

    // for every polygon: check collision
    for (let index = 0; index < collidersToCollideWith.length; index++) {
      if(this.checkCollisionWith(collidersToCollideWith[index])){
        console.log('collision detected')
        break; 
      }
    }
  }
   
  checkCollisionWith(object:PhysicsObjects):Vector2|null{
    // get this computed vertices
    const thisVertices = this.computeTransformedVertices();
    // get this edges
    const thisEdges = Edge.getEdges(thisVertices);
    // get other objects vertices
    const otherVertices = object.computeTransformedVertices();
    // get other objects edges
    const otherEdges = Edge.getEdges(otherVertices);
     
    for (let thisEdgeIndex = 0; thisEdgeIndex < thisEdges.length; thisEdgeIndex++) {
      for (let otherEdgeIndex = 0; otherEdgeIndex < otherEdges.length; otherEdgeIndex++) {
        const thisEdge = thisEdges[thisEdgeIndex];
        const otherEdge = otherEdges[otherEdgeIndex]
        const collision = thisEdge.getIntersectionWith(otherEdge)
        return collision
      }
    }
    return null // just to satify typsecript squiggly lines
  }

  onCollision(){}
}
 