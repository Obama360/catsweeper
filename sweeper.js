//define global variables
var mines = [];
var gameOver;

function BuildField() {
  gameOver = false;

  //clear old game if exists
  mines = [];
  oldGame = document.getElementById("grid");
  if (oldGame != undefined)
    oldGame.remove();

  //getting input
  var cols = document.getElementsByName("columns")[0].value;
  var rows = document.getElementsByName("rows")[0].value;

  //create grid for field
  grid = document.createElement("div");
  grid.setAttribute("id", "grid");
  grid.setAttribute("style", "grid-template: repeat(" + cols + ", 1fr) / repeat(" + rows + ", 1fr)");

  //get game-field <div> and append grid into it
  const field = document.getElementById("game-field");
  field.appendChild(grid);

  //define block element
  block = document.createElement("div");
  block.setAttribute("class", "block");

  //define block-image element
  blockImage = document.createElement("img");
  blockImage.setAttribute("src", "tiles/tile_blank.png");
  blockImage.setAttribute("alt", "Feld");
  blockImage.setAttribute("class", "block-image");

  //build the grid out of blocks
  for(x=0; x<rows; x++) {
    for(y=0; y<cols; y++) {
      block.setAttribute("col", y);
      block.setAttribute("row", x);
      grid.appendChild(block.cloneNode());
    }
  }

  //append images and eventListener to block <div>
  blocks = document.getElementsByClassName("block");
  for(i=0;i<blocks.length;i++) {
    blocks[i].appendChild(blockImage.cloneNode());

    blocks[i].addEventListener("click", function(e){
      HandleBlock(e.currentTarget);
    });
  }

  //choose random blocks to be mines
  for(i=0; i<parseInt((cols * rows) / 4.85); i++) {

    //create random position for mine until its unique
    do {
      var mineCol = Math.floor(Math.random() * cols);
      var mineRow = Math.floor(Math.random() * rows);
    } while (CheckMine(mineCol, mineRow));

    //store position in array
    mines.push({col: mineCol, row: mineRow});
  }
}

//function to check for double values
function CheckMine(col, row) {
  for(i=0; i<mines.length; i++) {
    if (mines[i].col == col && mines[i].row == row) {
      return true;
    }
  }
  return false;
}

//function for getting element by values
function GetBlock(col, row) {
    var allInputs = document.getElementsByClassName("block");
    for(var x=0;x<allInputs.length;x++) {
      if(allInputs[x].getAttribute("col") == col && allInputs[x].getAttribute("row") == row) {
        return allInputs[x];
      }
    }
}

//Handle click on block
function HandleBlock(element) {
  if (!gameOver) {
    if (CheckMine(element.getAttribute("col"), element.getAttribute("row"))) {
      element.childNodes[0].className += " triggered-mine";
      gameOver = true;
      ShowMines();
    } else {
      element.childNodes[0].src = "tiles/numbers/tile_"+CheckNeighbours(element.getAttribute("col"), element.getAttribute("row"))+".png";
    }
  }
}

//Show all mines
function ShowMines() {
  for(i=0;i<mines.length;i++) {
    GetBlock(mines[i].col, mines[i].row).childNodes[0].src = "tiles/tile_mine.png";
  }
}

//Check neighbour mines
function CheckNeighbours(inCol, inRow) {
  var neighbours = 0;

  var col = parseInt(inCol);
  var row = parseInt(inRow);

  //top
  if (CheckMine(col, row+1)) {
    neighbours++;
  }

  //top-right
  if (CheckMine(col+1, row+1)) {
    neighbours++;
  }

  //right
  if (CheckMine(col+1, row)) {
    neighbours++;
  }

  //bottom-right
  if (CheckMine(col+1, row-1)) {
    neighbours++;
  }

  //bottom
  if (CheckMine(col, row-1)) {
    neighbours++;
  }

  //bottom-left
  if (CheckMine(col-1, row-1)) {
    neighbours++;
  }

  //left
  if (CheckMine(col-1, row)) {
    neighbours++;
  }

  //top-left
  if (CheckMine(col-1, row+1)) {
    neighbours++;
  }

  return neighbours;
}

//Disable context menu for game-field
window.onload = function() {
  document.getElementById("game-field").addEventListener("contextmenu", e => e.preventDefault());
}
