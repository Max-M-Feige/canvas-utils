import { Vector2 } from "./vector2";
import { LinkedVector2 } from "./linked_math";
import { MathU } from "./utility";


export type Matrix3Array = [number, number, number, number, number, number, number, number, number];

//TODO: .equals

/**
 * Represents a 2D transform (position, rotation, scale)
 */
export class Transform2D
{
	private values: Matrix3Array;
	private _position: LinkedVector2;
	private _rotation: number;
	private _scale: LinkedVector2;
	/**
   * Create a TransformMatrix2D.
   * @param m11 - The value for row 1, column 1 of the matrix.
   * @param m12 - The value for row 1, column 2 of the matrix.
   * @param m13 - The value for row 1, column 3 of the matrix.
   * @param m21 - The value for row 2, column 1 of the matrix.
   * @param m22 - The value for row 2, column 2 of the matrix.
   * @param m23 - The value for row 2, column 3 of the matrix.
   * @param m31 - The value for row 3, column 1 of the matrix.
   * @param m32 - The value for row 3, column 2 of the matrix.
   * @param m33 - The value for row 3, column 3 of the matrix.
   */
	constructor(m11: number, m12: number, m13: number,
		m21: number, m22: number, m23: number,
		m31: number, m32: number, m33: number)
	{
		this.values = [m11, m12, m13, m21, m22, m23, m31, m32, m33];
		this._position = new LinkedVector2(this.values[2], this.values[5], this.onSetPositionX.bind(this), this.onSetPositionY.bind(this));
		const calcScale = this.calculateScale();
		this._scale = new LinkedVector2(calcScale.x, calcScale.y, this.onSetScaleX.bind(this), this.onSetScaleY.bind(this));
		this._rotation = this.calculateRotation();
	}




	//#region POSITION

	private onSetPositionX(value: number): void
	{
		this.values[2] = value;
	}
	private onSetPositionY(value: number): void
	{
		this.values[5] = value;
	}
	private updateLinkedPosition(): void
	{
		//Update directly the values there, thus ignoring the set / get methods
		//This way we don't callback recursively.
		this._position["_x"] = this.values[2];
		this._position["_y"] = this.values[5];
	}
	get position(): Vector2
	{
		return this._position;
	}
	set position(pos: Vector2)
	{
		this.values[2] = pos.x;
		this.values[5] = pos.y;

		this.updateLinkedPosition();
	}
	//#endregion
	//#region ROTATION
	//Updates the rotation value.  Called when rotation is changed elsewhere in code
	private updateLinkedRotation(value: number): void
	{
		this._rotation = value;
	}
	private calculateRotation(): number
	{
		return Math.atan2(-this.values[1], this.values[0]);
	}
	get rotation(): number
	{
		return this._rotation;
	}
	set rotation(val: number)
	{
		const currentScale = this._scale;

		//NOTE: Negate val for counter clockwise rotation
		const sin = Math.sin(-val);
		const cos = Math.cos(-val);

		this.values[0] = cos * currentScale.x;
		this.values[1] = sin * currentScale.x;
		this.values[3] = -sin * currentScale.y;
		this.values[4] = cos * currentScale.y;

		this.updateLinkedRotation(val);

	}
	//#endregion
	//#region scale
	//TODO: Consider doing this piecewise for perfo
	private updateLinkedScale(vec: Vector2): void
	{
		this._scale["_x"] = vec.x;
		this._scale["_y"] = vec.y;
	}
	private calculateScale(): Vector2
	{
		return new Vector2(Math.sqrt(this.values[0] * this.values[0] + this.values[1] * this.values[1]),
			Math.sqrt(this.values[3] * this.values[3] + this.values[4] * this.values[4]));
	}
	private onSetScaleX(x: number): void
	{
		let currentX = this._scale.x;
		const currentRotation = this.rotation;
		if (currentX === 0)
		{
			this.values[0] = Math.cos(currentRotation);
			this.values[1] = Math.sin(currentRotation);
			currentX = 1;
		}
		this.values[0] *= x / currentX;
		this.values[1] *= x / currentX;

		this.updateLinkedScale(new Vector2(x, this.scale.y));
	}
	private onSetScaleY(y: number): void
	{
		let currentY = this._scale.x;
		const currentRotation = this.rotation;
		if (currentY === 0)
		{
			this.values[3] = Math.cos(currentRotation);
			this.values[4] = Math.sin(currentRotation);
			currentY = 1;
		}
		this.values[3] *= y / currentY;
		this.values[4] *= y / currentY;

		this.updateLinkedScale(new Vector2(this.scale.x, y));

	}
	get scale(): Vector2
	{
		return this._scale;
	}
	set scale(scale: Vector2)
	{
		const current_scale: Vector2 = this._scale;
		const currentRotation: number = this._rotation;
		//Reset to identity if so
		if (current_scale.x === 0)
		{
			this.values[0] = Math.cos(currentRotation);
			this.values[1] = Math.sin(currentRotation);
			current_scale.x = 1;
		}
		if (current_scale.y === 0)
		{
			this.values[3] = Math.sin(currentRotation);
			this.values[4] = Math.cos(currentRotation);
			current_scale.y = 1;
		}
		this.values[0] *= scale.x / current_scale.x;
		this.values[1] *= scale.x / current_scale.x;
		this.values[3] *= scale.y / current_scale.y;
		this.values[4] *= scale.y / current_scale.y;

		this.updateLinkedScale(scale);
	}
	//#endregion


