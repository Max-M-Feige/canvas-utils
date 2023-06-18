import { Matrix3Array, Transform2D } from "./transform2d";
import { Vector2 } from "./vector2";

describe("TransformMatrix2D", () =>
{

	// Check the Identity matrix
	it("Should generate unique identities", () =>
	{
		const identity1 = Transform2D.Identity;
		expect(identity1.position.x).toBeCloseTo(0, 10);
		expect(identity1.position.y).toBeCloseTo(0, 10);
		expect(identity1.rotation).toBeCloseTo(0, 10);
		expect(identity1.scale.x).toBe(1);
		expect(identity1.scale.y).toBe(1);
		const identity2 = Transform2D.Identity;

		expect(identity1).not.toBe(identity2);
	});

	// Check the FromPosition method
	it("Should generate matrix from position", () =>
	{
		const pos = new Vector2(2, 3);
		const matrix = Transform2D.FromPosition(pos);
		expect(matrix.position.x).toBe(2);
		expect(matrix.position.y).toBe(3);
	});

	// Check the FromRotation method
	it("Should generate matrix from rotation", () =>
	{
		const theta = Math.PI / 4;
		const matrix = Transform2D.FromRotation(theta);
		expect(matrix.rotation).toBeCloseTo(theta);
	});

	// Check the FromRotationDegrees method
	it("Should generate matrix from degree rotation", () =>
	{
		const theta = 45;
		const matrix = Transform2D.FromRotationDegrees(theta);
		expect(matrix.rotation).toBeCloseTo(Math.PI / 4);
	});

	// Check the FromScalar method
	it("Should generate matrix from scalar", () =>
	{
		const scalar = 2;
		const matrix = Transform2D.FromScalar(scalar);
		expect(matrix.scale.x).toBe(scalar);
		expect(matrix.scale.y).toBe(scalar);
	});
	it("Should generate matrix from scaling vector", () =>
	{
		const matrix = Transform2D.FromScalar(new Vector2(1.5, 3));
		expect(matrix.scale.x).toBe(1.5);
		expect(matrix.scale.y).toBe(3);
	});
	// Check the Apply method
	it("Should Statically apply transformations correctly", () =>
	{
		const ROT = -Math.PI / 6;
		const x_expected = 1.866025404;
		const y_expected = 1.232050808;
		const matrixBase = Transform2D.FromPosition(new Vector2(1, 2));
		const matrixRot = Transform2D.FromRotation(ROT);
		let matrixResult = Transform2D.Apply(matrixRot, matrixBase);

		expect(matrixResult.position.x).toBeCloseTo(x_expected);
		expect(matrixResult.position.y).toBeCloseTo(y_expected);
		expect(matrixResult.rotation).toBeCloseTo(ROT);

		const matrixScale = Transform2D.FromScalar(new Vector2(2, 3));
		matrixResult = Transform2D.Apply(matrixScale, matrixResult);
		expect(matrixResult.position.x).toBeCloseTo(x_expected * 2);
		expect(matrixResult.position.y).toBeCloseTo(y_expected * 3);
		expect(matrixResult.rotation).toBeCloseTo(ROT);

	});

	it("Should apply transformations correctly", () =>
	{
		const ROT = -Math.PI / 6;
		const x_expected = 1.866025404;
		const y_expected = 1.232050808;
		const matrix = Transform2D.FromPosition(new Vector2(1, 2));
		const matrixRot = Transform2D.FromRotation(ROT);
		matrix.applyS(matrixRot);

		expect(matrix.position.x).toBeCloseTo(x_expected);
		expect(matrix.position.y).toBeCloseTo(y_expected);
		expect(matrix.rotation).toBeCloseTo(ROT);

		const matrixScale = Transform2D.FromScalar(new Vector2(2, 3));
		matrix.applyS(matrixScale);
		expect(matrix.position.x).toBeCloseTo(x_expected * 2);
		expect(matrix.position.y).toBeCloseTo(y_expected * 3);
		expect(matrix.rotation).toBeCloseTo(ROT);

	});

	it("Should calculate inverse correctly", () =>
	{
		const ROT = -Math.PI / 6;
		const matrix = Transform2D.FromPosition(new Vector2(1, 2));
		const matrixRot = Transform2D.FromRotation(ROT);
		matrix.applyS(matrixRot);
		const matrixScale = Transform2D.FromScalar(new Vector2(2, 3));
		matrix.applyS(matrixScale);
		const expectedValues: Matrix3Array = [
			0.4330, -0.1667, -1.000,
			0.2500, 0.2887, -2.000,
			0.000, 0.000, 1.000];
		const expectedMatrix = new Transform2D(...expectedValues);
		const inverseMatrix = matrix.inverse();
		expect(inverseMatrix.position.x).toBeCloseTo(expectedMatrix.position.x);
		expect(inverseMatrix.position.y).toBeCloseTo(expectedMatrix.position.y);
		expect(inverseMatrix.scale.x).toBeCloseTo(expectedMatrix.scale.x);
		expect(inverseMatrix.scale.y).toBeCloseTo(expectedMatrix.scale.y);
		expect(inverseMatrix.rotation).toBeCloseTo(expectedMatrix.rotation);

	});

	it("Should invert correctly", () =>
	{
		const ROT = -Math.PI / 6;
		const matrix = Transform2D.FromPosition(new Vector2(1, 2));
		const matrixRot = Transform2D.FromRotation(ROT);
		matrix.applyS(matrixRot);
		const matrixScale = Transform2D.FromScalar(new Vector2(2, 3));
		matrix.applyS(matrixScale);
		const expectedValues: Matrix3Array = [
			0.4330, -0.1667, -1.000,
			0.2500, 0.2887, -2.000,
			0.000, 0.000, 1.000];
		const expectedMatrix = new Transform2D(...expectedValues);
		matrix.invert();
		expect(matrix.position.x).toBeCloseTo(expectedMatrix.position.x);
		expect(matrix.position.y).toBeCloseTo(expectedMatrix.position.y);
		expect(matrix.scale.x).toBeCloseTo(expectedMatrix.scale.x);
		expect(matrix.scale.y).toBeCloseTo(expectedMatrix.scale.y);
		expect(matrix.rotation).toBeCloseTo(expectedMatrix.rotation);

	});
	it("Should invert to 0 on invalid matrix correctly", () =>
	{
		const matrix = new Transform2D(1,2,3,4,5,6,7,8,9);
		const expectedMatrix = Transform2D.Zero;
		matrix.invert();
		expect(matrix.position.x).toBeCloseTo(expectedMatrix.position.x);
		expect(matrix.position.y).toBeCloseTo(expectedMatrix.position.y);
		expect(matrix.scale.x).toBeCloseTo(expectedMatrix.scale.x);
		expect(matrix.scale.y).toBeCloseTo(expectedMatrix.scale.y);
		expect(matrix.rotation).toBeCloseTo(expectedMatrix.rotation);

	});
	it("Should be equal to same", () =>
	{
		const transform = Transform2D.Identity;
		transform.rotation = Math.PI / 2;
		transform.scale = new Vector2(4, 5);
		transform.position = new Vector2(2, 3);
		expect(transform.equals(transform)).toBe(true);
	});
	it("Should result in identity when inverse applied to self", () =>
	{
		const transform = Transform2D.Identity;
		transform.rotation = Math.PI / 2;
		transform.scale = new Vector2(4, 5);
		transform.position = new Vector2(2, 3);
		const calculatedIdentity = Transform2D.Apply(transform.inverse(), transform);
		expect(calculatedIdentity.equals(Transform2D.Identity)).toBe(true);

	});

	it("Should return 0 on inverse of bad matrix", () =>
	{
		const transform = new Transform2D(1, 2, 3, 4, 5, 6, 7, 8, 9).inverse();
		const zero = Transform2D.Zero;
		expect(transform.position.x).toBeCloseTo(zero.position.x);
		expect(transform.position.y).toBeCloseTo(zero.position.y);
		expect(transform.scale.x).toBeCloseTo(zero.scale.x);
		expect(transform.scale.y).toBeCloseTo(zero.scale.y);
		expect(transform.rotation).toBeCloseTo(zero.rotation);

	});
	it("Should statically calculate inverse correctly", () =>
	{
		const ROT = -Math.PI / 6;
		const matrix = Transform2D.FromPosition(new Vector2(1, 2));
		const matrixRot = Transform2D.FromRotation(ROT);
		matrix.applyS(matrixRot);
		const matrixScale = Transform2D.FromScalar(new Vector2(2, 3));
		matrix.applyS(matrixScale);
		const expectedValues: Matrix3Array = [
			0.4330, -0.1667, -1.000,
			0.2500, 0.2887, -2.000,
			0.000, 0.000, 1.000];
		const expectedMatrix = new Transform2D(...expectedValues);
		const inverseMatrix = matrix.inverse();
		expect(inverseMatrix.position.x).toBeCloseTo(expectedMatrix.position.x);
		expect(inverseMatrix.position.y).toBeCloseTo(expectedMatrix.position.y);
		expect(inverseMatrix.scale.x).toBeCloseTo(expectedMatrix.scale.x);
		expect(inverseMatrix.scale.y).toBeCloseTo(expectedMatrix.scale.y);
		expect(inverseMatrix.rotation).toBeCloseTo(expectedMatrix.rotation);
	});
	it("Should Statically be equal to same", () =>
	{
		const transform = Transform2D.Identity;
		transform.rotation = Math.PI / 2;
		transform.scale = new Vector2(4, 5);
		transform.position = new Vector2(2, 3);
		expect(Transform2D.Equals(transform,transform)).toBe(true);
	});
	it("Should Statically return 0 on inverse of bad matrix", () =>
	{
		const transform = Transform2D.Inverse(new Transform2D(1, 2, 3, 4, 5, 6, 7, 8, 9));
		const zero = Transform2D.Zero;
		expect(transform.position.x).toBeCloseTo(zero.position.x);
		expect(transform.position.y).toBeCloseTo(zero.position.y);
		expect(transform.scale.x).toBeCloseTo(zero.scale.x);
		expect(transform.scale.y).toBeCloseTo(zero.scale.y);
		expect(transform.rotation).toBeCloseTo(zero.rotation);

	});
	// Check the set position, rotation and scale methods
	it("Should set vector values correctly", () =>
	{
		const matrix = Transform2D.Identity;
		matrix.position = new Vector2(3, 4);
		matrix.rotation = Math.PI / 2;
		matrix.scale = new Vector2(2, 3);

		expect(matrix.position.x).toBe(3);
		expect(matrix.position.y).toBe(4);
		expect(matrix.rotation).toBeCloseTo(Math.PI / 2);
		expect(matrix.scale.x).toBe(2);
		expect(matrix.scale.y).toBe(3);
	});
	it("Should set vector values from 0 correctly", () =>
	{
		const matrix = Transform2D.Identity;
		matrix.scale = new Vector2(0, 0);

		const rot = Math.PI / 8;
		matrix.rotation = rot;
		expect(matrix.scale.x).toBe(0);
		expect(matrix.scale.y).toBe(0);
		expect(matrix.rotation).toBe(rot);
		matrix.scale = new Vector2(3, 4);
		expect(matrix.scale.x).toBe(3);
		expect(matrix.scale.y).toBe(4);
		expect(matrix.rotation).toBe(rot);


	});
	it("Should set vector values components correctly", () =>
	{
		const matrix = Transform2D.Identity;
		matrix.position.x = 3;
		matrix.position.y = 4;
		matrix.scale.x = 2;
		matrix.scale.y = 3;

		expect(matrix.position.x).toBe(3);
		expect(matrix.position.y).toBe(4);
		expect(matrix.scale.x).toBe(2);
		expect(matrix.scale.y).toBe(3);
	});
	it("Should set vector values components from 0 correctly", () =>
	{
		const matrix = Transform2D.Identity;
		matrix.scale.x = 0;
		matrix.scale.y = 0;

		const rot = Math.PI / 8;
		matrix.rotation = rot;
		expect(matrix.scale.x).toBe(0);
		expect(matrix.scale.y).toBe(0);
		expect(matrix.rotation).toBe(rot);
		matrix.scale.x = 3;
		matrix.scale.y = 4;
		expect(matrix.scale.x).toBe(3);
		expect(matrix.scale.y).toBe(4);
		expect(matrix.rotation).toBe(rot);


	});

	// Check the toString method
	it("Should convert to string properly", () =>
	{
		const matrix = Transform2D.FromPosition(new Vector2(1, 2));
		const str = matrix.toString();
		expect(str).toBe("[1,0,1],\n[0,1,2],\n[0,0,1],");
	});

});
