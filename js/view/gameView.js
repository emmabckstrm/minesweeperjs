var GameView = function (container, model) {
	this.container = container;

	this.gameBoard = container.find("#gameBoard");
	this.newGame = container.find("#startGame");
	this.gameTile = container.find(".tile");

	model.addObserver(this);

	this.update = function() {
		this.gameTile = container.find(".tile");
	};


	this.createDOMBoard = function(board) {
		var rows = board.length;
		var cols = board[0].length;
		
		// create one row at a time
		for (var r = 0; r < rows; r++) {
			
			var row = document.createElement("div");
			row.className = "row";

			// for each row, create columns accordingly
			for (var c = 0; c < cols; c++) {
				
				var tile = document.createElement("div");
				tile.className = "tile";
				var tileID = "ms";

				if ( r < 10 ) {
					tileID += "0" + String(r);
				} else {
					tileID += String(r);
				}

				if ( c < 10 ) {
					tileID += "0" + String(c);
				} else {
					tileID += String(c);
				}

				tile.id = tileID;
				
				row.appendChild(tile);
			}

			this.gameBoard.append(row);
			this.gameTile = container.find(".tile");
			model.notifyObservers();
		}

	};
};
