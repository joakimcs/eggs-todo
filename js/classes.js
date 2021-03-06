/**
 * Get or create eggsTodo object
 */

var eggsTodo = eggsTodo || {};
eggsTodo.class = eggsTodo.class || {};


/**
 * App class
 * For objects storing app data; list_id
 */

eggsTodo.class.App = function (appObject) {
	
	
	/**
	 * Properties/Constructor
	 */

	this.lists = [];


	/**
	 * Methods
	 */

	this.loadContent = function (appObject) {
		this.lists = [];
		for (var i = 0, len = appObject.length; i < len; i++) {
			this.lists.push(new eggsTodo.class.List(appObject[i]));
		}
		eggsTodo.view.renderApp(this);
	}

	this.addList = function (listObject) {
		
		// If no listObject passed, create one
		if (listObject === undefined) {
			var listObject = new eggsTodo.class.List();
		}
		this.lists.unshift(listObject);
		eggsTodo.view.renderApp();
		eggsTodo.storage.storeData(eggsTodo.app);
		return listObject;
	}

	this.getList = function (listId) {
		for (var i = 0, len = this.lists.length; i < len; i++) {
			if (this.lists[i].id === listId) {
				return this.lists[i];
			}
		}
	}

	this.removeList = function (listId) {
		for (var i = 0, len = this.lists.length; i < len; i++) {
		    console.log(this.lists[i].id + ' - ' + listId);
		    if (this.lists[i].id === listId) {
		    	var deletedList = this.lists.splice(i, 1);
		    	eggsTodo.view.renderApp();
		    	eggsTodo.storage.storeData(eggsTodo.app);
		     	return deletedList;
		    }
		}
		return false;
	}

	this.getLists = function () { // Needed?
		return this.lists;
	}
};


/**
 * List class
 * For objects storing task data; id, description, task_ids, date 
 */

eggsTodo.class.List = function (listObject) {
	
	/**
	 * Propertise 
	 * ES5 Getters and setters
	 */

	Object.defineProperties(this, {
        "id": {
        	"get": function() { 
				return this._id;
			},
			"set": function(value) { 
				return false;
			}
        },
        "description": {
			"get": function() { 
				return this._description;
			},
			"set": function(value) { 
				this._description = value;
				eggsTodo.view.renderList(this.id);
				eggsTodo.storage.storeData(eggsTodo.app);
			}
        }
    });

	
	/**
	 * Constructor
	 */
	
	// Create new ...
	if (listObject == undefined) {
		this.tasks = [];
		this._id = Date.now();
		this._description = "";
	}
	// ... or try to build from passed object
	else {
		try {
			this.tasks = [];
			this._id = listObject.id;
			this._description = listObject.description;
			for (var i = 0, len = listObject.tasks.length; i < len; i++) {	
				this.tasks.push(new eggsTodo.class.Task(listObject.tasks[i], this.id));
			}
			eggsTodo.view.renderList(this.id);

		}
		catch(err) {
			console.log("List creation error. Empty list created");
			this.tasks = [];
			this._id = Date.now();
			this._description = "";
			return false;
		}
	}

	/**
	 * Methods
	 */

	this.addTask = function (taskObject) {
		
		// If no task object passed, create one
		if (taskObject === undefined) {
			var taskObject = new eggsTodo.class.Task(undefined, this.id);
		}	
		this.tasks.push(taskObject);
		eggsTodo.view.renderList(this.id);
		eggsTodo.storage.storeData(eggsTodo.app);
		return taskObject;
	}
	
	this.getTask = function (taskId) {
		for (var i = 0, len = this.tasks.length; i < len; i++) {
		    if (this.tasks[i].id === taskId) {
		    	return this.tasks[i];
		    }
		}
		return false;
	}

	this.removeTask = function (taskId) {
		for (var i = 0, len = this.tasks.length; i < len; i++) {
		    if (this.tasks[i].id === taskId) {
		    	var deletedTask = this.tasks.splice(i, 1);
		    	eggsTodo.view.renderList(this.id);
		    	eggsTodo.storage.storeData(eggsTodo.app);
		    	return deletedTask;
		    }
		}
		return false;
	}

	this.getTasks = function () { // Needed?
		return this.tasks;
	}
};


