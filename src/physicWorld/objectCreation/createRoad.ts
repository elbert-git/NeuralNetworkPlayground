import PhysicsObjects from "../physicsObject"
import Vector2 from "../dataStructs/vector2"
import Polygon from "../dataStructs/polygon"
import { roadVars } from "./roadConstants"

function createRoad(roadWidth:number, roadHeight:number){
  const road = new PhysicsObjects(new Polygon([
    new Vector2(-roadWidth, 0),
    new Vector2(roadWidth, 0),
    new Vector2(roadWidth, roadHeight),
    new Vector2(-roadWidth, roadHeight),
  ]))
  road.style.fillStyle = "#a6a6a6"

  return road
}

function createSideLine(allLanesWidth:number, roadHeight:number, isLeft:boolean){
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

function createLaneObjects(laneCount:number, allLanesWidth:number, roadHeight:number){
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

// * create road
const road = createRoad(roadVars.roadWidth, roadVars.roadHeight)

// * handle sidelines and lanes
// create sideLines
const leftSideLine = createSideLine(roadVars.allLanesWidth, roadVars.roadHeight, true);
const rightSideLine = createSideLine(roadVars.allLanesWidth, roadVars.roadHeight, false);
// create lanes
const allLaneObjects = createLaneObjects(roadVars.laneCount, roadVars.allLanesWidth, roadVars.roadHeight)

export const roadObjects = {
  road,
  leftSideLine,
  rightSideLine,
  ...allLaneObjects
}