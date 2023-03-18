import { physicsObjectList } from "./physicsWorld";
import {createRoad, createLaneObjects, createSideLine } from "../objectCreation/createRoad";
import { createRowOFTraffic, createTrafficBlock } from "../objectCreation/createTraffic";
import { createAICar, createCar } from "../objectCreation/createCar";
import Generations from "../neuralNetwork/generations";

// * ------------------- create road
const roadWidth = 400;
const roadHeight = -100000;
const road = createRoad(roadWidth, roadHeight)

// * ------------------- handle sidelines and lanes
const laneCount = 5
const allLanesWidth = roadWidth - 15;
// create sideLines
const leftSideLine = createSideLine(allLanesWidth, roadHeight, true);
const rightSideLine = createSideLine(allLanesWidth, roadHeight, false);
// create lanes
const allLaneObjects = createLaneObjects(laneCount, allLanesWidth, roadHeight)

// *  ------------------- create traffic
//human car
// const humanCar = createAICar();
// const humanCar = createCar();
// traffic cars
const trafficRow = createTrafficBlock(5, -300, 500, laneCount, allLanesWidth*2, 0.5);


// *  ------------------- push final object to physic world
export const createdObjects:physicsObjectList = {
  road, 
  leftSideLine, 
  rightSideLine, 
  ... allLaneObjects, 
  // humanCar,
  ...trafficRow
}


