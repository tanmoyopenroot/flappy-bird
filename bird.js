function Bird() {
	this.x = 60;
	this.y = 0;
	this.rotation = 0;
	this.gravity = 0.25;
	this.velocity = 0;
	this.jump = 4.6;
	this.birdFrame = [0, 1, 2, 1];
	this.currentBirdFrame = 0;
	this.width = s_bird[0].width;
	this.height = s_bird[0].height;
}

Bird.prototype.draw = function() {
	push();
	// translate(this.x, this.y);
	rotate(this.rotation);
	// console.log(this.x, this.y);
	s_bird[this.birdFrame[this.currentBirdFrame]].draw(this.x, this.y);
	pop();
};

Bird.prototype.makeJump = function() {
	this.velocity = -this.jump;
};