	//#region Calculations
	public updateAll() : void
	{
		this.updateLinkedPosition();
		this.updateLinkedRotation(this.calculateRotation());
		this.updateLinkedScale(this.calculateScale());
	}
	/**
	Calculates the inverse of this transform.  To invert in place see {@link invert}
	@returns {Transform2D} The inverse of the current transform matrix.
	*/
	public inverse(): Transform2D
	{
		const A: number = this.values[4] * this.values[8] - this.values[5] * this.values[7];
		const B: number = this.values[5] * this.values[6] - this.values[3] * this.values[8];
		const C: number = this.values[3] * this.values[7] - this.values[4] * this.values[6];
		const det = this.values[0] * A + this.values[1] * B + this.values[2] * C;
		if (det === 0)
		{
			return new Transform2D(0, 0, 0, 0, 0, 0, 0, 0, 0);
		}
		const D = this.values[2] * this.values[7] - this.values[1] * this.values[8];
		const E = this.values[0] * this.values[8] - this.values[2] * this.values[6];
		const F = this.values[1] * this.values[6] - this.values[0] * this.values[7];
		const G = this.values[1] * this.values[5] - this.values[2] * this.values[4];
		const H = this.values[2] * this.values[3] - this.values[0] * this.values[5];
		const I = this.values[0] * this.values[4] - this.values[1] * this.values[3];
		//The mnatrix [A,B,C,D,E,F,G,H,I] is the adj matrix
		//We want the transpose
		const detInv = 1 / det;
		return new Transform2D(
			detInv * A, detInv * D, detInv * G,
			detInv * B, detInv * E, detInv * H,
			detInv * C, detInv * F, detInv * I);
	}

