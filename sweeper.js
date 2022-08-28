function BuildField() {
  //clear old game if exists
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
  blockImage.setAttribute("src", "tile_blank.png");
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

  //append images to block <div>
  blocks = document.getElementsByClassName("block");
  for(i=0;i<blocks.length;i++) {
    blocks[i].appendChild(blockImage.cloneNode());
  }

  //choose random blocks to be mines
  var mines = [];
  for(i=0; i<parseInt((cols * rows) / 4.85); i++) {

    //create random position for mine until its unique
    do {
      var mineCol = Math.floor(Math.random() * cols);
      var mineRow = Math.floor(Math.random() * rows);
    } while (CheckDouble(mineCol, mineRow, mines) == false);

    //store position in array
    mines.push({col: mineCol, row: mineRow});

    //set mine image for mines (for debug, will be removed)
    selectedBlock = GetBlock(mines[i].col, mines[i].row);
    selectedBlock.childNodes[0].src = "tile_mine.png";
  }
}

//function to check for double values
function CheckDouble(col, row, array) {
  for(i=0; i<array.length; i++) {
    if (array[i].col == col && array[i].row == row) {
      return false;
    }
  }
  return true;
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
