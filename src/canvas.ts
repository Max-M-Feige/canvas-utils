




const lastFrameTime = 0;


const square = {
	x: 0,
	y: 50,
	size: 50,
	speed: 100, // pixels per second
};

function updateCanvas(deltaTime: number) {


}


let prevFrameTime = Date.now();
function canvasLoop()
{
	const now = Date.now();
	const dt = (now-prevFrameTime)/1000;
	prevFrameTime = now;

	updateCanvas(dt);

	requestAnimationFrame(canvasLoop);
}

canvasLoop();