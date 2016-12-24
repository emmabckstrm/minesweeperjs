var msModel = function() {

	//hard coded for development
	var mineNum = 8;
 
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

	this.createBrick = function() {
		var brick = {
			mine: false,
			open: false,
			minesSurrounding: 0
		};

		return brick;
	};

	this.createBoard = function(rows, cols, callback) {
		var board = [];

		// create one row at a time
		for (var r = 0; r < rows; r++) {
			var row = [];

			// for each row, create columns accordingly
			for (var c = 0; c < cols; c++) {
				var brick = this.createBrick();
				row.push(brick);
			}

			board.push(row);
		}

		this.board = board;
		this.placeMines(this.board, mineNum);
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

				if (board[row][col].mine == false) {
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
	


};
