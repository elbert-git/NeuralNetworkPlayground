import Vector2 from "./dataStructs/vector2";
import { physicsObjectList } from "./physicsWorld";

interface canvasSize{
  x: number,
  y: number
}

export default class Canvas{
  parentElement:HTMLElement;
  elCanvas:HTMLCanvasElement;
  ctx:CanvasRenderingContext2D;
  center:Vector2;
  size:canvasSize;
  cameraPosition:Vector2;
  camearaViewScale:Vector2;

  constructor(parentElement:HTMLElement){
    //create canvas
    this.parentElement = parentElement;
    this.elCanvas = document.createElement('canvas');
    this.elCanvas.classList.add('debugRedLine', 'roadCanvas');
    this.ctx = this.elCanvas.getContext('2d')!;
    this.parentElement.appendChild(this.elCanvas);
     
    // vars
    this.center = new Vector2(0,0)
    this.cameraPosition = new Vector2(0,0);
    const zoomOut = 2
    this.camearaViewScale = new Vector2(1/zoomOut, 1/zoomOut);
     
    // on resize
    this.size = {x: 0, y: 0}
    window.addEventListener('resize', this.onResize.bind(this))
    this.onResize();
  }
   
  onResize(){
    this.size = {
      x: this.parentElement.clientWidth,
      y: this.parentElement.clientHeight
    }
    this.elCanvas.width = this.size.x;
    this.elCanvas.height = this.size.y;
    //update center
    this.center = new Vector2(
      Math.floor(this.size.x/2),
      Math.floor(this.size.y/2),
    )
  }

  clear(){
    this.ctx.fillStyle = "#333333";
    this.ctx.beginPath();
    this.ctx.rect(0,0, this.size.x, this.size.y)
    this.ctx.fill()
  }
   
  draw(objects:physicsObjectList){
    // clear screen
    this.clear()

    // handle context
    this.ctx.save();
    this.ctx.translate(
      this.center.x - this.cameraPosition.x,
      this.center.y - this.cameraPosition.y,
    ); 
    this.ctx.scale(this.camearaViewScale.x, this.camearaViewScale.y)

    // draw all objects
    Object.keys(objects).forEach((key)=>{
      objects[key].draw(this.ctx);
    })
     
    // restor context
    this.ctx.restore();
  }
}