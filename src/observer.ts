import Experience from "./experience";
import PhysicsWorld from "./physicWorld/physicsWorld";
import UI from "./UI";

interface ObservedState{
  generation:number;
  lanesPassed:number;
}


let instance:Observer|null = null;

export default class Observer{
  currentState:ObservedState = {
    generation: 0,
    lanesPassed: 0
  }

  constructor(){
    // singleton
    if(instance){return instance}; instance = this;
  }

  getBestCar(){
    // get list of all ai cars
    const world:PhysicsWorld = new Experience().processes[0];
    const allAICars = world.objects['aiCarGroup'].children;
    // get list of traffic cars (one car per row);
    const trafficHeights = world.objects['trafficCarGroup'].children.map((row)=>{return row.children[0].position.y})

    // sort the cars into lanes passed
    const sortedCars = this.#sortCarsIntoLanesPassed(allAICars, trafficHeights);

    //find best car in furthes lane
    let bestCar:any = allAICars[0];
    let furthestDistance = 0; furthestDistance
    sortedCars[sortedCars.length-1].forEach((car:any)=>{
      if(car.position.y < bestCar.position.y){ // found better car
        furthestDistance = car.position.y;
        bestCar = car;
      }
    })

    // dehighlihgt all car 
    allAICars.forEach((car)=>{
      const aiCar:any = car
      aiCar.highlight(false)
    })
    // highlight best car. 
    bestCar.highlight(true);

    // return the car
    return bestCar;
  }



  #sortCarsIntoLanesPassed(cars:Array<any>, lanes:Array<number>){
    // create empty final sorted array
    const finalSortedArray:any = [];
    for (let index = 0; index < lanes.length+1; index++) {
      finalSortedArray.push([]);
    }

    //add zero tier to lanes
    const lanesAddedZeroTier = [0, ...lanes]

    // put cars in correct tier
    lanesAddedZeroTier.forEach((heightTier, index)=>{
      // for each car
      cars.forEach((car)=>{
        // if car is above the tier: add to the sorted array with index
        if(car.position.y < heightTier){
          finalSortedArray[index].push(car);
        }
      })
    })

    // trim empty top tiers
    const trimmedFinalSortedArray:any = []
    for (let index = 0; index < finalSortedArray.length; index++) {
      const currentElement = finalSortedArray[index]
      if(currentElement.length > 0){trimmedFinalSortedArray.push(currentElement)}
    }

    return trimmedFinalSortedArray
  }

  updateGeneration(num:number){
    // update this instance
    this.currentState.generation = num;
    // update ui
    new UI().updateGenerationsText(num)
  }
}