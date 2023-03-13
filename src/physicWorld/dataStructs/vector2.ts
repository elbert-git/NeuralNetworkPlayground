import { deg2Rad } from "../../utilities";

export default class Vector2{
  x:number;
  y:number;
  constructor(x:number, y:number){
    this.x = x;
    this.y = y
  }
  add(vec:Vector2){
    return new Vector2(
      this.x + vec.x,
      this.y + vec.y,
    )
  }

  subtract(vec:Vector2){
    return new Vector2(
      this.x - vec.x,
      this.y - vec.y,
    )
  }
  
  rotate(angle:number){
    return new Vector2(
      (this.x * Math.cos(deg2Rad(angle)))-(this.y*Math.sin(deg2Rad(angle))),
      (this.x * Math.sin(deg2Rad(angle)))+(this.y*Math.cos(deg2Rad(angle))),
    )
  }

  scale(scalar:number){
    return new Vector2(
      this.x*scalar,
      this.y*scalar,
    )
  }
   
  magnitude(){
    return Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2))
  }
}