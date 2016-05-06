/**
 * Get or create eggsTodo object
 */

var eggsTodo = eggsTodo || {};
eggsTodo.class = {};

/**
 * App class
 * For objects storing app data; id, list_id
 */

eggsTodo.class.App = function (data) {
	
	// If no id provided, create new id
	this.data = data || {};

	// Notify of creation 
	console.log("Created app with data:");
	console.log(this.data);
	
};


/**
 * List class
 * For objects storing task data; id, description, task_ids, date 
 */

eggsTodo.class.List = function (id) {
	
	// If no id provided, create new id
	this.id = id || "list" + Date.now();


};


/**
 * Task class
 * For objects storing task data; id, description, done and date.
 * TODO: Order
 */

eggsTodo.class.Task = function () {

};


/**
 * Librarian class
 * Handles getting and setting todo list data to different storage media
 */

eggsTodo.class.Librarian = function () {

	this.getData = function () {
		return {
			"list1" : {
				"description" : "Første liste",
				"date" : 1462455275,
				"tasks" : {
					"task1" : {
						"description" : "Første oppgave",
						"done" : false,
						"date" : 1462455277
					},
					"task2" : {
						"description" : "Andre oppgave",
						"done" : false,
						"date" : 1462455277
					},
					"task3" : {
						"description" : "Tredje oppgave",
						"done" : false,
						"date" : 1462455277
					}
				}
			},

			"list2" : {
				"description" : "Første liste",
				"date" : 1462455275,
				"tasks" : {
					"task1" : {
						"description" : "Første oppgave",
						"done" : false,
						"date" : 1462455277
					},
					"task2" : {
						"description" : "Andre oppgave",
						"done" : false,
						"date" : 1462455277
					},
					"task3" : {
						"description" : "Tredje oppgave",
						"done" : false,
						"date" : 1462455277
					}
				}
			}
		}; // TODO: Get real data!
	}

};