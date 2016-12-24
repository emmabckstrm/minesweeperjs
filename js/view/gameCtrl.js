var GameCtrl = function(view, model) {

	
	//view.closePopup.click(function(){
		// closes the popup
	//	closePopup();
	//});

	view.startGame.click(function(){
		startGame();

		console.log(view.gameBoard);
	});

	var startGame = function() {
		var rows = 4;
		var cols = 6;

		model.createBoard(rows,cols, function() {
			//console.log(model.board, view);
		});
		view.createDOMBoard(model.board);
		
		view.gameBrick.click(function(){
			openBrick(this);
		});
	};

	var getBrickPosition = function(id) {
		var row = "";
		var col = "";

		row = String(id[2]) + String(id[3]);
		col = String(id[4]) + String(id[5]);

		return [Number(row), Number(col)];
	};

	var openBrick = function(brick) {
		var position = getBrickPosition(brick.id);
		var row = position[0];
		var col = position[1];
		var openedBrick = model.board[row][col];

		if (openedBrick.mine) {
			gameOver();
		} else {
			brick.className += " open";
		}
	};


	var gameOver = function() {
		console.log("You lost");
	};

};