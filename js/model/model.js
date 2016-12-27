var msModel = function() {

	//hard coded for development
	var mineNum = 4;
 
	//list of observers
	this._observers  = [];

	// adds the listener to the list
	this.addObserver = function (observer) {
		this._observers.push(observer);
	};

	// notify the observer
	// calls the update method on all the observers in the list
	this.notifyObservers = function () {
		if ( this._observers.length > 0 ) {
			for (var i = 0; i < this._observers.length; i++) {
				//console.log("Observer:",this._observers[i]);
				this._observers[i].update();
			}
		}
	};

	this.rows = 4;
	this.cols = 6;
	this.board = undefined;

	this.createTile = function() {
		var tile = {
			mine: false,
			open: false,
			adjacentMines: 0,
			flagged: false
		};

		return tile;
	};

	this.createBoard = function(rows, cols, callback) {
		var board = [];

		// create one row at a time
		for (var r = 0; r < rows; r++) {
			var row = [];

			// for each row, create columns accordingly
			for (var c = 0; c < cols; c++) {
				var tile = this.createTile();
				row.push(tile);
			}

			board.push(row);
		}

		this.board = board;
		this.placeMines(this.board, mineNum); // future feature: place mines after first click!
		this.checkSurrounding();
		callback();
	};

	this.placeMines = function(board, mineNum) {
		var totRow = board.length;
		var totCol = board[0].length;

		for (var i = 0; i < mineNum; i++) {

			var tryPlacingMine = true;

			while (tryPlacingMine) {

				var row = this.getRandomInt(0, totRow-1);
				var col = this.getRandomInt(0, totCol-1);

				if (board[row][col].mine === false) {
					board[row][col].mine = true;
					tryPlacingMine = false;
				}

			}
		
		}
	};

	// Returns a random integer between min (included) and max (included)
	// Using Math.round() will give you a non-uniform distribution!
	this.getRandomInt = function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	// counts how many of the adjacent tiles that are mines
	this.countAdjacentMines = function(r, c, rowPos, colPos) {
		var mineCount = 0;

		for (var i = 0; i < rowPos.length; i++) {
			if ( this.board[r+rowPos[i]][c+colPos[i]].mine === true ) {
				mineCount += 1;
			}
		}

		return mineCount;
	};

	this.checkSurrounding = function() {
		var board = this.board;
		var mineCount;
		var rAround;
		var cAround;

		for (var r = 0; r < board.length; r++) {

			for (var c = 0; c < board[0].length; c++) {

				if (r === 0) { // first row
					if (c === 0) {
						rAround = [0, 1, 1];
						cAround = [1, 0, 1];
					} else if (c === board[0].length-1) {
						rAround = [0, 1, 1];
						cAround = [-1, -1, 0];
					} else {
						rAround = [0, 1, 1, 1, 0];
						cAround = [-1, -1, 0, 1, 1];
					}
				} else if (r === board.length-1) { // last row
					if (c === 0) {
						rAround = [-1, -1, 0];
						cAround = [0, 1, 1];
					} else if (c === board[0].length-1) {
						rAround = [0, -1, -1];
						cAround = [-1, -1, 0];
					} else {
						rAround = [0, -1, -1, -1, 0];
						cAround = [-1, -1, 0, 1, 1];
					}
				} else { // the other rows
					if (c === 0) {
						rAround = [-1, -1, 0, 1, 1];
						cAround = [0, 1, 1, 0, 1];
					} else if (c === board[0].length-1) {
						rAround = [-1, -1, 0, 1, 1];
						cAround = [-1, 0, -1, -1, 0];
					} else {
						rAround = [-1, -1, -1, 0, 0, 1, 1, 1];
						cAround = [-1, 0, 1, -1, 1, -1, 0, 1];
					}
				}

				mineCount = this.countAdjacentMines(r, c, rAround, cAround);
				this.board[r][c].adjacentMines = mineCount;
			}

		}
	};
	


};
