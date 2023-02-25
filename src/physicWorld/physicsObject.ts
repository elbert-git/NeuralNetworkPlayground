import ObjectStyle from "./dataStructs/ObjectStyle";
import Vector2 from "./dataStructs/vector2";
import Polygon from "./dataStructs/polygon";

export default class PhysicsObjects{
  position:Vector2;
  rotation:number;
  polygon:Polygon;
  style:ObjectStyle

  constructor(polygon:Polygon){
    this.position = new Vector2(0,0);
    this.rotation = 0;
    this.polygon = polygon
    this.style = new ObjectStyle();
  }

  draw(ctx:CanvasRenderingContext2D){
    // update objects
    this.#update();

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
      const rotated = vert.rotate(this.rotation);
      const rotatedAndPositioned = rotated.add(this.position);
      return rotatedAndPositioned
    })

    return transformedVertices
  }
   
  #update(){}
}
 