interface SignalOut{
  up:number,
  right:number,
  down:number,
  left:number,
}

export class CarControls{
  signalsOut:SignalOut
  constructor(){
    this.signalsOut = {
    up:0,
    right:0,
    down:0,
    left:0,
    }
  }
  update(){}
}

export class CarHumanControl extends CarControls{
  constructor(){
    super()
     
    addEventListener('keydown', (e)=>{;
      switch(e.key){
        case 'ArrowUp':
          this.signalsOut.up = 1;
          break;
        case 'ArrowRight':
          this.signalsOut.right = 1;
          break;
        case 'ArrowLeft':
          this.signalsOut.left = 1;
          break;
        case 'ArrowDown':
          this.signalsOut.down = 1;
          break;
      }
    })
    addEventListener('keyup', (e)=>{
      switch(e.key){
        case 'ArrowUp':
          this.signalsOut.up = 0;
          break;
        case 'ArrowRight':
          this.signalsOut.right = 0;
          break;
        case 'ArrowLeft':
          this.signalsOut.left = 0;
          break;
        case 'ArrowDown':
          this.signalsOut.down = 0;
          break;
      }
    })
  }
  update(){}
}