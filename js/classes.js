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
	
	// Properties
	if (appObject == undefined) {
		this.lists = [];
	}
	else {
		try {
			this.lists = [];
			for (var i = 0, len = appObject.length; i < len; i++) {
				this.lists.push(new eggsTodo.class.List(appObject[i]));
			}
		}
		catch(err) {
			return false;
		}
	}

	// TODO: Try/catch create app based on passed object

	// Methods
	this.addList = function (listObject) {
		this.lists.unshift(listObject);
		eggsTodo.view.render();
		return true;
	}

	this.getLists = function () { // Needed?
		return this.lists;
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
		    if (this.lists[i].id === listId) {
		    	eggsTodo.view.render();
		    	return this.lists.splice(i, 1);
		    }
		}
		return false;
	}
};


/**
 * List class
 * For objects storing task data; id, description, task_ids, date 
 */

eggsTodo.class.List = function (listObject) {
	
	// Properties
	if (listObject == undefined) {
		this.tasks = [];
		this._id = Date.now();
		this._description = "";
	}
	else {
		try {
			this.tasks = [];
			this._id = listObject.id;
			this._description = listObject.description;
			for (var i = 0, len = listObject.tasks.length; i < len; i++) {	
				this.tasks.push(new eggsTodo.class.Task(listObject.tasks[i]));
			}
		}
		catch(err) {
			console.log('List creation error');
			return false;
		}
	}

	// TODO: Try/catch create list based on passed object

	// Getters and setters (ES5)
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
				eggsTodo.view.render();
			}
        }
    });

	// Methods
	this.addTask = function (object) {
		this.tasks.unshift(object);
		eggsTodo.view.render();
		return true;
	}

	this.getTasks = function () { // Needed?
		return this.tasks;
	}
	
	this.getTask = function (id) {
		for (var i = 0, len = this.tasks.length; i < len; i++) {
		    if (this.tasks[i].id === id) {
		    	return this.tasks[i];
		    }
		}
		return false;
	}

	this.removeTask = function (id) {
		for (var i = 0, len = this.tasks.length; i < len; i++) {
		    if (this.tasks[i].id === id) {
		    	eggsTodo.view.render();
		    	return this.tasks.splice(i, 1);
		    }
		}
		return false;
	}
};


/**
 * Task class
 * For objects storing task data; id, description, done
 */

eggsTodo.class.Task = function (taskObject) {

	// Properties
	if (taskObject == undefined) {	
		this._id = Date.now();
		this._description = "";
		this._done = false;
	}
	else {
		try {
			this._id = taskObject.id;
			this._description = taskObject.description;
			this._done = taskObject.done;
		}
		catch(err) {
			console.log('Task creation error');
			return false;
		}
	}


	// TODO: Try/catch create list based on passed object

	// Getters and setters (ES5)
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
				eggsTodo.view.render();
			}
        },
        "done": {
			"get": function() { 
				return this._done;
			},
			"set": function(value) { 
				this._done = value;
				eggsTodo.view.render();
			}
        }
    });
};


/**
 * Storage class
 * Handles getting and setting todo list data to different storage media
 */

eggsTodo.class.Storage = function () {

	this.getData = function () {
		return [
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
						"id" : 123,
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
		]; // TODO: Get real data!
	}
};