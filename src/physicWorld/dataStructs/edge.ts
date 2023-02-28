import { lerp } from "../../utilities";
import Vector2 from "./vector2";

export default class Edge{
  a:Vector2;
  b:Vector2
  constructor(a:Vector2, b:Vector2){
    this.a = a;
    this.b = b
  }

  getIntersectionWith(edge:Edge):Vector2|null{
    const tTop = (edge.a.x-edge.b.x)*(this.a.y-edge.b.y)-(edge.a.y-edge.b.y)*(this.a.x-edge.b.x);
    const uTop = (edge.b.y-this.a.y)*(this.a.x-this.b.x)-(edge.b.x-this.a.x)*(this.a.y-this.b.y);
    const bottom = (edge.a.y-edge.b.y)*(this.b.x-this.a.x)-(edge.a.x-edge.b.x)*(this.b.y-this.a.y);
     
    if(bottom !== 0){
      const t = tTop/bottom;
      const u = uTop/bottom;
      if(t >= 0 && t <= 1 && u>=0 && u<=1){
        return new Vector2(
          lerp(this.a.x, this.b.x, t),
          lerp(this.a.y, this.b.y, t)
        )
      }else{
        return null
      }
    }else{
      return null
    }
  }

  static getEdges(verts:Array<Vector2>){
    const edges:Array<Edge> = []
    for (let index = 0; index < verts.length - 1; index++) {
      const edge = new Edge(verts[index], verts[index+1]);
      edges.push(edge);
    }
    return edges;
  }
}
