const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

let lineArray = [];
let lineNumber = 20;

//background gradient --> assign `gradient` to this.color to show effect
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop("0.0", "green");
gradient.addColorStop("1.0", "orange");

//background image --> assign `pattern` to this.color to show effect
const backgroundImage = document.getElementById("backgroundImage");
const pattern = ctx.createPattern(backgroundImage, "no-repeat");

//random color generated --> move to constructor for different color for everyline
let randomColor = "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 50%)";

class Line {
	constructor(canvas) {
		this.x = Math.floor(Math.random() * canvas.width + canvas.width / 2);
		this.y = Math.floor(Math.random() * canvas.height);
		this.history = [{ x: this.x, y: this.y }];
		this.color = pattern;
		this.lineWidth = Math.floor(Math.random() * 15 + 5);
		this.lineLength = Math.random() * 200 - 5;
		this.timer = 0;
		this.speedX = 5;
		this.speedY = 0.5;
	}

	draw(ctx) {
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.lineWidth;
		ctx.beginPath();
		if (this.history[0]) {
			ctx.moveTo(this.history[0].x, this.history[0].y);
		} else {
			ctx.moveTo(this.x, this.y);
		}
		for (i = 0; i < this.history.length; i++) {
			ctx.lineTo(this.history[i].x, this.history[i].y);
		}
		ctx.stroke();
	}

	update() {
		this.timer++;
		this.x -= this.speedX + Math.random() * 30 - 13;
		this.y += this.speedY + Math.random() * 30 - 13;
		if (this.timer < this.lineLength) {
			this.history.push({ x: this.x, y: this.y });
		} else if (
			this.history.length > this.lineLength ||
			this.history.length > 1
		) {
			this.history.shift();
		} else this.restart();
	}

	restart() {
		this.x = Math.floor(Math.random() * canvas.width + canvas.width / 2);
		this.y = Math.floor(Math.random() * canvas.height);
		this.history = [{ x: this.x, y: this.y }];
		this.timer = 0;
	}
}

for (i = 0; i < lineNumber; i++) {
	let line = new Line(canvas);
	lineArray.push(line);
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//backoud color
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	lineArray.forEach((line) => {
		line.draw(ctx);
		line.update();
	});
	requestAnimationFrame(animate);
}
animate();
