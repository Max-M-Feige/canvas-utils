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

    HandleEvents(events: CanvasEvent[])
    {
        for(let event of events)
        {
            this.eventHandler(event);
        }
    }
    HandleUpdate(dt: number)
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
    prevFrameStart: number = Date.now();
    unhandeledEvents: CanvasEvent[] = [];
    camera: Camera;
    ctx: CanvasRenderingContext2D;
    constructor(private canvas: HTMLCanvasElement)
    {
        //Set width and height to actual resolution
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let maybe_ctx = canvas.getContext("2d");
        if(maybe_ctx === null)
        {
            throw "Could not create context of canvas";
        }
        this.ctx = maybe_ctx;
        this.camera = new Camera(canvas.width/2,canvas.height/2,canvas.width,canvas.height);
    }
    public update()
    {
        let deltaTime = Date.now() - this.prevFrameStart;
        if(this.state !== null)
        {
            this.state.HandleEvents(this.unhandeledEvents);
            this.state.HandleUpdate(deltaTime);
        }
    }
    public addEvent(event: CanvasEvent)
    {
        this.unhandeledEvents.push(event);
    }
    public init()
    {
        this.canvas.addEventListener("mousedown",(event: MouseEvent) => {
            // this.unhandeledEvents.push(new CanvasMouseE(event,this));
        });
    }

    public WindowSpaceToCanvasSpace(x: number, y: number): [number,number]
    {
        const rect = this.canvas.getBoundingClientRect();

        return [x-rect.left,y-rect.top];
    }
    public CanvasSpaceToWorldSpace(x: number, y: number, camera: Camera = this.camera): [number,number]
    {
        return [x - this.camera.x, y - this.camera.y];
    }
    public WindowSpaceToWorldSpace(x: number, y: number)
    {
        return this.CanvasSpaceToWorldSpace(...this.WindowSpaceToCanvasSpace(x,y));
    }
    public GetCanvasSize() : [number,number]
    {
        return [NaN,NaN]
    }
}