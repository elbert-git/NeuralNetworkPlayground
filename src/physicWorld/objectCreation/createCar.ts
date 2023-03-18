import Vector2 from "../dataStructs/vector2";
import { AICar, HumanCar, TrafficCar } from "../car/car";
import Polygon from "../dataStructs/polygon";
import ObjectStyle from "../dataStructs/ObjectStyle";
import ImageLibrary from "../../LoadingAssets/LoadImages";

const imageLibrary = new ImageLibrary();

// create cars polygon
const carSize = [55, 110];
const carPolygon = new Polygon([
    new Vector2(-carSize[0], -carSize[1]),
    new Vector2(carSize[0], -carSize[1]),
    new Vector2(carSize[0], carSize[1]),
    new Vector2(-carSize[0], carSize[1])
])

//create car style
const createCarStyle = ()=>{
  const carStyle = new ObjectStyle()
  carStyle.stroke = false;
  carStyle.fill = false;
  carStyle.fillStyle = 'red'
  carStyle.addImage(imageLibrary.library.carFill, carSize[0]*2, carSize[1]*2);
  carStyle.addImage(imageLibrary.library.carOutlines, carSize[0]*2, carSize[1]*2);
  return carStyle
}

export function createCar(){
  const car = new HumanCar(carPolygon)
  car.physicsData.enabled = true;
  car.physicsData.collidesWith = ['road', 'traffic']
  car.style = createCarStyle();
  return car
}

export function createTrafficCar(){
  const car = new TrafficCar(carPolygon)
  car.carSpeed = 10
  car.physicsData.colliderTag = 'traffic'
  car.style = createCarStyle();
  return car
}

export function createAICar(){
  const car = new AICar(carPolygon)
  car.physicsData.enabled = true;
  car.physicsData.collidesWith = ['road', 'traffic']
  car.style = createCarStyle();
  return car
}