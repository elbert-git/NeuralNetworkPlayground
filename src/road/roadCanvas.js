import Canvas from "../mains/canvas";

export default class RoadCanvas extends Canvas{
  constructor(parentElement){
    super(parentElement);

    this.roadWidth = 200;
    this.margin = 3;
  }

  update(){
    this.clear();
    this.drawRoad();
  }

  drawRoad(){
    const center = Math.floor(this.size.x/2);
    this.ctx.beginPath();
    this.ctx.fillStyle = '#b8b8b8';
    this.ctx.rect(
      Math.floor(center - this.roadWidth/2),
      0,
      Math.floor(this.roadWidth),
      this.size.y
    )
    this.ctx.fill();
  }
   
  drawSideLines(){
    const sideLineWidth = 3;

    // draw left
    this.beginPath();
    this.ctx.rect()
    // draw rigth
  }
}