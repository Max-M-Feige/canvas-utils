import { Vector2 } from "./vector2";

describe("Access should work", () =>
{
	const vec: Vector2 = new Vector2(5, 1);
	it("should set x and retrieved it", () =>
	{
		vec.x = 5;
		expect(vec.x).toBe(5);
	});

	it("should set y and call the callbackY function", () =>
	{
		vec.y = 10;
		expect(vec.y).toBe(10);
	});
});


function runVectorTests(testData: TestData[]): void
{
	describe("Vector2", () =>
	{

		testData.forEach((data: TestData, index: number) =>
		{
			describe(`Vector ${index + 1}`, () =>
			{
				let vector1: Vector2;
				let vector2: Vector2;

				beforeEach(() =>
				{
					vector1 = new Vector2(data.vectors.vector1.x, data.vectors.vector1.y);
					vector2 = new Vector2(data.vectors.vector2.x, data.vectors.vector2.y);
				});

				afterEach(() =>
				{
					vector1 = Vector2.Zero;
					vector2 = Vector2.Zero;
				});

				it("should add two vectors", () =>
				{
					vector1.add(vector2);
					expect(vector1.x).toBeCloseTo(data.results.add.x, 5);
					expect(vector1.y).toBeCloseTo(data.results.add.y, 5);
				});

				it("should subtract two vectors", () =>
				{
					vector1.subtract(vector2);

					expect(vector1.x).toBeCloseTo(data.results.subtract.x, 5);
					expect(vector1.y).toBeCloseTo(data.results.subtract.y, 5);
				});

				it("should multiply a vector by a scalar", () =>
				{
					vector1.multiply(data.results.multiply.scalar);

					expect(vector1.x).toBeCloseTo(data.results.multiply.vector.x, 5);
					expect(vector1.y).toBeCloseTo(data.results.multiply.vector.y, 5);
				});

				it("should divide a vector by a scalar", () =>
				{
					vector1.divide(data.results.divide.scalar);

					expect(vector1.x).toBeCloseTo(data.results.divide.vector.x);
					expect(vector1.y).toBeCloseTo(data.results.divide.vector.y);
				});

				it("should calculate the minimum components between two vectors", () =>
				{
					vector1.min(vector2);

					expect(vector1.x).toBe(data.results.min.x);
					expect(vector1.y).toBe(data.results.min.y);
				});

				it("should calculate the maximum components between two vectors", () =>
				{
					vector1.max(vector2);

					expect(vector1.x).toBe(data.results.max.x);
					expect(vector1.y).toBe(data.results.max.y);
				});

				it("should calculate the length of the vector", () =>
				{
					const length = vector1.length();

					expect(length).toBeCloseTo(data.results.length, 3);
				});

				it("should calculate the squared length of the vector", () =>
				{
					const lengthSq = vector1.lengthSq();

					expect(lengthSq).toBeCloseTo(data.results.length_sq, 5);
				});

				it("should calculate the dot product between two vectors", () =>
				{
					const dotProduct = vector1.dot(vector2);

					expect(dotProduct).toBeCloseTo(data.results.dot, 5);
				});

				it("should calculate the perpendicular vector", () =>
				{
					const perpendicularVector = vector1.perpendicularize();

					expect(perpendicularVector.x).toBeCloseTo(data.results.perpendicularize.x, 5);
					expect(perpendicularVector.y).toBeCloseTo(data.results.perpendicularize.y, 5);
				});

				it("should calculate the angle of the vector", () =>
				{
					const angle = vector1.angle();

					expect(angle).toBeCloseTo(data.results.angle, 3);
				});
				it("Should calculate the angle between two vectors", () =>
				{
					const angleBetween = vector1.angleTo(vector2);

					expect(angleBetween).toBeCloseTo(data.results.angle_between, 3);
				});
				it("Should calculate the distance between two vectors", () =>
				{
					const distanceBetween = vector1.distanceTo(vector2);

					expect(distanceBetween).toBeCloseTo(data.results.distance_between, 5);
				});
				it("Should calculate the distance between two vectors", () =>
				{
					const distanceBetween = vector1.distanceTo(vector2);

					expect(distanceBetween).toBeCloseTo(data.results.distance_between, 5);
				});
				it("Should calculate the distance between two vectors", () =>
				{
					const distanceBetween = vector1.distanceToSquared(vector2);

					expect(distanceBetween).toBeCloseTo(data.results.distance_between_squared, 5);
				});
				it("should perform linear interpolation between two vectors", () =>
				{
					const interpolatedVector = vector1.lerp(vector2, data.results.lerp.scalar);

					expect(interpolatedVector.x).toBeCloseTo(data.results.lerp.vector.x, 5);
					expect(interpolatedVector.y).toBeCloseTo(data.results.lerp.vector.y, 5);
				});
				it("should iterate over the vector components", () =>
				{
					const components = [...vector1];

					expect(components.length).toBe(2);
					expect(components[0]).toBe(vector1.x);
					expect(components[1]).toBe(vector1.y);
				});
				it("Should copy", () => 
				{
					const copy = vector1.copy();
					expect(copy.x).toBe(vector1.x);
					expect(copy.y).toBe(vector1.y);
					expect(copy).not.toBe(vector1);
				});
				it("Should create symbol to string tag correctly", () =>
				{
					const result = vector1[Symbol.toStringTag];
					expect(result).toEqual(data.results.custom_string);
				});
				it("Should call toString properly", () =>
				{
					const result = vector1.toString();
					expect(result).toEqual(data.results.custom_string);
				});
				it("Should statically add two vectors", () =>
				{
					const result = Vector2.Add(vector1, vector2);

					expect(result.x).toBeCloseTo(data.results.add.x, 5);
					expect(result.y).toBeCloseTo(data.results.add.y, 5);
				});

				it("Should statically subtract two vectors", () =>
				{
					const result = Vector2.Subtract(vector1, vector2);

					expect(result.x).toBeCloseTo(data.results.subtract.x, 5);
					expect(result.y).toBeCloseTo(data.results.subtract.y, 5);
				});

				it("Should statically multiply a vector by a scalar", () =>
				{
					const result = Vector2.Multiply(vector1, data.results.multiply.scalar);

					expect(result.x).toBeCloseTo(data.results.multiply.vector.x, 5);
					expect(result.y).toBeCloseTo(data.results.multiply.vector.y, 5);
				});

				it("Should statically divide a vector by a scalar", () =>
				{
					const result = Vector2.Divide(vector1, data.results.divide.scalar);

					expect(result.x).toBeCloseTo(data.results.divide.vector.x, 5);
					expect(result.y).toBeCloseTo(data.results.divide.vector.y, 5);
				});

				it("Should statically calculate the minimum components between two vectors", () =>
				{
					const result = Vector2.Min(vector1, vector2);

					expect(result.x).toBe(data.results.min.x);
					expect(result.y).toBe(data.results.min.y);
				});

				it("Should statically calculate the maximum components between two vectors", () =>
				{
					const result = Vector2.Max(vector1, vector2);

					expect(result.x).toBe(data.results.max.x);
					expect(result.y).toBe(data.results.max.y);
				});

				it("Should statically calculate the length of the vector", () =>
				{
					const length = Vector2.Length(vector1);

					expect(length).toBeCloseTo(data.results.length, 3);
				});

				it("Should statically calculate the squared length of the vector", () =>
				{
					const lengthSq = Vector2.LengthSq(vector1);

					expect(lengthSq).toBeCloseTo(data.results.length_sq, 5);
				});

				it("Should statically calculate the dot product between two vectors", () =>
				{
					const dotProduct = Vector2.Dot(vector1, vector2);

					expect(dotProduct).toBeCloseTo(data.results.dot, 5);
				});

				it("Should statically calculate the perpendicular vector", () =>
				{
					const perpendicularVector = Vector2.Perpendicular(vector1);

					expect(perpendicularVector.x).toBeCloseTo(data.results.perpendicularize.x, 5);
					expect(perpendicularVector.y).toBeCloseTo(data.results.perpendicularize.y, 5);
				});

				it("Should statically calculate the angle of the vector", () =>
				{
					const angle = Vector2.Angle(vector1);

					expect(angle).toBeCloseTo(data.results.angle, 3);
				});


				it("Should statically perform linear interpolation between two vectors", () =>
				{
					const interpolatedVector = Vector2.Lerp(vector1, vector2, data.results.lerp.scalar);

					expect(interpolatedVector.x).toBe(data.results.lerp.vector.x);
					expect(interpolatedVector.y).toBe(data.results.lerp.vector.y);
				});

				it("Should statically calculate the angle between two vectors", () =>
				{
					const angleBetween = Vector2.AngleBetween(vector1, vector2);

					expect(angleBetween).toBeCloseTo(data.results.angle_between, 3);
				});
				it("Should statically see DistanceTo as alias of DistanceBetween", () =>
				{
					const distanceBetween = Vector2.DistanceBetween(vector1, vector2);
					const distanceTo = Vector2.DistanceTo(vector1, vector2);
					expect(distanceBetween).toBe(distanceTo);
				});
				it("Should statically calculate the distance between two vectors", () =>
				{
					const distanceBetween = Vector2.DistanceBetween(vector1, vector2);

					expect(distanceBetween).toBeCloseTo(data.results.distance_between, 3);
				});
				it("Should statically see DistanceToSquared as alias of DistanceBetweenSquared", () =>
				{
					const distanceBetween = Vector2.DistanceBetweenSquared(vector1, vector2);
					const distanceTo = Vector2.DistanceToSquared(vector1, vector2);
					expect(distanceBetween).toBe(distanceTo);
				});
				it("Should statically calculate the distance squared between two vectors", () =>
				{
					const distanceBetween = Vector2.DistanceBetweenSquared(vector1, vector2);

					expect(distanceBetween).toBeCloseTo(data.results.distance_between, 3);
				});
				it("Should statically check if two vectors are equal", () =>
				{
					const equalVectors = Vector2.Equals(vector1, vector2);

					expect(equalVectors).toBe(data.results.equals);
				});

				it("Should statically create a copy of a vector", () =>
				{
					const copiedVector = Vector2.Copy(vector1);

					expect(copiedVector.x).toBe(vector1.x);
					expect(copiedVector.y).toBe(vector1.y);
					expect(copiedVector).not.toBe(vector1);
				});

			});
		});
	});


}

