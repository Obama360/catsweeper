function BuildField() {
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
  block = document.createElement("img");
  block.setAttribute("src", "https://placekitten.com/128/128");
  block.setAttribute("alt", "Feld");
  block.setAttribute("class", "block");

  //calculate amount of mines
  var cMines = parseInt((cols * rows) / 4.85);
  alert("Amount Mines: " + cMines);

  //build the grid out of blocks
  for(x=0; x<rows; x++) {
    for(y=0; y<cols; y++) {
      block.setAttribute("col", y);
      block.setAttribute("row", x);
      grid.appendChild(block.cloneNode());
    }
  }

  //choose random blocks to be mines
  for(i=0; i<cols*rows; i++) {
    var mineCol = Math.floor(Math.random() * cols+1);
    var mineRow = Math.floor(Math.random() * rows+1);

    selectedBlock = getBlock(mineCol, mineRow);
    selectedBlock.setAttribute("src", "https://esraa-alaarag.github.io/Minesweeper/images/bomb.png");
    grid.appendChild(selectedBlock);
  }
}

//function for getting element by values
function getBlock(col, row)
{
    var allInputs = document.getElementsByTagName("col");
    var results = [];
    for(var x=0;x<allInputs.length;x++)
        if(allInputs[x].col == col && allInputs[x].row == row)
            return allInputs[x];
}
