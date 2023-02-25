import Polygon from "../dataStructs/polygon";
import PhysicsObjects from "../physicsObject";

export default class Car extends PhysicsObjects{
  constructor(polygon:Polygon){
    super(polygon);
  }
}