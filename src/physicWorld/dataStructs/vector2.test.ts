import Vector2 from "./vector2";
import {describe, expect, it} from "vitest";

describe('vector 2 testing', ()=>{
  it('should be creating a vector 2', ()=>{
    const vector2 = new Vector2(0,0);
    expect(vector2.x).toBe(0)
  })
})