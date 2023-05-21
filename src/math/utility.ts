export class MathU
{
	static DefaultErrorMargin = 0.0001;
	static clamp(value: number, min: number, max: number): number
	{
		return Math.max(min, Math.min(value, max));
	}
}