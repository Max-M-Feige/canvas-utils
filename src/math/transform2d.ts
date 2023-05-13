import { Vector2 } from "./vector2";
import { LinkedVector2 } from "./linked_math";

/**
 * Represents a 2D transform (position, rotation, scale)
 */
export class TransformMatrix2D
{
  private values: number[];
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

  private onSetPositionX(value: number)
  {
    this.values[2] = value;
  }
  private onSetPositionY(value: number)
  {
    this.values[5] = value;
  }
  private updateLinkedPosition()
  {
    this._position.x = this.values[2];
    this._position.y = this.values[5];
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
  private updateLinkedRotation(value: number)
  {
    this._rotation = value;
  }
  private calculateRotation(): number
  {
    return Math.atan2(this.values[1], this.values[0]);
  }
  get rotation(): number
  {
    return this._rotation;
  }
  set rotation(val: number)
  {
    let currentScale = this._scale;

    let sin = Math.sin(val);
    let cos = Math.cos(val);

    this.values[0] = cos * currentScale.x;
    this.values[1] = -sin * currentScale.x;
    this.values[3] = sin * currentScale.y;
    this.values[4] = cos * currentScale.y;

    this.updateLinkedRotation(val);

  }
  //#endregion
  //#region scale
  private calculateScale(): Vector2
  {
    return new Vector2(Math.sqrt(this.values[0] * this.values[0] + this.values[1] * this.values[1]),
      Math.sqrt(this.values[3] * this.values[3] + this.values[4] * this.values[4]));
  }
  private onSetScaleX(x: number)
  {
    let currentX = this._scale.x;
    let currentRotation = this.rotation;
    if (currentX === 0)
    {
      this.values[0] = Math.cos(currentRotation);
      this.values[1] = Math.sin(currentRotation);
      currentX = 1;
    }
    this.values[0] *= x / currentX;
    this.values[1] *= x / currentX;
  }
  private onSetScaleY(y: number)
  {
    let currentY = this._scale.x;
    let currentRotation = this.rotation;
    if (currentY === 0)
    {
      this.values[3] = Math.cos(currentRotation);
      this.values[4] = Math.sin(currentRotation);
      currentY = 1;
    }
    this.values[3] *= y / currentY;
    this.values[4] *= y / currentY;
  }
  get scale(): Vector2
  {
    return this._scale;
  }
  set scale(scale: Vector2)
  {
    let current_scale: Vector2 = this._scale;
    let currentRotation: number = this._rotation;
    //Reset to identity if so
    if (current_scale.x = 0)
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
  }
  //#endregion

  //#region Generation of basic transforms
  /**
 * Create a transformation matrix with a given position.
 * @param pos - The position for the transformation matrix.
 * @returns A new TransformMatrix2D.
 */
  static FromPosition(pos: Vector2)
  {
    return new TransformMatrix2D(1, 0, pos.x, 0, 1, pos.y, 0, 0, 1);
  }
  /**
 * Create a transformation matrix with a given rotation.
 * @param theta - The rotation angle in radians.
 * @returns A new TransformMatrix2D.
 */
  static FromRotation(theta: number)
  {
    let cos = Math.cos(theta);
    let sin = Math.sin(theta);
    return new TransformMatrix2D(cos, -sin, 0, sin, cos, 0, 0, 0, 1);
  }

  /**
   * Create a transformation matrix with a given rotation.
   * @param theta - The rotation angle in degrees.
   * @returns A new TransformMatrix2D.
   */
  static FromRotationDegrees(theta: number)
  {
    return TransformMatrix2D.FromRotation(theta * Math.PI / 180);
  }

  /**
   * Create a transformation matrix with a given scale.
   * @param scale - The scale for the transformation matrix. It can be a number or a Vector2.
   * @returns A new TransformMatrix2D.
   */
  static FromScalar(scale: number | Vector2)
  {
    if (typeof scale === 'number')
    {
      return new TransformMatrix2D(scale, 0, 0, 0, scale, 0, 0, 0, 1);
    }
    return new TransformMatrix2D(scale.x, 0, 0, 0, scale.y, 0, 0, 0, 1);
  }
  //#endregion
  //#region Operations
  /**
 * Apply a transformation matrix to another matrix.
 * @param transform - The transformation matrix to apply.
 * @param subject - The matrix to which the transformation is applied.
 * @returns A new TransformMatrix2D that is the result of the transformation.
 */
  static Apply(transform: TransformMatrix2D, subject: TransformMatrix2D)
  {
    const m1 = transform.values;
    const m2 = subject.values;

    return new TransformMatrix2D(m1[0] * m2[0] + m1[1] * m2[3] + m1[2] * m2[6],
      m1[0] * m2[1] + m1[1] * m2[4] + m1[2] * m2[7],
      m1[0] * m2[2] + m1[1] * m2[5] + m1[2] * m2[8],
      m1[3] * m2[0] + m1[4] * m2[3] + m1[5] * m2[6],
      m1[3] * m2[1] + m1[4] * m2[4] + m1[5] * m2[7],
      m1[3] * m2[2] + m1[4] * m2[5] + m1[5] * m2[8],
      m1[6] * m2[0] + m1[7] * m2[3] + m1[8] * m2[6],
      m1[6] * m2[1] + m1[7] * m2[4] + m1[8] * m2[7],
      m1[6] * m2[2] + m1[7] * m2[5] + m1[8] * m2[8]);
  }
  //#endregion
  
    /**
     * Create an identity transformation matrix.
     * @returns A New identity TransformMatrix2D.
     */
  static Identity()
  {
    return new TransformMatrix2D(1, 0, 0, 0, 1, 0, 0, 0, 1);
  }
  toString(): String
  {
    return `[${this.values[0]},${this.values[1]},${this.values[2]}],
[${this.values[3]},${this.values[4]},${this.values[5]}],
[${this.values[6]},${this.values[7]},${this.values[8]}],`;
  }


}

