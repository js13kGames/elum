function Game(canvas)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.grid = new Grid();
  this.randomBlockEnabled = true;
  this.nextBlockType = BLOCK_TYPE.EMPTY;
}

Game.prototype.update = function()
{
  this.grid.update();
}

Game.prototype.draw = function()
{
  this.grid.draw(this.context);
}

Game.prototype.start = function()
{
  var self = this;

  self.canvas.addEventListener('click', function(mouseEvent) { self.handleClick(self, mouseEvent) }, false);
  window.addEventListener('keydown', function(keyboardEvent) { self.handleKeyPress(self, keyboardEvent) }, false);

  function loop()
  {
    self.update();
    self.draw();
  }

  window.setInterval(loop, 100);
  loop();

}

Game.prototype.handleClick = function(game, mouseEvent)
{

  var relativeX = mouseEvent.x - game.canvas.offsetLeft;
  var relativeY = mouseEvent.y - game.canvas.offsetTop;

  var gridCoords = game.grid.getGridCoordinates(relativeX, relativeY);

  if(game.grid.canPlaceBlock(gridCoords.x, gridCoords.y)
      && game.grid.hasNeighborBlocks(gridCoords.x, gridCoords.y))
  {
    var nextBlockType = game.getNextBlockType();
    var nextBlock = new Block(nextBlockType);
    grid.placeBlock(gridCoords.x, gridCoords.y, nextBlock);
  }

}

Game.prototype.handleKeyPress = function(game, keyboardEvent)
{
  switch(keyboardEvent.which)
  {
    case 81: // Q
      game.randomBlockEnabled = false;
      game.nextBlockType = BLOCK_TYPE.EARTH;
      break;

    case 87: // W
      game.randomBlockEnabled = false;
      game.nextBlockType = BLOCK_TYPE.WATER;
      break;

    case 69: // E
      game.randomBlockEnabled = false;
      game.nextBlockType = BLOCK_TYPE.WIND;
      break;

    case 82: // R
      game.randomBlockEnabled = false;
      game.nextBlockType = BLOCK_TYPE.FIRE;
      break;

    case 84: // T
      game.randomBlockEnabled = true;
      game.nextBlockType = BLOCK_TYPE.EMPTY;
      break;
  }
}

Game.prototype.getNextBlockType = function() {

  return this.randomBlockEnabled
    ? Math.floor(Math.random() * 4) + 1
    : nextBlockType;
}