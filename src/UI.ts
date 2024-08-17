import Experience from "./experience";
import Observer from "./observer";

let instance:UI|null = null;

const ids = [
  'dataRange',
  'startData',
  'stopData',
  'trainingRange',
  'startNN',
  'spawnNN',
  'spawnDefault',
]

export default class UI{
  elements:{[index:string]:HTMLElement} = {}
  constructor(){
    if(instance){return instance}
    instance = this;
    ids.forEach(id=>this.getElement(id))

    // data handling
    this.elements['startData'].addEventListener('pointerdown',(e)=>{
      const ex = new Experience()
      ex.paused = false;
      ex.reset()
      ex.startHumanCar()
    })
    this.elements['stopData'].addEventListener('pointerdown',(e)=>{new Experience().paused = true})

    //nn handling
    this.elements['startNN'].addEventListener('pointerdown', (e)=>{
      const ex = new Experience()
      const observer = ex.processes[1] as Observer;
      const logs = observer.logs;
      ex.nnTrainer.reset();
      ex.nnTrainer.logs = logs;
      ex.nnTrainer.train = true;
    })
    this.elements['spawnNN'].addEventListener('pointerdown', (e)=>{
      // stop training
      const ex = new Experience()
      const trainer = ex.nnTrainer;
      trainer.train = false;

      // reset expereince
      ex.reset();
      const nn = trainer.neuralNetwork
      ex.startTrainedCar(nn!)
      ex.paused = false;
    })
  }
  getElement(id:string){
    this.elements[id] = document.getElementById(id)!;
  }
  updateRange(id:string, value:string){
    const elRange = this.elements[id] as HTMLInputElement
    elRange.value =  value
  }
}