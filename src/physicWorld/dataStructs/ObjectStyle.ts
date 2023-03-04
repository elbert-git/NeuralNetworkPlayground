import Vector2 from "./vector2";

export default class ObjectStyle{
  stroke:boolean;
  fill:boolean;
  fillStyle:string;
  strokeStyle:string;
  closePath:boolean;
  lineWidth:number
  lineDash:Array<number>
  images:Array<HTMLImageElement>; 
  imageSize:Vector2;
  opacity:number;
  constructor(){
    this.stroke = false;
    this.fill = true;
    this.fillStyle = "white";
    this.strokeStyle = "black";
    this.lineDash = []
    this.closePath = true;
    this.lineWidth = 1;
    this.images = [];
    this.imageSize = new Vector2(0,0);
    this.opacity = 1;
  }
  addImage(path:string, width:number, height:number){
    //create img element
    const image = document.createElement('img');
    image.src = path;
    // assign to object
    image.onload = ()=>{
      this.images.push(image);
      this.imageSize = new Vector2(width, height)
    }
  }
}