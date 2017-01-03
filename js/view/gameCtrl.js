var GameCtrl = function(view, model) {

	view.newGame.click(function(){
		newGame();
	});

	var newGame = function() {
		var rows = 4;
		var cols = 6;

		model.createBoard(rows,cols, function() {
			//console.log(model.board, view);
		});
		view.createDOMBoard(model.board);
		
		// add event listener on game tiles
		var tiles = view.gameTile;

		tiles.click(function(e){
			var position = getTilePosition(this.id);
			var row = position[0];
			var col = position[1];
			openTile(row, col);
		});

		for (var i = 0; i < tiles.length; i++) {

			tiles[i].addEventListener("contextmenu", function(e){
				e.preventDefault();
				flagTile(this);
			}, false);
		}
	};

	var getTilePosition = function(id) {
		var row = "";
		var col = "";

		row = String(id[2]) + String(id[3]);
		col = String(id[4]) + String(id[5]);

		return [Number(row), Number(col)];
	};

	var openTile = function(row, col) {
		
		var openedTile = model.board[row][col];

		if (openedTile.open === false) {

			openedTile.open = true;

			if (openedTile.mine) { // if the opened tile is a mine
				view.openMine(row, col);
				gameOver();
			} else {
				view.openTile(row, col, openedTile.adjacentMines);
				if (openedTile.adjacentMines === 0) { // if it's an empty tile
					// check surrounding and open adjacent empty tiles
					openSurrounding(row,col);
				}
			}
		}
	};

	var flagTile = function(tile) {
		// flags the tile. Can only flag unopened tiles. Deflags flagged tiles
		var position = getTilePosition(tile.id);
		var row = position[0];
		var col = position[1];
		var clickedTile = model.board[row][col];

		if (clickedTile.open === false) {

			if (clickedTile.flagged === false) {
				
				clickedTile.flagged = true;
				view.flagTile(row, col, true);

			} else if (clickedTile.flagged === true) {

				clickedTile.flagged = false;
				view.flagTile(row, col, false);

			}
		}
	};

	var openSurrounding = function(r, c) {
		// gets clicked tile, if it's empty, open it 
		// checks surrounding tiles, if a surrounding tile is empty, check its surrounding

		var surroundingPos = model.getSurroundingPos(r, c);
		var rAround = surroundingPos[0];
		var cAround = surroundingPos[1];

		for (var i = 0; i < rAround.length; i++) {

			var currentRow = r+rAround[i];
			var currentCol = c+cAround[i];
			var currentTile = model.board[currentRow][currentCol];

			if (currentTile.open === false && currentTile.flagged === false && currentTile.mine === false) {

				if (currentTile.adjacentMines === 0) {
					openTile(currentRow,currentCol);
					openSurrounding(currentRow,currentCol);
				} else {
					openTile(currentRow,currentCol);
				}

			}

		}
	};

	var gameOver = function() {
		console.log("You lost");
	};

};