import Car from "../physicWorld/car/car"
import Vector2 from "../physicWorld/dataStructs/vector2"
import { lerp } from "../utilities"
import { createTrafficCar } from "./createCar"

export function createRowOFTraffic(laneCount:number, allLanesWidth:number, yHeight:number, spawnChance:number){
  // this is just because the lane width is actually  half a lane

  // get array of positions to spawn
  const positionsToSpawn:Array<Vector2> = []
  for (let index = 0; index < laneCount; index++) {
    const pos = new Vector2(
      lerp(0, allLanesWidth, index/laneCount) - (allLanesWidth/2) + ((allLanesWidth/laneCount)/2),
      yHeight
    )
    positionsToSpawn.push(pos);
  }

  // randomly spawn a row cars
  const rowOfCars:Array<Car> = [];
  for (let index = 0; index < laneCount; index++) {
    if(Math.random() > spawnChance){
      const car = createTrafficCar();
      car.position = positionsToSpawn[index]
      rowOfCars.push(car);
    }
  }

  // enforce at least one car
  if(rowOfCars.length === 0){
      const car = createTrafficCar();
      car.position = positionsToSpawn[(Math.floor(Math.random()*(laneCount-1)))]
      rowOfCars.push(car);
  }

  // enforce not all cars spots can be filled
  if(rowOfCars.length === laneCount){
    rowOfCars.splice((Math.floor(Math.random()*(laneCount-1))), 1)
  }


  // return all cars
  const returningObj:any = {}
  for (let index = 0; index < rowOfCars.length; index++) {
    returningObj[yHeight.toString() + 'trafficCars' + index.toString()] = rowOfCars[index];
  }
  return returningObj
}


export function createTrafficBlock(numOfRows:number, startingYheight:number,  rowDistance:number, laneCount:number, allLanesWidth:number, spawnChance:number){
  let returningObj:any = {}
  for (let index = 0; index < numOfRows; index++) {
    const yHeight = startingYheight - rowDistance*index
    const newRow = createRowOFTraffic(laneCount, allLanesWidth, yHeight, spawnChance);
    returningObj = {...returningObj, ...newRow}
  }
  return returningObj
}