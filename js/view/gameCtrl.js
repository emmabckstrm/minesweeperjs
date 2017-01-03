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
			openTile(this);
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

	var openTile = function(tile) {
		var position = getTilePosition(tile.id);
		var row = position[0];
		var col = position[1];
		var openedTile = model.board[row][col];

		if (openedTile.open === false) {

			openedTile.open = true;

			if (openedTile.mine) { // if the opened tile is a mine
				tile.className += " mine";
				tile.innerHTML = "*";
				gameOver();
			} else {
				tile.className += " open";
				if (openedTile.adjacentMines === 0) { // if it's an empty tile
					tile.innerHTML = " ";
					// check surrounding and open adjacent empty tiles
				} else {
					tile.className += (" num" + String(openedTile.adjacentMines));
					tile.innerHTML = String(openedTile.adjacentMines);
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
				tile.innerHTML = "F";

			} else if (clickedTile.flagged === true) {

				clickedTile.flagged = false;
				tile.innerHTML = "";

			}
		}
	};

	var openSurrounding = function() {
		// gets clicked tile, if it's empty, open it 
		// checks surrounding tiles, if a surrounding tile is empty, check its surrounding
	};

	var gameOver = function() {
		console.log("You lost");
	};

};