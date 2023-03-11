import PhysicsObjects from "../physicWorld/physicsObject"
import Vector2 from "../physicWorld/dataStructs/vector2"
import Polygon from "../physicWorld/dataStructs/polygon"

export function createRoad(roadWidth:number, roadHeight:number){
  const road = new PhysicsObjects(new Polygon([
    new Vector2(-roadWidth, 0),
    new Vector2(roadWidth, 0),
    new Vector2(roadWidth, roadHeight),
    new Vector2(-roadWidth, roadHeight),
  ]))
  road.style.fillStyle = "#a6a6a6"

  return road
}

export function createSideLine(allLanesWidth:number, roadHeight:number, isLeft:boolean){
  const laneThickness = 5

  const pos = isLeft ? -allLanesWidth : allLanesWidth

  const sideLine = new PhysicsObjects(new Polygon([
    new Vector2(pos, 0),
    new Vector2(pos, roadHeight),
  ]))
  sideLine.physicsData.colliderTag = "road";

  sideLine.style.fill = false;
  sideLine.style.stroke = true;
  sideLine.style.strokeStyle = "white"
  sideLine.style.lineWidth = laneThickness

  return sideLine
}

export function createLaneObjects(laneCount:number, allLanesWidth:number, roadHeight:number){
  const laneThickness = 5
  const allLaneObjects:any = {}

  for (let index = 1; index < laneCount; index++) {
    // pos
    const xPos = -allLanesWidth + (((allLanesWidth*2)/laneCount)*index )
    //creat obj
    const lane = new PhysicsObjects(new Polygon([
      new Vector2(xPos, 0),
      new Vector2(xPos, roadHeight),
    ]))
    //style lane
    lane.style.stroke = true;
    lane.style.strokeStyle = "white";
    lane.style.lineWidth = laneThickness;
    lane.style.fill = false;
    lane.style.lineDash = [30,  50]
    // add to objects
    allLaneObjects[`lane${index}`] = lane;
  }
   
  return allLaneObjects

}