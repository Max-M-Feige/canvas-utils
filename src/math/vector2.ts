import { MathU } from "./utility";

/**
 * Class representing a 2d vector
 */
export class Vector2
{
	/**
	 * Internal X Coordinate
	 */
	protected _x: number;
	/**
	 * Internal Y Coordinate
	 */
	protected _y: number;
	/**
	 * Create a new Vector2 object
	 * @param {number} x - The X component of the vector
	 * @param {number} y - The Y component of the vector
	 */
	constructor(x: number, y: number) 
	{
		this._x = x;
		this._y = y;
	}
	/**
	 * Get the X component of the vector
	 * @return {number} The X component of the vector
	 */
	get x(): number
	{
		return this._x;
	}
	/**
	 * Set the X component of the vector
	 * @param {number} val - The new X component value
	 */
	set x(val: number)
	{
		this._x = val;
	}
	/**
	 * Get the Y component of the vector
	 * @return {number} The Y component of the vector
	 */
	get y(): number
	{
		return this._y;
	}
	/**
	 * Set the Y component of the vector
	 * @param {number} val - The new Y component value
	 */
	set y(val: number)
	{
		this._y = val;
	}
	add(other: Vector2): Vector2
	{
		return Vector2.Add(this, other);
	}
	/**
	 * Add another vector to this vector
	 * @param {Vector2} other - The other vector
	 * @returns {Vector2} The modified original vector
	 */
	addS(other: Vector2): Vector2
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}
	subtract(other: Vector2): Vector2
	{
		return Vector2.Subtract(this, other);
	}
	/**
	 * Subtract another vector from this vector
	 * @param {Vector2} other - The other vector
	 * @returns {Vector2} The modified original vector
	 */
	subtractS(other: Vector2): Vector2
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}
	multiply(value: number | Vector2): Vector2
	{
		return Vector2.Multiply(this, value);
	}
	/**
	 * Multiply this vector by a scalar or another vector
	 * @param {number | Vector2} value - The scalar or vector to multiply by
	 * @returns {Vector2} The modified original vector
	 */
	multiplyS(value: number | Vector2): Vector2
	{
		if (typeof value === "number")
		{
			this.x *= value;
			this.y *= value;
			return this;
		}
		this.x *= value.x;
		this.y *= value.y;
		return this;
	}
	divide(value: number | Vector2): Vector2
	{
		return Vector2.Divide(this,value);
	}
	/**
	 * Divide this vector by a scalar or another vector
	 * @param {number | Vector2} value - The scalar or vector to divide by
	 * @returns {Vector2} The modified original vector
	 */
	divideS(value: number | Vector2): Vector2
	{
		if (typeof value === "number")
		{
			this.x /= value;
			this.y /= value;
			return this;
		}
		this.x /= value.x;
		this.y /= value.y;
		return this;
	}
	min(other: Vector2): Vector2
	{
		return Vector2.Max(this, other);
	}
	/**
	 * Set the components of this vector to the minimum of their current values and the corresponding values of another vector
	 * @param {Vector2} other - The other vector
	 * @returns {Vector2} The modified original vector
	 */
	minS(other: Vector2): Vector2
	{
		this.x = Math.min(this.x, other.x);
		this.y = Math.min(this.y, other.y);
		return this;
	}
	max(other: Vector2): Vector2
	{
		return Vector2.Max(this, other);
	}
	/**
	 * Set the components of this vector to the maximum of their current values and the corresponding values of another vector
	 * @param {Vector2} other - The other vector
	 * @returns {Vector2} The modified original vector
	 */
	maxS(other: Vector2): Vector2
	{
		this.x = Math.max(this.x, other.x);
		this.y = Math.max(this.y, other.y);
		return this;
	}

	/**
	 * Get the length (magnitude) of this vector
	 * @returns {number} The length of the vector
	 */
	length(): number
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	/**
	 * Get the squared length of this vector
	 * @returns {number} The squared length of the vector
	 */
	lengthSq(): number
	{
		return this.x * this.x + this.y * this.y;
	}
	/**
	 * Calculate the dot product of this vector and another vector
	 * @param {Vector2} other - The other vector
	 * @returns {number} The dot product of the two vectors
	 */
	dot(other: Vector2): number
	{
		return this.x * other.x + this.y * other.y;
	}
	/**
	 * Perpendicularizes the vector
	 * @returns {Vector2} The modified original vector
	 */
	perpendicularizeS(): Vector2
	{
		const tmp = this.x;
		this.x = -this.y;
		this.y = tmp;
		return this;
	}
	perpendicularize(): Vector2
	{
		return new Vector2(-this.y, this.x);
	}
	/**
	 * Calculates the angle between this vector and the x-axis
	 * @returns {number} The angle in radians
	 */
	angle(): number
	{
		//Clever way to get an angle between 0 and 360 with the x axis
		return Math.atan2(-this.y, this.x) + +(this.y > 0) * 2 * Math.PI;
	}
	/**
	 * Calculates the angle between this vector and another vector
	 * @param {Vector2} other - The other vector
	 * @returns {number} The angle in radians
	 */
	angleTo(other: Vector2): number
	{
		const d = Math.sqrt(other.lengthSq() * this.lengthSq());
		if (d === 0) 
		{
			return Math.PI / 2;
		}
		//Floating point errors can cause weird issues

		const theta = MathU.clamp(this.dot(other) / d, -1, 1);

		return Math.acos(theta);
	}
	/**
	 * Calculates the distance from this vector to another vector
	 * @param {Vector2} other - The other vector
	 * @returns {number} The distance
	 */
	distanceTo(other: Vector2): number
	{
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	/**
	 * Calculates the squared distance from this vector to another vector
	 * @param {Vector2} other - The other vector
	 * @returns {number} The squared distance
	 */
	distanceToSquared(other: Vector2): number
	{
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return dx * dx + dy * dy;
	}

	lerp(other: Vector2, t: number): Vector2
	{
		return Vector2.Lerp(this, other, t);
	}
	/**
	 * Performs a linear interpolation between this vector and another vector
	 * @param {Vector2} other - The other vector
	 * @param {number} t - The interpolation factor
	 * @returns {Vector2} The modified original vector
	 */
	lerpS(other: Vector2, t: number): Vector2
	{
		this.x = this.x + (other.x - this.x) * t;
		this.y = this.y + (other.y - this.y) * t;
		return this;
	}
	/**
	 * Creates a copy of this vector
	 * @returns {Vector2} The new vector copy
	 */
	copy(): Vector2
	{
		return new Vector2(this.x, this.y);
	}
	/**
	 * Checks if this vector is equal to another vector within a certain tolerance
	 * @param {Vector2} other - The other vector
	 * @param {number} [tolerance=MathU.DefaultErrorMargin] - The tolerance for the comparison
	 * @returns {boolean} True if the vectors are equal within the tolerance, false otherwise
	 */
	equals(other: Vector2, tolerance: number = MathU.DefaultErrorMargin): boolean
	{
		return (
			Math.abs(this.x - other.x) <= tolerance &&
			Math.abs(this.y - other.y) <= tolerance
		);
	}
	/**
	 * Iterator for the Vector2 class. Allows for the use of the 'for ... of' loop.
	 * @returns {Generator<number>} A Generator yielding the x and y components of the Vector2 instance.
	 */
	*[Symbol.iterator](): Generator<number>
	{
		yield this.x;
		yield this.y;
	}

	/**
	 * Returns the string representation of the Vector2 instance. This method is called by JavaScript 
	 * when converting an object to a string using the built-in `toString` function.
	 * @returns {string} The string representation of the Vector2 instance.
	 */
	get [Symbol.toStringTag](): string
	{
		return this.toString();
	}
	/**
	 * Returns the string representation of the Vector2 instance.
	 * @returns {string} The string representation of the Vector2 instance.
	 */
	toString(): string
	{
		return `(${this._x},${this._y})`;
	}
	/**
	 * Convert number to an array/tuple
	 * @returns The vector as a two number tuple
	 */
	toArray(): [number, number]
	{
		return [this._x, this._y];
	}
	/**
	 * Returns a new Vector2 instance initialized to (0, 0).
	 * @returns {Vector2} A Vector2 instance representing the origin.
	 */
	static get Zero(): Vector2
	{
		return new Vector2(0, 0);
	}
	/**
	 * Returns a new Vector2 instance initialized to (-1, 0).
	 * @returns {Vector2} A Vector2 instance representing left direction.
	 */

	static get Left(): Vector2
	{
		return new Vector2(-1, 0);
	}
	/**
	 * Returns a new Vector2 instance initialized to (1, 0).
	 * @returns {Vector2} A Vector2 instance representing right direction.
	 */
	static get Right(): Vector2
	{
		return new Vector2(1, 0);
	}
	/**
	 * Returns a new Vector2 instance initialized to (0, -1).
	 * @returns {Vector2} A Vector2 instance representing up direction.
	 */
	static get Up(): Vector2
	{
		return new Vector2(0, -1);
	}
	/**
	 * Returns a new Vector2 instance initialized to (0, 1).
	 * @returns {Vector2} A Vector2 instance representing down direction.
	 */
	static get Down(): Vector2
	{
		return new Vector2(0, 1);
	}
	/**
	 * Adds two Vector2 instances together and returns the result as a new Vector2.
	 * @param {Vector2} v1 - The first vector.
	 * @param {Vector2} v2 - The second vector.
	 * @returns {Vector2} A new Vector2 instance representing the sum of the input vectors.
	 */
	static Add(v1: Vector2, v2: Vector2): Vector2
	{
		return new Vector2(v1.x + v2.x, v1.y + v2.y);
	}
	/**
	 * Subtracts the second Vector2 from the first and returns the result as a new Vector2.
	 * @param {Vector2} v1 - The vector to subtract from.
	 * @param {Vector2} v2 - The vector to subtract.
	 * @returns {Vector2} A new Vector2 instance representing the difference of the input vectors.
	 */
	static Subtract(v1: Vector2, v2: Vector2): Vector2
	{
		return new Vector2(v1.x - v2.x, v1.y - v2.y);
	}
	/**
	 * Multiplies a Vector2 by a scalar or another Vector2 and returns the result as a new Vector2.
	 * @param {Vector2} vector - The vector to multiply.
	 * @param {number | Vector2} scalar - The scalar or vector to multiply by.
	 * @returns {Vector2} A new Vector2 instance representing the product of the input vector and scalar.
	 */
	static Multiply(vector: Vector2, scalar: number | Vector2): Vector2
	{
		if (typeof scalar === "number")
		{
			return new Vector2(vector.x * scalar, vector.y * scalar);
		}
		return new Vector2(vector.x * scalar.x, vector.y * scalar.y);
	}
	/**
	 * Divides a Vector2 by a scalar or another Vector2 and returns the result as a new Vector2.
	 * @param {Vector2} vector - The vector to divide.
	 * @param {number | Vector2} scalar - The scalar or vector to divide by.
	 * @returns {Vector2} A new Vector2 instance representing the quotient of the input vector and scalar.
	 */
	static Divide(vector: Vector2, scalar: number | Vector2): Vector2
	{
		if (typeof scalar === "number")
		{
			return new Vector2(vector.x / scalar, vector.y / scalar);
		}
		return new Vector2(vector.x / scalar.x, vector.y / scalar.y);
	}
	/**
	 * Returns a new Vector2 that is the component-wise minimum of the input vectors.
	 * @param {Vector2} v1 - The first vector.
	 * @param {Vector2} v2 - The second vector.
	 * @returns {Vector2} A new Vector2 instance representing the component-wise minimum of the input vectors.
	 */
	static Min(v1: Vector2, v2: Vector2): Vector2
	{
		return new Vector2(Math.min(v1.x, v2.x), Math.min(v1.y, v2.y));
	}
	/**
	 * Returns a new Vector2 that is the component-wise maximum of the input vectors.
	 * @param {Vector2} v1 - The first vector.
	 * @param {Vector2} v2 - The second vector.
	 * @returns {Vector2} A new Vector2 instance representing the component-wise maximum of the input vectors.
	 */
	static Max(v1: Vector2, v2: Vector2): Vector2
	{
		return new Vector2(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y));
	}
	/**
	 * Computes the dot product of two vectors.
	 * @param {Vector2} v1 - The first vector.
	 * @param {Vector2} v2 - The second vector.
	 * @returns {number} The dot product of the input vectors.
	 */
	static Dot(v1: Vector2, v2: Vector2): number
	{
		return v1.x * v2.x + v1.y * v2.y;
	}

	/**
	 * Computes the length (magnitude) of a vector.
	 * @param {Vector2} vector - The vector to compute the length of.
	 * @returns {number} The length of the vector.
	 */
	static Length(vector: Vector2): number
	{
		return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	}
	/**
	 * Computes the squared length of a vector.
	 * @param {Vector2} vector - The vector to compute the squared length of.
	 * @returns {number} The squared length of the vector.
	 */
	static LengthSq(vector: Vector2): number
	{
		return vector.x * vector.x + vector.y * vector.y;
	}
	/**
	 * Computes the angle in radians of a vector relative to the x-axis.
	 * @param {Vector2} vector - The vector to compute the angle of.
	 * @returns {number} The angle of the vector, in radians.
	 */
	static Angle(vector: Vector2): number
	{
		return Math.atan2(-vector.y, vector.x) + +(vector.y > 0) * 2 * Math.PI;
	}
	/**
	 * Computes the angle in radians between two vectors.
	 * @param {Vector2} v1 - The first vector.
	 * @param {Vector2} v2 - The second vector.
	 * @returns {number} The angle between the vectors, in radians.
	 */
	static AngleBetween(v1: Vector2, v2: Vector2): number
	{
		const d = Math.sqrt(v2.lengthSq() * v1.lengthSq());
		if (d === 0) 
		{
			return Math.PI / 2;
		}
		//Floating point errors can cause weird issues

		const theta = MathU.clamp(v1.dot(v2) / d, -1, 1);

		return Math.acos(theta);
	}
	/**
	 * Creates a new vector perpendicular to the input vector
	 * @param {Vector2} v1 - Input vector
	 * @returns {Vector2} The new perpendicular vector
	 */
	static Perpendicular(v1: Vector2): Vector2
	{
		return new Vector2(-v1.y, v1.x);
	}
	static DistanceBetween(v1: Vector2, v2: Vector2): number
	{
		const dx = v1.x - v2.x;
		const dy = v1.y - v2.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	static DistanceBetweenSquared(v1: Vector2, v2: Vector2): number
	{
		const dx = v1.x - v2.x;
		const dy = v1.y - v2.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	/**
	 * Alias for {@link DistanceBetween}
	 * @param v1 source vector
	 * @param v2 goal vector
	 * @returns distance between the two vectors
	*/
	static DistanceTo(v1: Vector2, v2: Vector2): number
	{
		return Vector2.DistanceBetween(v1, v2);
	}
	/**
	 * Alias for {@link DistanceBetweenSquared}
	 * @param v1 source vector
	 * @param v2 goal vector
	 * @returns distance squared between the two vectors
	*/
	static DistanceToSquared(v1: Vector2, v2: Vector2): number
	{
		return Vector2.DistanceBetweenSquared(v1, v2);
	}
	/**
	 * Performs a linear interpolation between two vectors.
	 * @param {Vector2} v1 - The first vector.
	 * @param {Vector2} v2 - The second vector.
	 * @param {number} t - The interpolation factor. 0 will return v1, 1 will return v2.
	 * @returns {Vector2} The interpolated vector.
	 */
	static Lerp(v1: Vector2, v2: Vector2, t: number): Vector2
	{
		return this.Add(v1, this.Subtract(v2, v1).multiplyS(t));
	}
	/**
	 * Generates a random vector within a square of side length 2, centered at the origin.
	 * @returns {Vector2} The generated vector.
	 */
	static RandomSquare(): Vector2
	{
		return new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
	}
	/**
	 * Generates a random vector on the unit circle.
	 * @returns {Vector2} The generated vector.
	 */
	static RandomOnCircle(): Vector2
	{
		const theta = Math.random() * Math.PI * 2;
		return new Vector2(Math.sin(theta), Math.cos(theta));
	}
	/**
	 * Generates a random vector within the unit circle.
	 * @returns {Vector2} The generated vector.
	 */
	static RandomInCircle(): Vector2
	{
		const theta = Math.random() * Math.PI * 2;
		const r = Math.random();
		return new Vector2(r * Math.sin(theta), r * Math.cos(theta));
	}
	/**
	 * Checks if two vectors are equal within a tolerance.
	 * @param {Vector2} v1 - The first vector.
	 * @param {Vector2} v2 - The second vector.
	 * @param {number} [tolerance=MathU.DefaultErrorMargin] - The tolerance for equality.
	 * @returns {boolean} True if the vectors are equal within the tolerance, false otherwise.
	 */
	static Equals(v1: Vector2, v2: Vector2, tolerance: number = MathU.DefaultErrorMargin): boolean
	{
		return v1.equals(v2, tolerance);
	}
	/**
	 * Creates a copy of a vector.
	 * @param {Vector2} v1 - The vector to copy.
	 * @returns {Vector2} A copy of the input vector.
	 */
	static Copy(v1: Vector2): Vector2
	{
		return new Vector2(v1.x, v1.y);
	}
}
