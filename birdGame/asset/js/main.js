// Getting canvas ;
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

// Loading images;
var bg = new Image();
var fg = new Image();
var bird = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
bg.src = "asset/img/bg.png";
fg.src = "asset/img/fg.png";
bird.src = "asset/img/bird.png";
pipeNorth.src = "asset/img/pipeNorth.png";
pipeSouth.src = "asset/img/pipeSouth.png";

// Loading Sounds;
var fly = new Audio();
var score = new Audio();
fly.src = "asset/audio/fly.mp3";
score.src = "asset/audio/score.mp3";

// constant Variables;
var gap = 360; // Gap between pipee;
var gravity = 1; // bird gravtiy value;
var pipeGap = pipeNorth.height + gap; // gap btw pipes;
var fgPos = 400; // foreground position;
var bx = 40; // bird x-coordinates;
var by = 250; // bird y-coordinates;
var bw = 34; // bird width;
var bh = 30; // bird height;

// KeyBoard Event Listeners;
document.addEventListener('keydown', birdMoveUp);

// function defination - moveUp;
function birdMoveUp(){
	let key = event.keyCode;
	if(key == 38){
		by -= 20;
	}else if(key == 32){
		// Time Interval interruption;
	}
}

// Creative Pipe Hurdles;
var pipe = [];
pipe[0] = {
	x : canvas.width,
	y : 0
}

 // Draw function
function draw(){
	// background;
	context.drawImage(bg, 0, 0);
	// foreground;
	context.drawImage(fg, 0, fgPos);
	for(let i=0; i< pipe.length; i++)
	{
		//  pipe north;
		context.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
		// pipe south;
		context.drawImage(pipeSouth, pipe[i].x, pipe[i].y+pipeGap);
		pipe[i].x --;
		if(pipe[i].x == 110){
			pipe.push({
				x: canvas.width,
				y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
			});
		}

		// detecting colloision;

		console.log("bx+bird.width = " + (bx+bird.width));
		console.log("pipe[i].y = " + pipe[i].y);
	}
	// bird;
	context.drawImage(bird, bx, by, bw, bh);
	// gravity effect;
	 by += gravity;


	// recursive draw() call; 
	requestAnimationFrame(draw);
}

// draw() function - first call;
draw();