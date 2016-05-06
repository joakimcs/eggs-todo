// Event listeners/handlers
document.addEventListener("DOMContentLoaded", function() {

	// Recreate todo list from web storage, if present
	eggsTodo.storage = new eggsTodo.class.Storage();
	
	// eggsTodo.app = new eggsTodo.class.App(eggsTodo.storage.getData());


	// Make librarian check if local copy of todo list
	eggsTodo.view = new eggsTodo.class.View();
	

	// Add appropriate listeners on interaction

});