	/**
	 * Modifies current transform to be its inverse.  To get inverse without changing source see {@link inverse}
	 * @returns Self
	 */
	public invert(): Transform2D
	{
		const A: number = this.values[4] * this.values[8] - this.values[5] * this.values[7];
		const B: number = this.values[5] * this.values[6] - this.values[3] * this.values[8];
		const C: number = this.values[3] * this.values[7] - this.values[4] * this.values[6];
		const det = this.values[0] * A + this.values[1] * B + this.values[2] * C;
		if (det === 0)
		{
			for(let i = 0;i < this.values.length;i++)
			{
				this.values[i] = 0;
			}
			this.updateAll();
			return this;
		}
		const D = this.values[2] * this.values[7] - this.values[1] * this.values[8];
		const E = this.values[0] * this.values[8] - this.values[2] * this.values[6];
		const F = this.values[1] * this.values[6] - this.values[0] * this.values[7];
		const G = this.values[1] * this.values[5] - this.values[2] * this.values[4];
		const H = this.values[2] * this.values[3] - this.values[0] * this.values[5];
		const I = this.values[0] * this.values[4] - this.values[1] * this.values[3];
		//The mnatrix [A,B,C,D,E,F,G,H,I] is the adj matrix
		//We want the transpose
		const detInv = 1 / det;
		this.values[0] = detInv * A;
		this.values[1] = detInv * D;
		this.values[2] = detInv * G;
		this.values[3] = detInv * B;
		this.values[4] = detInv * E;
		this.values[5] = detInv * H;
		this.values[6] = detInv * C;
		this.values[7] = detInv * F;
		this.values[8] = detInv * I;
		this.updateAll();
		return this;
	}
	/**
	 * Creates a new transform, applying the argument to itself.  Equivalent to
	 * transform * this;
	 * @param transform 
	 * @returns 
	 */
	public apply(transform: Transform2D) : Transform2D
	{
		return Transform2D.Apply(transform,this);
	}
	/**
	 * Modifies the current matrix to be transformed by the given transformation
	 * @param transformation Transformation to apply to self
	 * @returns this
	 */
	public applyS(transform: Transform2D): Transform2D
	{
		const m1 = transform.values;
		const a = m1[0] * this.values[0] + m1[1] * this.values[3] + m1[2] * this.values[6];
		const b = m1[0] * this.values[1] + m1[1] * this.values[4] + m1[2] * this.values[7];
		const c = m1[0] * this.values[2] + m1[1] * this.values[5] + m1[2] * this.values[8];
		const d = m1[3] * this.values[0] + m1[4] * this.values[3] + m1[5] * this.values[6];
		const e = m1[3] * this.values[1] + m1[4] * this.values[4] + m1[5] * this.values[7];
		const f = m1[3] * this.values[2] + m1[4] * this.values[5] + m1[5] * this.values[8];
		const g = m1[6] * this.values[0] + m1[7] * this.values[3] + m1[8] * this.values[6];
		const h = m1[6] * this.values[1] + m1[7] * this.values[4] + m1[8] * this.values[7];
		const i = m1[6] * this.values[2] + m1[7] * this.values[5] + m1[8] * this.values[8];

		this.values[0] = a;
		this.values[1] = b;
		this.values[2] = c;
		this.values[3] = d;
		this.values[4] = e;
		this.values[5] = f;
		this.values[6] = g;
		this.values[7] = h;
		this.values[8] = i;
		this.updateAll();

		return this;
	}
	/**
	 * Apply this transform to a point, essentially getting the points position relative to this transform
	 * @param vector2 point to transform
	 * @returns a new vector2 transformed from the original
	 */
	public applyPoint(vector2: Vector2) : Vector2
	{
		return new Vector2(
			this.values[0]*vector2.x+this.values[1]*vector2.y+this.values[2],
			this.values[3]*vector2.x+this.values[4]*vector2.y+this.values[5]
		);
	}
	/**
	 * 
	 * @param other The transform to compare to
	 * @param {number} [tolerance=MathU.DefaultErrorMargin] - The tolerance for the comparison
	 * @returns {boolean} True if the matrices are completely equal
	 */
	public equals(other: Transform2D, tolerance = MathU.DefaultErrorMargin): boolean
	{
		return this.values.every((val, i) => Math.abs(val - other.values[i]) <= tolerance);
	}

	//#endregion

	//#region Generation of basic transforms
	/**
 * Create a transformation matrix with a given position.
 * @param pos - The position for the transformation matrix.
 * @returns A new TransformMatrix2D.
 */
	static FromPosition(pos: Vector2): Transform2D
	{
		return new Transform2D(1, 0, pos.x, 0, 1, pos.y, 0, 0, 1);
	}

	//TODO: Consider switching constructor/create?

	/**
 * Create a transformation matrix with a given rotation.
 * @param theta - The rotation angle in radians.
 * @returns A new TransformMatrix2D.
 */
	static Create(position: Vector2, rotation: number, scale: Vector2) : Transform2D
	{
		//TODO: consider performance here?
		const transform = Transform2D.Identity;
		transform.position = position;
		transform.rotation = rotation;
		transform.scale = scale;
		return transform;
	}
	static FromRotation(theta: number): Transform2D
	{
		const cos = Math.cos(theta);
		const sin = Math.sin(theta);
		return new Transform2D(cos, -sin, 0, sin, cos, 0, 0, 0, 1);
	}

