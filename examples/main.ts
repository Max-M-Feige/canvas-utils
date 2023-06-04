import { Vector2 } from "../src/math/vector2";
import { CanvasRenderer } from "../src/rendering/canvas";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

if (canvas == null || ctx == null)
{
	throw new Error("Could not create canvas");
}


const renderer = new CanvasRenderer(canvas,100);

const st = new Date();

let mouseX = 0;
let mouseY = 0;

function onMouseMove(event : MouseEvent) : void
{
	mouseX = event.clientX;
	mouseY = event.clientY;
}

window.addEventListener("mousemove", onMouseMove);

function test(num1: number, num2: number) : void
{
	console.log(num1);
	console.log(num2);
}
function update() : void
{
	const ct = new Date().getTime() - st.getTime();

	renderer.clear();

	for(let i = -50; i < 50;i++)
	{
		renderer.drawLine(new Vector2(i,-50), new Vector2(i,50));
		renderer.drawLine(new Vector2(-50,i), new Vector2(50,i));

	}
	const mousePos = new Vector2(mouseX, mouseY);
	ctx.font = "30px Arial";
	ctx.fillText(`Canvas Position : ${new Vector2(canvas.offsetLeft,canvas.offsetTop).toString()}`, 0,30);
	ctx.fillText(`Canvas Size : ${new Vector2(canvas.width,canvas.height).toString()}`, 0,60);
	ctx.fillText(`Window Mouse : ${mousePos.toString()}`,0,90);
	ctx.fillText(`Canvas Mouse : ${renderer.tWindowToCanvas(mousePos).toString()}`,0,120);
	ctx.fillText(`World Mouse : ${renderer.tWindowToWorld(mousePos).toString()}`,0,150);

	requestAnimationFrame(update);
}


update();