// Event listeners/handlers
document.addEventListener("DOMContentLoaded", function() {

	/**
	 * App initialization
	 */

	eggsTodo.view    = new eggsTodo.class.View();
	eggsTodo.storage = new eggsTodo.class.Storage();
	eggsTodo.input   = new eggsTodo.class.Input();
	eggsTodo.app     = new eggsTodo.class.App();
	eggsTodo.app.loadContent(eggsTodo.storage.getData());

	// eggsTodo.app = new eggsTodo.class.App();
	// Add appropriate listeners on interaction


	/**
	 * Interaction routes
	 */

	eggsTodo.view.appNode.onclick = function(e) {
		console.log(e.target);

		var part, input;

		switch (e.target.className) {
			
			// List addition
			case 'listadder' :
				eggsTodo.input.showNewListInput();
				break;
			
			// 
			case 'listdescription' :
				eggsTodo.input.showListDescriptionInput(e.target);
				break;

			case 'checkbox' :
				part = e.target.id.split('_');
				eggsTodo.app.getList(Number(part[1])).getTask(Number(part[2])).done = e.target.checked;
				break;

			case 'taskdescription' :
				eggsTodo.input.showTaskDescriptionInput(e.target);
				break;

			case 'taskadder' :
				eggsTodo.input.showNewTaskInput(e.target);
				break;

		}
	}

	eggsTodo.view.appNode.onkeydown = function(e) {
		console.log(e.target);

		switch (e.target.className) {

			case 'listadderinput' :
				if (e.keyCode == 13) {
					var newlist = eggsTodo.app.addList();
					newlist.description = e.target.value;
				}
				break;

			case 'listdescriptioninput' :
				if (e.keyCode == 13) {
					part = e.target.id.split('_');
					eggsTodo.app.getList(Number(part[1])).description = e.target.value;
				}
				break;

			case 'taskdescriptioninput' :
				if (e.keyCode == 13) {
					part = e.target.id.split('_');
					eggsTodo.app.getList(Number(part[1])).getTask(Number(part[2])).description = e.target.value;
				}
				break;

			case 'newtaskinput' :
				if (e.keyCode == 13) {
					part = e.target.id.split('_');
					var newtask = eggsTodo.app.getList(Number(part[1])).addTask();
					console.log('Trying to set ' + newtask);
					newtask.description = e.target.value;
				}
				break;


		}

	}

	eggsTodo.view.appNode.focusout = function(e) {
		console.log(e.target.className);

		switch (e.target.className) {
			case 'listadderinput' :
				part = e.target.id.split('_');
				e.target.parentNode.removeChild(e.target);
				break;
		}

	}

	

});