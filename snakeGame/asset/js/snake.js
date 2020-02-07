// Selecting Canvas;
const canvas = document.getElementByIdw("snake");
const context = canvas.getContext("2d");

// Creating Box;
const box = 32;

// Creating Score;
let score = 0;	

// Creating Snake;
let snake = [];
snake[0] = {
	x : 9*box, 
	y : 8*box
}

// Creating Food
let food = {
	x : Math.round(Math.random()* 16 + 1) * box,
	y : Math.round(Math.random()* 14 + 3) * box
}

// Loading Images;
const foodImage = new Image();
const background = new Image();
foodImage.src = "asset/img/strawberry.png";
background.src = "asset/img/ground.png";

// Loading Audio; 
const left = new Audio();
const right = new Audio();
const up = new Audio();
const down = new Audio();
const eat = new Audio();
const dead = new Audio();

left.src = "asset/audio/left.mp3";
right.src = "asset/audio/right.mp3"
up.src = "asset/audio/up.mp3";
down.src = "asset/audio/down.mp3";
eat.src = "asset/audio/eat.mp3";
dead.src = "asset/audio/dead.mp3";

// Setting the Keyboard Controls;
let d;

document.addEventListener("keydown", direction);

// Navigating the Snake;
function direction(event){
	let key = event.keyCode;
	// Checking Snake Moment Values;
	if(key == 37 && d != "RIGHT"){
		left.play();
		d = "LEFT";
	}else if(key == 38 && d != "DOWN"){
		up.play();
		d = "UP";
	}else if(key == 39 && d != "LEFT"){
		down.play();
		d = "RIGHT";
	}else if(key == 40 && d != "UP"){
		up.play();
		d = "DOWN";
	}else if(key == 32 || key == 88){
		gameStatus;
	}
}




// // Check pause 
// function pause(){
// 	let pausingGame;
// 	console.log("Pause Method Called!");
// 	var status = false;
// 	console.log(status);
// 	if(status == false){
		
// 		setInterval(sleep(1000), 10);
// 		// setTimeout(draw,10);
// 		status = true;
// 		console.log(status);
// 	}else{
// 		// clearTimeout(pausingGame);

// 		document.addEventListener("keydown", direction);
// 	}
// }


//  function sleep(delay) {
//         var start = new Date().getTime();
//         while (new Date().getTime() < start + delay);
//       }

// Check Collision;
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// Setting up everything on the Canvas;
function draw(){
	// Setting up the background;
	context.drawImage(background, 0 ,0);
	for(let i=0; i<snake.length; i++)
	{
		context.fillStyle = (i == 0) ? "green" : "white";
		context.fillRect(snake[i].x, snake[i].y, box, box);

		context.strokeStyle = "red";
		context.strokeRect(snake[i].x, snake[i].y, box, box);
	}

	// Setting up the food image;
	context.drawImage(foodImage, food.x, food.y);

	//  Snake Old Head Value;
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// console.log("Value of SnakeX : " + snakeX);
	// console.log("Value of SnakeY : " + snakeY);	

	// direction
	if(d == "LEFT"){
		snakeX-= box;
		// console.log("Left : "+ snakeX);
	}else if(d == "RIGHT"){
		snakeX+= box;
		// console.log("Right : "+ snakeX);		
	}else if(d == "UP"){
		snakeY-= box;
		// console.log("Up : "+ snakeY);		
	}else if(d == "DOWN"){
		snakeY+= box;
		// console.log("Down : "+ snakeY);		
	}

	// if snake eats the foods
	if(snakeX == food.x && snakeY == food.y){
		score++;
		eat.play();

		// Creating one more food 
		food = {
			x : Math.round(Math.random()*16 + 1) * box,
			y : Math.round(Math.random()*14 + 3) * box, 
		}
 	}else{

		// Remove the tail
		snake.pop();	
	}
	
	// Creating New Head Snake;
	let newHead = {
		x : snakeX,
		y : snakeY
	}

	// Game Over
	if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)){
		clearInterval(game);
		dead.play();
	}

	snake.unshift(newHead);

	context.fillStyle = "white";
	context.font = "45px georgia";
	context.fillText(score, 2*box, 1.6*box);
}

// Executing Draw();
let game = setInterval(draw, 100);

// Changing Game Status;
// function gameStatus(){
// 	if(key == 32){
// 		var status = false
// 		for(let i=0; i<5; i++){
// 			status = 
// 			if (status == false){
// 				let game = setTimeout("dead.play()", 10000);
// 			}else{
// 				clearTimeout
// 			}
			
// 		}
// 	}
// 	else{
// 		clearTimeout(pause);
// 		clearInterval()
// 	}
// }