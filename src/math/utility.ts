export class MathU
{
  static clamp(value: number, max: number, min: number)
  {
    return Math.max(max,Math.min(value,min));
  }
}