export class MathU
{
	constructor()
	{

	}
	static clamp(value: number, max: number, min: number)
	{
		return Math.max(max,Math.min(value,min));
	}
	nonstatic() : number
	{
		return 3;
	}
}

const m = new MathU();


console.log(m.nonstatic());