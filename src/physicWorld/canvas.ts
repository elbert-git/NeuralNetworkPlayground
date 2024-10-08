import Vector2 from "./dataStructs/vector2";
import PhysicsObjects from "./physicsObject";
import { physicsObjectList } from "./physicsWorld";

interface canvasSize {
    x: number,
    y: number
}

export default class Canvas {
    parentElement: HTMLElement;
    elCanvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    center: Vector2;
    size: canvasSize;
    cameraPosition: Vector2;
    camearaViewScale: Vector2;
    cameraSubject: PhysicsObjects | null

<<<<<<< HEAD
    constructor(parentElement: HTMLElement) {
        //create canvas
        this.parentElement = parentElement;
        this.elCanvas = document.createElement('canvas');
        this.elCanvas.classList.add('debugRedLine', 'roadCanvas');
        this.ctx = this.elCanvas.getContext('2d')!;
        this.parentElement.appendChild(this.elCanvas);

        // vars
        this.center = new Vector2(0, 0)
        this.cameraPosition = new Vector2(0, 0);
        const zoomOut = 3
        this.camearaViewScale = new Vector2(1 / zoomOut, 1 / zoomOut);
        this.cameraSubject = null

        // on resize
        this.size = { x: 0, y: 0 }
        window.addEventListener('resize', this.onResize.bind(this))
        this.onResize();
    }

    onResize() {
        this.size = {
            x: this.parentElement.clientWidth,
            y: this.parentElement.clientHeight
        }
        this.elCanvas.width = this.size.x;
        this.elCanvas.height = this.size.y;
        //update center
        this.center = new Vector2(
            Math.floor(this.size.x / 2),
            Math.floor(this.size.y / 2),
        )
    }

    clear() {
        this.ctx.fillStyle = "#333333";
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.size.x, this.size.y)
        this.ctx.fill()
=======
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
    const zoomOut = 3
    this.camearaViewScale = new Vector2(1/zoomOut, 1/zoomOut);
    this.cameraSubject = null
     
    // on resize
    this.size = {x: 0, y: 0}
    window.addEventListener('resize', this.onResize.bind(this))
    this.onResize();
  }
   
  onResize(){
    this.size = {
      x: this.parentElement.clientWidth,
      y: this.parentElement.clientHeight
>>>>>>> 6539c3bf301d463aa4989fab86d814dc4064ef5a
    }

    draw(objects: physicsObjectList) {
        // clear screen
        this.clear()

        // handle camerea
        this.#handleCamera();

        // handle context
        this.ctx.save();
        this.ctx.translate(
            this.center.x - this.cameraPosition.x,
            this.center.y - this.cameraPosition.y,
        );
        this.ctx.scale(this.camearaViewScale.x, this.camearaViewScale.y)

        // draw all objects
        Object.keys(objects).forEach((key) => {
            objects[key].draw(this.ctx);
        })

        // restor context
        this.ctx.restore();

        //! temp put camera control here
        // const car = objects.humanCar
        // this.cameraPosition = car.position.scale(this.camearaViewScale.x)
    }

<<<<<<< HEAD
    #handleCamera() {
        if (this.cameraSubject) {
            const newPosition = this.cameraSubject.position.scale(this.camearaViewScale.x);
            newPosition.x = 0
            this.cameraPosition = newPosition
        }
=======
    // const car = objects.car
    // if(car){
    //   this.cameraPosition = this..position.scale(this.camearaViewScale.x)
    // }
  }
   
  #handleCamera(){
    if(this.cameraSubject){
      const newPosition = this.cameraSubject.position.scale(this.camearaViewScale.x);
      newPosition.x = 0
      this.cameraPosition = newPosition
>>>>>>> 6539c3bf301d463aa4989fab86d814dc4064ef5a
    }
}