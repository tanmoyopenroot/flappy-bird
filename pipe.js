function defPipe() {
  this.x = 500;
  this.y = height - (s_pipeSouth.height + s_fg.height + 120 + 200 * Math.random());
  this.height = s_pipeSouth.height;
  this.width = s_pipeSouth.width;
}

defPipe.prototype.draw = function() {
  s_pipeSouth.draw(this.x, this.y);
  s_pipeNorth.draw(this.x, this.y + 90 + this.height);
};
