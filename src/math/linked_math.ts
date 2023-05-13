import { Vector2 } from "./vector2";


//Vector2 with callback on changes
export class LinkedVector2 extends Vector2
{
    constructor(x: number,y:number, private _callbackX: (val: number) => void, private _callbackY: (val: number) => void)
    {
        super(x,y);
    }

    set x(val : number)
    {
        this._x = val;
        this._callbackX(this._x);
    }
    set y(val: number)
    {
        this._y = val;
        this._callbackY(this._y);
    }

    public ToVector2() : Vector2
    {
        return this;
    }
}