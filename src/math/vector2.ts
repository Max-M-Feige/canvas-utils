import { MathU } from "./utility";

export class Vector2
{
	private static defaultError = 0.0001;
	protected _x : number;
	protected _y: number;
	constructor( x: number,  y: number) {
		this._x = x;
		this._y = y;
	}

	get x(): number
	{
		return this._x;
	}
	set x(val: number)
	{
		this._x = val;
	}
	get y() : number
	{
		return this._y;
	}
	set y(val: number)
	{
		this._y = val;
	}
	/**
   * Modifies self
   * @param other 
   * @returns same vector
   */
	add(other: Vector2) : Vector2
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}
	static Add(v1: Vector2, v2: Vector2) : Vector2
	{
		return new Vector2(v1.x+v2.x,v1.y+v2.y);
	}
	/**
   * Modifies self
   * @param other 
   * @returns same vector
   */
	subtract(other: Vector2) : Vector2
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}
	static Subtract(v1: Vector2, v2: Vector2): Vector2
	{
		return new Vector2(v1.x - v2.x, v1.y - v2.y);
	}
	/**
   * Modifies self
   * @param other 
   * @returns same vector
   */
	multiply(value: number | Vector2) : Vector2
	{
		if(typeof value === "number")
		{
			this.x *= value;
			this.y *= value;
			return this;
		}
		this.x *= value.x;
		this.y *= value.y;
		return this;
	}
	/**
   * Modifies self
   * @param other 
   * @returns same vector
   */
	divide(value: number | Vector2)  : Vector2
	{
		if(typeof value === "number")
		{
			this.x /= value;
			this.y /= value;
			return this;
		}
		this.x /= value.x;
		this.y /= value.y;
		return this;
	}
	/**
   * Modifies self
   * @param other 
   * @returns same vector
   */
	min(other: Vector2)  : Vector2
	{
		this.x = Math.min(this.x,other.x);
		this.y = Math.min(this.y,other.y);
		return this;
	}
	static Min(v1: Vector2, v2: Vector2)
	{
		return new Vector2(Math.min(v1.x,v2.x),Math.min(v1.y,v2.y));
	}
	/**
   * Modifies self
   * @param other 
   * @returns same vector
   */
	max(other: Vector2) : Vector2
	{
		this.x = Math.max(this.x,other.x);
		this.y = Math.max(this.y,other.y);
		return this;
	}
	static Max(v1: Vector2, v2: Vector2)
	{
		return new Vector2(Math.max(v1.x,v2.x),Math.max(v1.y,v2.y));
	}
	length() : number
	{
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}
	lengthSq() : number
	{
		return this.x*this.x+this.y*this.y;
	}
	dot(other: Vector2) : number
	{
		return this.x*other.x+this.y*other.y;
	}
	static Dot(v1: Vector2, v2: Vector2): number
	{
		return v1.x*v2.x+v1.y*v2.y;
	}
	/**
   * Modifies self
   * @param other 
   * @returns same vector
   */
	perpendicularize() : Vector2
	{
		const tmp = this.x;
		this.x = -this.y;
		this.y = tmp;
		return this;
	}
	static Perpendicular(v1: Vector2) : Vector2
	{
		return new Vector2(-v1.y,v1.x);
	}
	angle() : number
	{
		//Clever way to get an angle between 0 and 360 with the x axis
		return Math.atan2(-this.y,this.x) + +(this.y > 0)*2*Math.PI;
	}
	static AngleBetween(v1: Vector2, v2: Vector2) : number
	{
		const d = Math.sqrt(v1.lengthSq()*v2.lengthSq());
		if(d === 0) 
		{
			return Math.PI/2;
		}
		//Floating point errors can cause weird issues

		const theta = MathU.clamp(Vector2.Dot(v1,v2)/d,1,-1);

		return Math.acos(theta);
	}
	angleTo(other: Vector2) : number
	{
		const d = Math.sqrt(other.lengthSq()*this.lengthSq());
		if(d === 0) 
		{
			return Math.PI/2;
		}
		//Floating point errors can cause weird issues

		const theta = MathU.clamp(this.dot(other)/d,1,-1);

		return Math.acos(theta);
	}
	distanceTo(other: Vector2) : number
	{
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return Math.sqrt(dx*dx+dy*dy);
	}
	distanceToSquared(other: Vector2) : number
	{
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return dx*dx+dy*dy;
	}
	static DistanceBetween(v1: Vector2, v2: Vector2) : number
	{
		const dx = v1.x - v2.x;
		const dy = v1.y - v2.y;
		return dx*dx+dy*dy;
	}
	/**
   * Modifies self
   * @param other 
   * @returns same vector
   */
	lerp(other: Vector2, t: number) : Vector2
	{
		this.x = this.x + (other.x-this.x)*t;
		this.y = this.y + (other.y-this.y)*t;
		return this;
	}
	static Lerp(v1: Vector2, v2: Vector2, t: number)
	{
		return this.Add(v1,this.Subtract(v2,v1).multiply(t));
	}
	static RandomSquare()
	{
		return new Vector2(Math.random(),Math.random());
	}
	static RandomUnit()
	{
		const theta = Math.random()*Math.PI*2;
		return new Vector2(Math.sin(theta),Math.cos(theta));
	}
	static Equals(v1: Vector2, v2: Vector2, errorMargin: number = Vector2.defaultError)
	{
		return v1.equals(v2,errorMargin);
	}
	static Copy(v1: Vector2)
	{
		return new Vector2(v1.x,v1.y);
	}
	equals(other: Vector2, errorMargin: number = Vector2.defaultError)
	{
		return (
			Math.abs(this.x - other.x) <= errorMargin &&
      Math.abs(this.y - other.y) <= errorMargin
		);
	}

	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
	}
	get [Symbol.toStringTag]() : string
	{
		return this.toString();
	}
	toString() : string
	{
		return `(${this._x},${this._y})`;
	}
}
