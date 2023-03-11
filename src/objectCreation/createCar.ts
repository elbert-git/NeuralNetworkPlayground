import Vector2 from "../physicWorld/dataStructs/vector2";
import { HumanCar, TrafficCar } from "../physicWorld/car/car";
import Polygon from "../physicWorld/dataStructs/polygon";
import carOutlines from "/assets/carOutlines.svg";
import carFill from "/assets/carFill.svg";

export function createCar(){
  const carSize = [55, 110];
  const car = new HumanCar(new Polygon([
    new Vector2(-carSize[0], -carSize[1]),
    new Vector2(carSize[0], -carSize[1]),
    new Vector2(carSize[0], carSize[1]),
    new Vector2(-carSize[0], carSize[1])
  ]))
  car.physicsData.enabled = true;
  car.physicsData.collidesWith = ['road', 'traffic']
  car.style.stroke = false;
  car.style.fill = false;
  car.style.fillStyle = "red"
  car.style.addImage(carFill, carSize[0]*2, carSize[1]*2);
  car.style.addImage(carOutlines, carSize[0]*2, carSize[1]*2);

  return car
}

export function createTrafficCar(){
  const carSize = [55, 110];
  const car = new TrafficCar(new Polygon([
    new Vector2(-carSize[0], -carSize[1]),
    new Vector2(carSize[0], -carSize[1]),
    new Vector2(carSize[0], carSize[1]),
    new Vector2(-carSize[0], carSize[1])
  ]))
  // car.physicsData.enabled = true;
  // car.physicsData.collidesWith = ['road']
  car.carSpeed = 10
  car.physicsData.colliderTag = 'traffic'
  car.style.stroke = false;
  car.style.fill = false;
  car.style.fillStyle = "red"
  car.style.addImage(carFill, carSize[0]*2, carSize[1]*2);
  car.style.addImage(carOutlines, carSize[0]*2, carSize[1]*2);

  return car
}