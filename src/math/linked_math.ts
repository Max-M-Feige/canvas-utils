import { Vector2 } from "./vector2";


//Vector2 with callback on changes
export class LinkedVector2 extends Vector2
{
	constructor(x: number, y: number, private _callbackX: (val: number) => void, private _callbackY: (val: number) => void)
	{
		super(x, y);
	}
	
	//Apparently we need our own get/set, not inheriting...
	get x() : number
	{
		return this._x;
	}
	set x(val: number)
	{
		this._x = val;
		this._callbackX(this._x);
	}
	get y() : number
	{
		return this._y;
	}
	set y(val: number)
	{
		this._y = val;
		this._callbackY(this._y);
	}
	public toVector2(): Vector2
	{
		return this;
	}
}