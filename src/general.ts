export const CANVAS_STATE_GENERATOR = 0;
export const CANVAS_STATE_INITIATOR = 0;
export const CANVAS_STATE_DISPLAYER = 0;

export enum CanvasEventType
{
    MOUSE_BUTTON,
    MOUSE_MOVE
}

export class CanvasEvent
{
	constructor(public event: CanvasEventType)
	{

	}
}



export class CanvasState
{
	constructor(private updateFunction: (dt: number) => void,private eventHandler: (event: CanvasEvent) =>void)
	{

	}

	handleEvents(events: CanvasEvent[]) : void
	{
		for(const event of events)
		{
			this.eventHandler(event);
		}
	}
	handleUpdate(dt: number) : void
	{
		this.updateFunction(dt);
	}
}

export class Camera
{
	constructor(public x: number, public y: number, public width: number, public height: number)
	{

	}
}


export class CanvasManager
{
	state: CanvasState | null = null;
	private prevFrameStart: number = Date.now();
	private unhandeledEvents: CanvasEvent[] = [];
	camera: Camera;
	ctx: CanvasRenderingContext2D;
	constructor(private canvas: HTMLCanvasElement)
	{
		//Set width and height to actual resolution
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		const maybe_ctx = canvas.getContext("2d");
		if(maybe_ctx === null)
		{
			throw "Could not create context of canvas";
		}
		this.ctx = maybe_ctx;
		this.camera = new Camera(canvas.width/2,canvas.height/2,canvas.width,canvas.height);
	}
	public update() : void
	{
		const deltaTime = Date.now() - this.prevFrameStart;
		if(this.state !== null)
		{
			this.state.handleEvents(this.unhandeledEvents);
			this.state.handleUpdate(deltaTime);
		}
	}
	public addEvent(event: CanvasEvent) : void
	{
		this.unhandeledEvents.push(event);
	}
	public init() : void
	{
		this.canvas.addEventListener("mousedown",(event: MouseEvent) => 
		{
			// this.unhandeledEvents.push(new CanvasMouseE(event,this));
		});
	}

	public windowSpaceToCanvasSpace(x: number, y: number): [number,number]
	{
		const rect = this.canvas.getBoundingClientRect();

		return [x-rect.left,y-rect.top];
	}
	public canvasSpaceToWorldSpace(x: number, y: number, camera: Camera = this.camera): [number,number]
	{
		return [x - this.camera.x, y - this.camera.y];
	}
	public windowSpaceToWorldSpace(x: number, y: number) : [number,number]
	{
		return this.canvasSpaceToWorldSpace(...this.windowSpaceToCanvasSpace(x,y));
	}
	public getCanvasSize() : [number,number]
	{
		return [NaN,NaN];
	}
}

