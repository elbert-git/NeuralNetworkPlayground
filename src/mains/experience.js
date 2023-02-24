import RoadCanvas from "../road/roadCanvas";

let instance = null;
export default class Experience{
  constructor(){
    if(instance){return instance}
    instance = this;
    console.log('started experience');

    this.objects = []
    this.canvases = []
     
    this.updateRate = 60

    this.roadCanvas = new RoadCanvas(document.getElementById('road'));
    this.canvases.push(this.roadCanvas);
     
    window.setInterval(this.update.bind(this), 1000/this.updateRate);
  }
   
  update(){
    this.objects.forEach((obj)=>{
      obj.update()
    })
    this.canvases.forEach((canvas)=>{
      canvas.update();
    })
  }
}