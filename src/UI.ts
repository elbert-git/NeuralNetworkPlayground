import Experience from "./experience";

let instance:UI|null = null;

const ids = [
  'dataRange',
  'startData',
  'stopData',
  'trainingRange',
  'startNN',
  'stopNN',
  'spawnDefault',
]

export default class UI{
  elements:{[index:string]:HTMLElement} = {}
  constructor(){
    if(instance){return instance}
    instance = this;
    ids.forEach(id=>this.getElement(id))

    this.elements['startData'].addEventListener('pointerdown',(e)=>{
      const ex = new Experience()
      ex.reset()
      ex.startHumanCar()
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