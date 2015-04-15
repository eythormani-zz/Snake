console.log('Hello Snake!');
console.log(_ !== undefined ? 'Underscore is loaded' : 'Underscore is undefined');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//start of game
var points = 0;

var gridSize = 5;
var topBar = 20;

var width = Math.floor(canvas.width/gridSize);
var height = Math.floor((canvas.height-topBar)/gridSize);

var snakeTrail = [
	
];
var snakeHead = {
	x: 20,
	y:16,
	direction:'north';
};
var candy = {
	x: 30,
	y: 20
};


//þetta er refrencað fyrir neðan til þess að láta þetta tikka á 60fps
function render(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.beginPath();
	ctx.fillStyle = '#FFF';
	for (var i = snakeTrail.length - 1; i >= 0; i--) {

		var trail = snakeTrail[i];
		// Draw the snaketrail
		ctx.fillRect(
			trail.x * gridSize,
			trail.y * gridSize + topBar,
			gridSize,
			gridSize
		);
	};
	//draw snakeHead
		ctx.fillRect(
			snakeHead.x * gridSize,
			snakeHead.y * gridSize + topBar,
			gridSize,
			gridSize
		);

		//draw snakeFood
		ctx.fillRect(
			candy.x * gridSize,
			candy.y * gridSize + topBar,
			gridSize,
			gridSize
		);

		//draw topbar
		ctx.fillRect(
			0,
			topBar-1,
			canvas.width,
			1
		);

		//write the points
		ctx.fillText('Points: '+points,4,topBar/2+3);
}

function moveSnake(){
	//addstuff to the snaketrail
	/*snakeTrail.push({
		x:snakeHead.x,
		y:snakeHead.y
	});*/

	if (snakeHead.x === candy.x && snakeHead.y === candy.y) {
		snakeTrail.push({
			x: candy.x,
			y: candy.y
		});


		points++;
		//relocate the candy

		candy.x = Math.floor(Math.random()*width);
		candy.y = Math.floor(Math.random()*height);
	};
	//move the head
	if (snakeHead.direction === "north") snakeHead.y -= 1;
	if (snakeHead.direction === "south") snakeHead.y += 1;
	if (snakeHead.direction === "east") snakeHead.x += 1;
	if (snakeHead.direction === "west") snakeHead.x -= 1;


	//loop around the screen
	if (snakeHead.x < 0) {snakeHead.x = width+snakeHead.x};
	if (snakeHead.x > width) {snakeHead.x = snakeHead.x % width};
	if (snakeHead.y < 0) {snakeHead.y = height+snakeHead.y};
	if (snakeHead.y > height) {snakeHead.y = snakeHead.y % height};



}

function getOpposingDirection(dir){
	switch(dir){
		case"north":
			return "south";
			break;
		case"west":
			return "east";
			break;
		case"east":
			return "west";
			break;
		case"south":
			return "north";
			break;	
	}
}
//Snake controller
window.addEventListener('keydown',function(event){
	switch(event.keyCode){
		case 38:// North
			if (snakeHead.direction !==
				getOpposingDirection("north")) {snakeHead.direction = "north"};			
			break;
		case 40:// South
			if (snakeHead.direction !==
				getOpposingDirection("south")) {snakeHead.direction = "south"};
			break;
		case 39:// East
			if (snakeHead.direction !==
				getOpposingDirection("east")) {snakeHead.direction = "east"};
			break;
		case 37:// West
			if (snakeHead.direction !==
				getOpposingDirection("west")) {snakeHead.direction = "west"};
			break;
	}
}, false);

// hér er renderloopan
var renderLoop = setInterval(function(){render();},1000/60);


// Leikjaloopan

var gameLoop = setInterval(function(){
	moveSnake();
}, 1000/10);