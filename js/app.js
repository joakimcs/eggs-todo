// Event listeners/handlers
document.addEventListener("DOMContentLoaded", function() {

	/**
	 * App initialization
	 */
	eggsTodo.view = new eggsTodo.class.View();
	eggsTodo.storage = new eggsTodo.class.Storage();
	eggsTodo.app = new eggsTodo.class.App();
	eggsTodo.app.loadContent(eggsTodo.storage.getData());

	// eggsTodo.app = new eggsTodo.class.App();
	// Add appropriate listeners on interaction

	/**
	 * Interaction routes
	 */

	/*
	eggsTodo.view.appNode.onclick = function(e) {
		console.log(e.target);

		var part;

		switch (e.target.className) {
			
			// List addition
			case 'listadder' :
				console.log('TODO: Show list name input field');
				break;
			
			// 
			case 'listdescription' :
				console.log('TODO: Hide ' + e.target.id + '. Show input field');
				break;

			case 'checkbox' :
				part = e.target.id.split('_');
				eggsTodo.app.getList(Number(part[1])).getTask(Number(part[2])).done = e.target.checked;
				// console.log('TODO: Change status on list ' + part[1] + ' task ' + part[2] + '.');
				break;

			case 'taskdescription' :
				part = e.target.id.split('_');
				console.log('TODO: Hide ' + e.target.id + '. Show input field');
				break;





		}
	}
	*/

});