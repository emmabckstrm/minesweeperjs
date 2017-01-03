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

	this.getViewObj = function(row, col) {
		var tile = this.gameBoard[0].childNodes[row].childNodes[col];
		return tile;
	};

	this.openMine = function(row, col) {
		var tile = this.getViewObj(row, col);
		tile.classList.add("mine");
		tile.innerHTML = "*";
	};

	this.openTile = function(row, col, content) {
		var tile = this.getViewObj(row, col);
		tile.classList.add("open");

		if (content === 0) {
			tile.innerHTML = " ";
		} else {
			tile.classList.add("num" + String(content));
			tile.innerHTML = String(content);
		}
	};

	this.flagTile = function(row, col, f) {
		var tile = this.getViewObj(row, col);

		if (f === true) {
			tile.innerHTML = "F";
		} else {
			tile.innerHTML = "";
		}
	};
};
