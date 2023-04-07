import Experience from "./experience";
import Generations from "./neuralNetwork/generations";

let instance:UI|null = null;

export default class UI{
  elStartButton:HTMLElement;
  elFurthestDistanceText:HTMLElement;
  elGenerationText:HTMLElement;
  carsPerGeneration:number;
  mutatingFactor:number
  startButtonPressed:()=>void;
  mutateButtonPressed:()=>void;
  clearButtonPressed:()=>void = ()=>{console.log('clearButtonPressed')};
  // sliders
  elCarsPerGenerationSlider:any;
  elCarsPerGenerationLabel:HTMLElement
  elMutateFactorSlider:any;
  elMutationFactorLabel:HTMLElement
  elMutateButton:any;
  elSaveButton:any;
  elLoadButton:any;
  elClearButton = document.getElementById('clearButton');
  generations:Generations = new Experience().processes[1];
  hasStarted = false;

  constructor(){
    // get elements
    this.elStartButton = document.getElementById('startButton')!;
    this.elFurthestDistanceText = document.getElementById('distanceLabel')!;
    this.elGenerationText = document.getElementById('generationLabel')!;
    this.elCarsPerGenerationSlider = document.getElementById('carsPerGenerationRange')!;
    this.elCarsPerGenerationLabel = document.getElementById('numberOfCarsPerGenerationLabel')!;
    this.elMutateFactorSlider = document.getElementById('mutationRange')!;
    this.elMutationFactorLabel = document.getElementById('mutationFactorLabel')!;
    this.elMutateButton = document.getElementById('mutateButton')!;

    // define generation options
    this.carsPerGeneration = 100;
    this.mutatingFactor = 0.2

    // define callback placeholders
    this.startButtonPressed = ()=>{if(this.hasStarted){this.generations.freshStart()}else{this.generations.restartGeneration()}}; 
    this.mutateButtonPressed = ()=>{this.generations.createNewGeneration();}

    // singleton
    if(instance){return instance}
    else{instance = this}

    // handle generation option sliders events
    this.elCarsPerGenerationSlider.oninput = (()=>{
      const value = this.elCarsPerGenerationSlider.value
      this.elCarsPerGenerationLabel.innerHTML = value
      this.carsPerGeneration = value;
    }).bind(this)
    this.elMutateFactorSlider.oninput = (()=>{
      const value = this.elMutateFactorSlider.value
      this.elMutationFactorLabel.innerHTML = value
      this.mutatingFactor = value
    }).bind(this)

    // handle button events
    this.elStartButton.addEventListener('click', ()=>{this.elStartButton.innerHTML = "Restart Generation"; this.elMutateButton.disabled = false}); // todo on start enable the mutate button and change to "restart generation"
    this.elStartButton.addEventListener('click', ()=>{this.startButtonPressed()});
    this.elMutateButton.addEventListener('click', ()=>{this.mutateButtonPressed()})
  }
  updateTexts(distance="0", generation="0"){
    this.elFurthestDistanceText.innerHTML = distance;
    this.elGenerationText.innerHTML = generation;
  }

  updateGenerationsText(num:number){
    this.elGenerationText.innerHTML = num.toString();;
  }
}