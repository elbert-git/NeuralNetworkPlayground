export default class Canvas{
  constructor(parentElement){
    this.parentElement = parentElement;
     
    // create canvas element
    this.elCanvas = document.createElement('canvas');
    this.parentElement.appendChild(this.elCanvas);
    this.ctx = this.elCanvas.getContext('2d');
     
    // vars
    this.size = {
      x: 300,
      y: window.innerHeight
    }

    // on resize
    window.addEventListener('resize', this.resizeCanvas.bind(this))
    this.resizeCanvas();
  }

  resizeCanvas(){
    // update size
    this.size = {
      x: 300,
      y: window.innerHeight
    }
    //resize canvas
    this.elCanvas.width = this.size.x
    this.elCanvas.height = this.size.y
  }
   
  clear(){
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.size.x, this.size.y);
    this.ctx.fillStyle = "white";
    this.stroke
  }

  update(){
    console.log('no update code inserted');
  }
}