interface TestData
{
	vectors:
	{
		vector1: Vector2;
		vector2: Vector2;
	},
	results: {
		add: Vector2;
		subtract: Vector2;
		multiply:
		{
			scalar: number | Vector2,
			vector: Vector2;
		};
		divide:
		{
			scalar: number | Vector2,
			vector: Vector2,
		};
		min: Vector2;
		max: Vector2;
		length: number;
		length_sq: number;
		distance_between: number;
		distance_between_squared: number;
		dot: number;
		perpendicularize: Vector2;
		angle: number;
		angle_between: number;
		lerp:
		{
			scalar: number,
			vector: Vector2,
		};
		equals: boolean,
		custom_string: string;
	};
}
const test_data: TestData[] = [
	{
		vectors: {
			vector1: new Vector2(-1, -2),
			vector2: new Vector2(3, 4)
		},
		results: {
			add: new Vector2(2, 2),
			subtract: new Vector2(-4, -6),
			multiply:
			{
				scalar: new Vector2(0.5, 1.5),
				vector: new Vector2(-0.5, -3)
			},
			divide:
			{
				scalar: new Vector2(4, 0.5),
				vector: new Vector2(-1 / 4, -4)
			},
			min: new Vector2(-1, -2),
			max: new Vector2(3, 4),
			length: Math.sqrt(5),
			length_sq: 5,
			distance_between: 7.21110255093
			,
			distance_between_squared: 52,
			dot: -11,
			perpendicularize: new Vector2(2, -1),
			angle: 2.034443043,
			angle_between: 2.96174,
			lerp:
			{
				scalar: 0.1,
				vector: new Vector2(-0.6, -1.4)
			},
			equals: false,
			custom_string: "(-1,-2)",
		},
	},
	{
		vectors: {
			vector1: new Vector2(1, 2),
			vector2: new Vector2(3, 4)
		},
		results: {
			add: new Vector2(4, 6),
			subtract: new Vector2(-2, -2),
			multiply:
			{
				scalar: 2,
				vector: new Vector2(2, 4)
			},
			divide:
			{
				scalar: 3,
				vector: new Vector2(1 / 3, 2 / 3)
			},
			min: new Vector2(1, 2),
			max: new Vector2(3, 4),
			length: Math.sqrt(5),
			length_sq: 5,
			distance_between: 2.82842712475,
			distance_between_squared: 8,
			dot: 11,
			perpendicularize: new Vector2(-2, 1),
			angle: 5.17603744151,
			angle_between: 0.17985,
			lerp:
			{
				scalar: 0.5,
				vector: new Vector2(2, 3)
			},
			equals: false,
			custom_string: "(1,2)",
		}
	},
	{
		//constructed to be equal
		vectors: {
			vector1: new Vector2(-3, 5),
			vector2: new Vector2(-3, 5)
		},
		results: {
			add: new Vector2(-6, 10),
			subtract: new Vector2(0, 0),
			multiply:
			{
				scalar: 11.11,
				vector: new Vector2(-33.33, 55.55)
			},
			divide:
			{
				scalar: 7.1,
				vector: new Vector2(-3 / 7.1, 5 / 7.1)
			},
			min: new Vector2(-3, 5),
			max: new Vector2(-3, 5),
			length: Math.sqrt(34),
			length_sq: 34,
			distance_between: 0,
			distance_between_squared: 0,
			dot: 34,
			perpendicularize: new Vector2(-5, -3),
			angle: 4.17196523118,
			angle_between: 0,
			lerp:
			{
				scalar: 0.8,
				vector: new Vector2(-3, 5)
			},
			equals: true,
			custom_string: "(-3,5)",
		},
	},
	{
		//constructed for zero vector
		vectors: {
			vector1: new Vector2(0, 0),
			vector2: new Vector2(1.5, -5)
		},
		results: {
			add: new Vector2(1.5, -5),
			subtract: new Vector2(-1.5, 5),
			multiply:
			{
				scalar: new Vector2(2, 0),
				vector: new Vector2(0, 0)
			},
			divide:
			{
				scalar: 0.1,
				vector: new Vector2(0, 0)
			},
			min: new Vector2(0, -5),
			max: new Vector2(1.5, 0),
			length: Math.sqrt(0),
			length_sq: 0,
			distance_between: Math.sqrt(27.25),
			distance_between_squared: 27.25,
			dot: 0,
			perpendicularize: new Vector2(0, 0),
			angle: 0,
			angle_between: Math.PI / 2,
			lerp:
			{
				scalar: 1,
				vector: new Vector2(1.5, -5)
			},
			equals: false,
			custom_string: "(0,0)",
		},
	}
];