/**
 * Task class
 * For objects storing task data; id, description, done
 */

eggsTodo.class.Task = function (taskObject, parentListId) {

	/**
	 * Properties
	 * Using ES5 Getters and setters
	 */

	Object.defineProperties(this, {
        "id": {
        	"get": function() { 
				return this._id;
			},
			"set": function(value) { 
				return false;
			}
        },
        "parentListId": {
        	"get": function() { 
				return this._parentListId;
			},
			"set": function(value) { 
				return false;
			}
        },
        "description": {
			"get": function() { 
				return this._description;
			},
			"set": function(value) { 
				this._description = value;
				eggsTodo.view.renderTask(this.parentListId, this.id);
				eggsTodo.storage.storeData(eggsTodo.app);
			}
        },
        "done": {
			"get": function() { 
				return this._done;
			},
			"set": function(value) { 
				this._done = value;
				eggsTodo.view.renderTask(this.parentListId, this.id);
				eggsTodo.storage.storeData(eggsTodo.app);
			}
        }
    });

	/**
	 * Constructor
	 */

	// Create new ...
	if (taskObject == undefined) {	
		this._id = Date.now();
		this._parentListId = parentListId;
		this._description = "";
		this._done = false;
	}
	// ... or try to build from passed object
	else {
		try {
			this._id = taskObject.id;
			this._parentListId = parentListId;
			this._description = taskObject.description;
			this._done = taskObject.done;
			eggsTodo.view.renderTask(this.parentListId, taskObject.id);
		}
		catch(err) {
			console.log('Task creation error. Empty task created:' + err);
			this._id = Date.now();
			this._parentListId = parentListId;
			this._description = "";
			this._done = false;
			return false;
		}
	}

};


/**
 * Storage class
 * Handles getting and setting todo list data to different storage media
 */

eggsTodo.class.Storage = function () {


	// TODO: Get real data

	this.storeData = function (e) {
		
		var	lists = [];

		console.log(e.lists);

		for (var i = 0, listLen = e.lists.length; i < listLen; i++) {
			lists[i] = {
				"id"          : e.lists[i].id,
				"description" : e.lists[i].description,
				"tasks"       : []
			}
			
			for (var ii = 0, taskLen = e.lists[i].tasks.length; ii < taskLen; ii++) {
				lists[i].tasks[ii] = {
					"id"          : e.lists[i].tasks[ii].id,
					"description" : e.lists[i].tasks[ii].description,
					"done"        : e.lists[i].tasks[ii].done
				}
			}
		}

		localStorage.setItem("eggsTodoList", JSON.stringify(lists));
	}

	this.getData = function () {

		var storedTodoList = localStorage.getItem("eggsTodoList");

		console.log("storage.getData()")
		console.log("raw: " + storedTodoList);


		// If no data stored, get demo list
		if (!storedTodoList || storedTodoList == "" || storedTodoList == "[]") {
			console.log("Resetting data");
			storedTodoList = [
				{
					"id" : 123,
					"description" : "Liste 1",
					"tasks" : [
						{
							"id" : 123,
							"description" : "Oppgave 1",
							"done" : false
						},
						{
							"id" : 124,
							"description" : "Oppgave 2",
							"done" : true
						}
					]
				},
				{
					"id" : 124,
					"description" : "Liste 2",
					"tasks" : [
						{
							"id" : 123,
							"description" : "Oppgave 1",
							"done" : true
						},
						{
							"id" : 124,
							"description" : "Oppgave 2",
							"done" : false
						}

					]
				},
				{
					"id" : 125,
					"description" : "Liste 3",
					"tasks" : [
						{
							"id" : 123,
							"description" : "Oppgave 1",
							"done" : false
						}
					]
				}
			]
		}
		// If stored object found
		else {
			storedTodoList = JSON.parse(storedTodoList);
		}

		console.log(storedTodoList);

		return storedTodoList;	

	}
};