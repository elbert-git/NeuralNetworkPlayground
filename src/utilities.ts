export function deg2Rad(deg:number){
	return deg * (Math.PI/180)
}

export function rad2Deg(rad:number){
	return rad * (180/Math.PI)
}

export function lerp(a:number, b:number, t:number){
	return a + t * ( b - a );
}

export function createRandomWeight(randomFactor=1){
	return ((Math.random()*2)-1) * randomFactor
}