runVectorTests(test_data);

describe("Statics should be properly accessed and not the same reference", () =>
{
	it("Should work on the zero vector", () =>
	{
		const zero1 = Vector2.Zero;
		const zero2 = Vector2.Zero;

		expect(zero1.equals(new Vector2(0, 0))).toBe(true);
		expect(zero2.equals(new Vector2(0, 0))).toBe(true);
		expect(zero1).not.toBe(zero2);
	});
	it("Should work on the left vector", () =>
	{
		const left1 = Vector2.Left;
		const left2 = Vector2.Left;

		expect(left1.equals(new Vector2(-1, 0))).toBe(true);
		expect(left2.equals(new Vector2(-1, 0))).toBe(true);
		expect(left1).not.toBe(left2);
	});
	it("Should work on the right vector", () =>
	{
		const right1 = Vector2.Right;
		const right2 = Vector2.Right;

		expect(right1.equals(new Vector2(1, 0))).toBe(true);
		expect(right2.equals(new Vector2(1, 0))).toBe(true);
		expect(right1).not.toBe(right2);
	});
	it("Should work on the down vector", () =>
	{
		const down1 = Vector2.Down;
		const down2 = Vector2.Down;

		expect(down1.equals(new Vector2(0, 1))).toBe(true);
		expect(down2.equals(new Vector2(0, 1))).toBe(true);
		expect(down1).not.toBe(down2);
	});
	it("Should work on the up vector", () =>
	{
		const up1 = Vector2.Up;
		const up2 = Vector2.Up;

		expect(up1.equals(new Vector2(0, -1))).toBe(true);
		expect(up2.equals(new Vector2(0, -1))).toBe(true);
		expect(up1).not.toBe(up2);
	});
});