	/**
   * Create a transformation matrix with a given rotation.
   * @param theta - The rotation angle in degrees.
   * @returns A new TransformMatrix2D.
   */
	static FromRotationDegrees(theta: number): Transform2D
	{
		return Transform2D.FromRotation(theta * Math.PI / 180);
	}

	/**
   * Create a transformation matrix with a given scale.
   * @param scale - The scale for the transformation matrix. It can be a number or a Vector2.
   * @returns A new TransformMatrix2D.
   */
	static FromScalar(scale: number | Vector2): Transform2D
	{
		if (typeof scale === "number")
		{
			return new Transform2D(scale, 0, 0, 0, scale, 0, 0, 0, 1);
		}
		return new Transform2D(scale.x, 0, 0, 0, scale.y, 0, 0, 0, 1);
	}
	//#endregion
	//#region Operations
	/**
 * Apply a transformation matrix to another matrix.  Performs the operation transform * subject
 * @param transform - The transformation matrix to apply.
 * @param subject - The matrix to which the transformation is applied.
 * @returns A new TransformMatrix2D that is the result of the transformation.
 */
	static Apply(transform: Transform2D, subject: Transform2D): Transform2D
	{
		const m1 = transform.values;
		const m2 = subject.values;

		return new Transform2D(
			m1[0] * m2[0] + m1[1] * m2[3] + m1[2] * m2[6],
			m1[0] * m2[1] + m1[1] * m2[4] + m1[2] * m2[7],
			m1[0] * m2[2] + m1[1] * m2[5] + m1[2] * m2[8],
			m1[3] * m2[0] + m1[4] * m2[3] + m1[5] * m2[6],
			m1[3] * m2[1] + m1[4] * m2[4] + m1[5] * m2[7],
			m1[3] * m2[2] + m1[4] * m2[5] + m1[5] * m2[8],
			m1[6] * m2[0] + m1[7] * m2[3] + m1[8] * m2[6],
			m1[6] * m2[1] + m1[7] * m2[4] + m1[8] * m2[7],
			m1[6] * m2[2] + m1[7] * m2[5] + m1[8] * m2[8]);
	}
	/**
	 * Apply a transform matrix to a point, essentially getting the points position relative to the transform
	 * @param transform transform to use 
	 * @param vector2 point to transform
	 * @returns a new vector2 transformed from the original
	 */
	static ApplyPoint(transform: Transform2D, vector2: Vector2) : Vector2
	{
		return new Vector2(
			transform.values[0]*vector2.x+transform.values[1]*vector2.y+transform.values[2],
			transform.values[3]*vector2.x+transform.values[4]*vector2.y+transform.values[5]
		);
	}
	/**

	Calculates the inverse of the given 2D transform matrix.
	@returns {Transform2D} The inverse of the current transform matrix.
	*/
	static Inverse(transform: Transform2D): Transform2D
	{
		return transform.inverse();
	}
	/**
	 * Check if two transform matrices have the same values
	 * @param t1 first transform
	 * @param t2 second transform
	 * @param {number} [tolerance=MathU.DefaultErrorMargin] - The tolerance for the comparison
	 * @returns {boolean} true if matrices exactly match
	 */
	static Equals(t1: Transform2D, t2: Transform2D, tolerance: number = MathU.DefaultErrorMargin): boolean
	{
		return t1.values.every((val, i) => Math.abs(val - t2.values[i]) <= tolerance);
	}
	//#endregion

	/**
	 * Create an identity transformation matrix.
	 * @returns {Transform2D} A New identity TransformMatrix2D.
	 */
	static get Identity(): Transform2D
	{
		return new Transform2D(1, 0, 0, 0, 1, 0, 0, 0, 1);
	}
	/**
	 * Create a 0 transform matrix
	 * @returns {Transform2D} a new zero transform
	 */
	static get Zero(): Transform2D
	{
		return new Transform2D(0, 0, 0, 0, 0, 0, 0, 0, 0);
	}
	/**
	 * 
	 * @returns {string} An array representation of the values of the transform
	 */
	toString(): string
	{
		return `[${this.values[0]},${this.values[1]},${this.values[2]}],
[${this.values[3]},${this.values[4]},${this.values[5]}],
[${this.values[6]},${this.values[7]},${this.values[8]}],`;
	}


}

