import { MathU } from "./utility";

describe("MathU", () =>
{
	describe("clamp", () =>
	{
		it("should return the value itself if it is within the given range", () =>
		{
			expect(MathU.clamp(5, 0, 10)).toBe(5);
			expect(MathU.clamp(-2, -5, 5)).toBe(-2);
			expect(MathU.clamp(0, -10, 10)).toBe(0);
		});

		it("should return the minimum value if the value is less than the minimum", () =>
		{
			expect(MathU.clamp(-7, 0, 10)).toBe(0);
			expect(MathU.clamp(-10, -5, 5)).toBe(-5);
			expect(MathU.clamp(-15, -10, 10)).toBe(-10);
		});

		it("should return the maximum value if the value is greater than the maximum", () =>
		{
			expect(MathU.clamp(15, 0, 10)).toBe(10);
			expect(MathU.clamp(8, -5, 5)).toBe(5);
			expect(MathU.clamp(20, -10, 10)).toBe(10);
		});

		it("should handle floating-point numbers correctly", () =>
		{
			expect(MathU.clamp(3.5, 0, 5)).toBe(3.5);
			expect(MathU.clamp(-1.5, -2.5, 2.5)).toBe(-1.5);
			expect(MathU.clamp(10.2, 5.5, 10.5)).toBe(10.2);
		});

		it("should handle random values", () =>
		{
			const randomValue = Math.floor(Math.random() * 100);
			const randomMin = Math.floor(Math.random() * 100);
			const randomMax = Math.floor(Math.random() * 100);

			expect(MathU.clamp(randomValue, randomMin, randomMax)).toBe(
				Math.max(Math.min(randomValue, randomMax), randomMin)
			);
		});
	});
});