const NUM_RANDOM_TESTS = 5000;
const sq_vectors: Vector2[] = [];
const on_circ_vectors: Vector2[] = [];
const in_circ_vectors: Vector2[] = [];

for (let i = 0; i < NUM_RANDOM_TESTS; i++)
{
	const sq = Vector2.RandomSquare();
	sq_vectors.push(sq);
	const circ = Vector2.RandomOnCircle();
	on_circ_vectors.push(circ);
	const in_circ = Vector2.RandomInCircle();
	in_circ_vectors.push(in_circ);
}

//TODO: Improve these tests
//Random test kinda weird, should switch to PRNG for reliabilities sake
/*
For now we shold be statistically safe
*/
const TOLERANCE = 0.95;
describe("Random Generation Should Make Sense For Squares", () =>
{
	it("Square should have 0 average", () =>
	{
		const avg: Vector2 = sq_vectors.reduce((accumulator, current) => accumulator.add(current), new Vector2(0, 0));
		avg.divide(NUM_RANDOM_TESTS);
		expect(Math.abs(avg.x)).toBeLessThan(1.0 - TOLERANCE);
		expect(Math.abs(avg.y)).toBeLessThan(1.0 - TOLERANCE);
	});
	it("Should have some with high positive values", () =>
	{
		expect(sq_vectors.some((vec: Vector2) => vec.x >= TOLERANCE)).toBe(true);
		expect(sq_vectors.some((vec: Vector2) => vec.y >= TOLERANCE)).toBe(true);
	});
	it("Should have some with high negative values", () =>
	{
		expect(sq_vectors.some((vec: Vector2) => vec.x <= -TOLERANCE)).toBe(true);
		expect(sq_vectors.some((vec: Vector2) => vec.y <= -TOLERANCE)).toBe(true);
	});
	it("Should have no vectors outside of square", () =>
	{
		expect(sq_vectors.every((vec: Vector2) => (Math.abs(vec.x) <= 1 && Math.abs(vec.y) <= 1)));
	});
});

