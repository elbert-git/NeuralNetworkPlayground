let instance:UI|null = null;

export default class UI{
  elGenerationControl:HTMLElement;
  elFurthestDistanceText:HTMLElement;
  elGenerationText:HTMLElement;
  carsPerGeneration:number;
  mutatingFactor:number
  controlButtonPressed:()=>void;

  constructor(){
    //elements
    this.elGenerationControl = document.getElementById('generationControlButton')!;
    this.elFurthestDistanceText = document.getElementById('distanceLabel')!;
    this.elGenerationText = document.getElementById('generationLabel')!;

    this.controlButtonPressed = ()=>{console.log('generation button click')}; 

    // generation options
    this.carsPerGeneration = 100;
    this.mutatingFactor = 0.2

    // singleton
    if(instance){return instance}
    else{instance = this}

    this.elGenerationControl.addEventListener('click', ()=>{this.controlButtonPressed()});
  }
  updateTexts(distance="0", generation="0"){
    this.elFurthestDistanceText.innerHTML = distance;
    this.elGenerationText.innerHTML = generation;
  }
}