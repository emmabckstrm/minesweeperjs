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

	

};
