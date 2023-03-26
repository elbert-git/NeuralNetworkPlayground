import Vector2 from "../dataStructs/vector2"
import { lerp } from "../../utilities"
import { createTrafficCar } from "./createCar"
import PhysicsObjects from "../physicsObject"
import Polygon from "../dataStructs/polygon"

export function createRowOFTraffic(laneCount:number, allLanesWidth:number, yHeight:number, spawnChance:number){
  // this is just because the lane width is actually  half a lane

  // create physicsobjectGroup
  const trafficRow = new PhysicsObjects(new Polygon([]));
  trafficRow.style.fill = false;

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
  for (let index = 0; index < laneCount; index++) {
    if(Math.random() > spawnChance){
      const car = createTrafficCar();
      car.position = positionsToSpawn[index]
      trafficRow.children.push(car)
    }
  }

  // enforce at least one car
  if(trafficRow.children.length === 0){
      const car = createTrafficCar();
      car.position = positionsToSpawn[(Math.floor(Math.random()*(laneCount-1)))]
      trafficRow.children.push(car)
  }

  // enforce not all cars spots can be filled
  if(trafficRow.children.length === laneCount){
    trafficRow.children.splice((Math.floor(Math.random()*(laneCount-1))), 1)
  }


  // return all cars
  return trafficRow
}


export function createTrafficBlock(numOfRows:number, startingYheight:number,  rowDistance:number, laneCount:number, allLanesWidth:number, spawnChance:number){
  let returningObj:any = {}
  for (let index = 0; index < numOfRows; index++) {
    const yHeight = startingYheight - rowDistance*index
    const newRow = createRowOFTraffic(laneCount, allLanesWidth, yHeight, spawnChance);
    returningObj[`trafficRow${index}`] = newRow
  }
  return returningObj
}