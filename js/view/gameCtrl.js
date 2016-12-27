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
		
		view.gameTile.click(function(){
			openTile(this);
		});
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

			if (openedTile.mine) {
				tile.className += " mine";
				tile.innerHTML = "*";
				gameOver();
			} else {
				tile.className += " open";
				if (openedTile.adjacentMines === 0) {
					tile.innerHTML = " ";
				} else {
					tile.className += (" num" + String(openedTile.adjacentMines));
					tile.innerHTML = String(openedTile.adjacentMines);
				}
			}
		}
	};

	var gameOver = function() {
		console.log("You lost");
	};

};