describe("Random Generation Should Make Sense For On Circles", () =>
{
	it("Square should have 0 average", () =>
	{
		const avg: Vector2 = on_circ_vectors.reduce((accumulator, current) => accumulator.add(current), new Vector2(0, 0));
		avg.divide(NUM_RANDOM_TESTS);
		expect(Math.abs(avg.x)).toBeLessThan(1.0 - TOLERANCE);
		expect(Math.abs(avg.y)).toBeLessThan(1.0 - TOLERANCE);
	});
	it("Should all have magnitude 1", () =>
	{
		expect(on_circ_vectors.every((vec: Vector2) => (1 - vec.lengthSq()) <= (1 - TOLERANCE))).toBe(true);
	});
	it("Should have some with high positive values", () =>
	{
		expect(on_circ_vectors.some((vec: Vector2) => vec.x >= TOLERANCE)).toBe(true);
		expect(on_circ_vectors.some((vec: Vector2) => vec.y >= TOLERANCE)).toBe(true);
	});
	it("Should have some with high negative values", () =>
	{
		expect(on_circ_vectors.some((vec: Vector2) => vec.x <= -TOLERANCE)).toBe(true);
		expect(on_circ_vectors.some((vec: Vector2) => vec.y <= -TOLERANCE)).toBe(true);
	});
});

describe("Random Generation Should Make Sense For In Circles", () =>
{
	it("Square should have 0 average", () =>
	{
		const avg: Vector2 = in_circ_vectors.reduce((accumulator, current) => accumulator.add(current), new Vector2(0, 0));
		avg.divide(NUM_RANDOM_TESTS);
		expect(Math.abs(avg.x)).toBeLessThan(1.0 - TOLERANCE);
		expect(Math.abs(avg.y)).toBeLessThan(1.0 - TOLERANCE);
	});
	it("Should all have magnitude <= 1", () =>
	{
		expect(in_circ_vectors.some((vec: Vector2) => vec.lengthSq() > 1.0)).toBe(false);
	});
	it("Should have some with high positive values", () =>
	{
		expect(in_circ_vectors.some((vec: Vector2) => vec.x >= TOLERANCE)).toBe(true);
		expect(in_circ_vectors.some((vec: Vector2) => vec.y >= TOLERANCE)).toBe(true);
	});
	it("Should have some with high negative values", () =>
	{
		expect(in_circ_vectors.some((vec: Vector2) => vec.x <= -TOLERANCE)).toBe(true);
		expect(in_circ_vectors.some((vec: Vector2) => vec.y <= -TOLERANCE)).toBe(true);
	});
});