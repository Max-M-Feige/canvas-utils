import { CanvasEvent, CanvasEventType, CanvasManager } from "./general";

enum MouseButton
{
    LEFT = 0 ,
    MIDDLE = 1,
    RIGHT = 2
}

class CanvasMouseEvent extends CanvasEvent
{

    // public x: number;
    // public y: number;
    // public inCanvas: boolean;
    // constructor( type: CanvasEventType, rawEvent: MouseEvent, canvas: CanvasManager)
    //     {
    //         super(CanvasEventType.MOUSE_BUTTON);
    //         let [canvasX,canvasY] = canvas.WindowSpaceToCanvasSpace(rawEvent.clientX,rawEvent.clientY);
    //         this.inCanvas = (canvasX >=0 && canvasY>=0 && mouseX <= )
    //     }
}
class CanvasMouseButtonEvent extends CanvasMouseEvent
{
    // button: MouseButton;
    // pressed: boolean;
    // constructor(rawEvent: MouseEvent, canvas: CanvasManager, pressed: boolean)
    // {
    //     super(CanvasEventType.MOUSE_BUTTON,rawEvent,canvas);
    //     this.button = rawEvent.button;
    //     this.pressed = pressed;
    // }
}