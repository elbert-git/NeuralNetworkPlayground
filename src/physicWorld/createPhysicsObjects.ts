import { HumanCar } from "./car/car";
import Polygon from "./dataStructs/polygon";
import Vector2 from "./dataStructs/vector2";
import PhysicsObjects from "./physicsObject";
import { physicsObjectList } from "./physicsWorld";

// * ------------------- create road
const roadWidth = 400;
const roadHeight = -100000;
const road = new PhysicsObjects(new Polygon([
  new Vector2(-roadWidth, 0),
  new Vector2(roadWidth, 0),
  new Vector2(roadWidth, roadHeight),
  new Vector2(-roadWidth, roadHeight),
]))
road.style.fillStyle = "#a6a6a6"

// * ------------------- handle sidelines and lanes
const laneCount = 5
const laneThickness = 5
const allLanesWidth = roadWidth - 15;
// create sideLines
const leftSideLine = new PhysicsObjects(new Polygon([
  new Vector2(-allLanesWidth, 0),
  new Vector2(-allLanesWidth, roadHeight),
]))
leftSideLine.physicsData.colliderTag = "road";
const rightSideLine = new PhysicsObjects(new Polygon([
  new Vector2(+allLanesWidth, 0),
  new Vector2(+allLanesWidth, roadHeight),
]))
rightSideLine.physicsData.colliderTag = "road";
leftSideLine.style.fill = false;
leftSideLine.style.stroke = true;
leftSideLine.style.strokeStyle = "white"
leftSideLine.style.lineWidth = laneThickness
rightSideLine.style.fill = false;
rightSideLine.style.stroke = true;
rightSideLine.style.strokeStyle = "white"
rightSideLine.style.lineWidth = laneThickness
// create lanes
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

// *  ------------------- create traffic
const carSize = [60, 90];
const car = new HumanCar(new Polygon([
  new Vector2(-carSize[0], -carSize[1]),
  new Vector2(carSize[0], -carSize[1]),
  new Vector2(carSize[0], carSize[1]),
  new Vector2(-carSize[0], carSize[1])
]))
car.physicsData.enabled = true;
car.physicsData.collidesWith = ['road']



// *  ------------------- push final object to physic world
export const createdObjects:physicsObjectList = {
  road, 
  leftSideLine, 
  rightSideLine, 
  ... allLaneObjects, 
  car
}
