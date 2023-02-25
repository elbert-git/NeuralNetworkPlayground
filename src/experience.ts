let instance:Experience|null = null;
export default class Experience{
  processes:Array<any>;
  updateRate:number;
  constructor(){
    // vars
    this.processes = []
    this.updateRate = 60

    // singleton
    if(instance){return instance}
    else{
      instance = this;
    }

    // start updatee loop
    window.setInterval(this.update.bind(this), 1000/this.updateRate )

  }
   
  update(){
    this.processes.forEach((process)=>{
      process.update();
    })
  }
}