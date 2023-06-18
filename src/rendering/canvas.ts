import { Transform2D } from "../math/transform2d";
import { Vector2 } from "../math/vector2";

export class CanvasRenderer
{
	
	private ctx: CanvasRenderingContext2D;
	private canvasTransform: Transform2D = Transform2D.Identity;
	private worldTransform: Transform2D = Transform2D.Identity;
	constructor(private canvas: HTMLCanvasElement, private pixelsPerUnit: number = 100)
	{
		const maybeContext = canvas.getContext("2d");
		if(maybeContext === null)
		{
			throw new Error("Could not create 2d context");
		}
		this.ctx = maybeContext;

		this._onCanvasResize();
		window.addEventListener("resize",this._onCanvasResize.bind(this));
	}
	//TODO: Consider storing inverse and multiples or calculating each frame instead of calculating each time we transform

	public tWindowToCanvas(point: Vector2) : Vector2
	{
		return Transform2D.ApplyPoint(this.canvasTransform,point);
	}
	public tWindowToWorld(point: Vector2) : Vector2
	{
		return Transform2D.ApplyPoint(Transform2D.Apply(this.worldTransform,this.canvasTransform),point);
	}
	public tCanvasToWorld(point: Vector2) : Vector2
	{
		return Transform2D.ApplyPoint(this.worldTransform,point);
	}
	public tCanvasToWindow(point: Vector2) : Vector2
	{
		const inverseCanvasTransform = Transform2D.Inverse(this.canvasTransform);
		return inverseCanvasTransform.applyPoint(point);
	}
	public tWorldToCanvas(point: Vector2) : Vector2
	{
		const inverseWorldTransform = Transform2D.Inverse(this.worldTransform);
		return inverseWorldTransform.applyPoint(point);
	}
	public tWorldToWindow(point: Vector2) : Vector2
	{
		const inverseCanvasTransform = Transform2D.Inverse(this.canvasTransform);
		const inverseWorldTransform = Transform2D.Inverse(this.worldTransform);
		return Transform2D.ApplyPoint(Transform2D.Apply(inverseCanvasTransform,inverseWorldTransform),point);
	}


	public drawText(position: Vector2, text: string) : void
	{
		const canvasPosition = this.tWindowToCanvas(position);
		return this.ctx.fillText(text,canvasPosition.x,canvasPosition.y);
	}
	public drawLine(from: Vector2, to: Vector2) : void
	{
		this.ctx.beginPath();
		this.ctx.moveTo(...this.tWorldToCanvas(from).toArray());
		this.ctx.lineTo(...this.tWorldToCanvas(to).toArray());
		this.ctx.stroke();
	}
	public clear() : void
	{
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	}


	private _onCanvasResize() : void
	{
		this.canvasTransform = Transform2D.Identity;
		const rect = this.canvas.getBoundingClientRect();
		this.canvas.width = rect.width;
		this.canvas.height = rect.height;
		this.canvasTransform = Transform2D.FromPosition(new Vector2(-rect.left,-rect.top));
		const worldScale = new Vector2(1/this.pixelsPerUnit ,1/this.pixelsPerUnit);
		this.worldTransform = Transform2D.FromPosition( new Vector2(-rect.width/2,-rect.height/2));
		this.worldTransform.applyS(Transform2D.FromScalar(worldScale));
		console.log(this.canvasTransform.toString());
		console.log(this.worldTransform.toString());

	}
}