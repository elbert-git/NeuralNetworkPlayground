export default class ObjectStyle{
  stroke:boolean;
  fill:boolean;
  fillStyle:string;
  strokeStyle:string;
  closePath:boolean;
  lineWidth:number
  lineDash:Array<number>
  constructor(){
    this.stroke = false;
    this.fill = true;
    this.fillStyle = "white";
    this.strokeStyle = "black";
    this.lineDash = []
    this.closePath = true;
    this.lineWidth = 1;
  }
}