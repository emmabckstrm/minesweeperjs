var GameView = function (container, model) {
	this.container = container;

	this.gameBoard = container.find("#gameBoard");
	this.startGame = container.find("#startGame");
	this.gameBrick = container.find(".brick");

	model.addObserver(this);

	this.update = function() {
		this.gameBrick = container.find(".brick");
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
				
				var brick = document.createElement("div");
				brick.className = "brick";
				var brickID = "ms";

				if ( r < 10 ) {
					brickID += "0" + String(r);
				} else {
					brickID += String(r);
				}

				if ( c < 10 ) {
					brickID += "0" + String(c);
				} else {
					brickID += String(c);
				}

				brick.id = brickID;
				
				row.appendChild(brick);
			}
			console.log(row);

			this.gameBoard.append(row);
			this.gameBrick = container.find(".brick");
			model.notifyObservers();
		}

	};
};
