import Vector2 from "./vector2";

export default class Polygon{
  vertices:Array<Vector2>;
  constructor(vertices:Array<Vector2>){
    this.vertices = vertices
  }
}