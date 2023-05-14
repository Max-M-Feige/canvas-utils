import { LinkedVector2 } from "./linked_math";
import { Vector2 } from "./vector2";

describe("LinkedVector2", () =>
{
	let linkedVector: LinkedVector2;
	let callbackX: jest.Mock;
	let callbackY: jest.Mock;

	beforeEach(() =>
	{
		callbackX = jest.fn();
		callbackY = jest.fn();
		linkedVector = new LinkedVector2(0, 0, callbackX, callbackY);
	});

	afterEach(() =>
	{
		jest.clearAllMocks();
	});

	it("should set x and call the callbackX function", () =>
	{
		linkedVector.x = 5;
		expect(linkedVector.x).toBe(5);
		expect(callbackX).toHaveBeenCalledWith(5);
	});

	it("should set y and call the callbackY function", () =>
	{
		linkedVector.y = 10;
		expect(linkedVector.y).toBe(10);
		expect(callbackY).toHaveBeenCalledWith(10);
	});

	it("should return a Vector2 representation of LinkedVector2", () =>
	{
		const vector2: Vector2 = linkedVector.toVector2();
		expect(vector2).toBeInstanceOf(Vector2);
		expect(vector2.x).toBe(0);
		expect(vector2.y).toBe(0);
	});
});
