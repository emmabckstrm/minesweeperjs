$(function() {
	//We instantiate our model
	var model = new msModel();
	
	//And create the needed controllers and views
	var gameView = new GameView($("#gameView"), model);

	//var overallController;
	//var overallCtrl = new OverallCtrl(authView, currentWeekView, newTaskView, taskPreviewView, overlayView, model)

	var gameCtrl = new GameCtrl(gameView, model);

});