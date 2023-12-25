import NeuralNetwork from "../../neuralNetwork/neuralNetwork"

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
  update():void{}
}

export class CarHumanControl extends CarControls{
  constructor(){
    super()
     
    addEventListener('keydown', (e)=>{;
      switch(e.key){
        case 'w':
          this.signalsOut.up = 1;
          break;
        case 'd':
          this.signalsOut.right = 1;
          break;
        case 'a':
          this.signalsOut.left = 1;
          break;
        case 's':
          this.signalsOut.down = 1;
          break;
      }
    })
    addEventListener('keyup', (e)=>{
      switch(e.key){
        case 'w':
          this.signalsOut.up = 0;
          break;
        case 'd':
          this.signalsOut.right = 0;
          break;
        case 'a':
          this.signalsOut.left = 0;
          break;
        case 's':
          this.signalsOut.down = 0;
          break;
      }
    })
  }
  update(){}
}

export class CarTrafficControl extends CarControls{
  constructor(){
    super()
    this.signalsOut.up = 1
  }
}

export class AICarControl extends CarControls{
  neuralNetwork:NeuralNetwork;
  constructor(){
    super();
    this.neuralNetwork = new NeuralNetwork([7, 8, 4]) ;
  }
  // updateNetwork(signals:Array<number>, print:boolean=false):void {
    // const thresh = 0
    // if(print){console.table(signals[3])};
    // const neuralNetworkResults =  this.neuralNetwork.feedForward(signals);
    // this.signalsOut.up = neuralNetworkResults[0] > thresh ? 1 : 0;
    // this.signalsOut.right = neuralNetworkResults[1] > thresh ? 1 : 0;
    // this.signalsOut.down = neuralNetworkResults[2] > thresh ? 1 : 0;
    // this.signalsOut.left = neuralNetworkResults[3] > thresh ? 1 : 0;
  // }
}