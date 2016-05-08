/**
 * Get or create eggsTodo object
 */

var eggsTodo = eggsTodo || {};
eggsTodo.class = eggsTodo.class || {};


/**
 * View class
 * For handling rendering of app data
 */

eggsTodo.class.View = function () {

	// Properties
	this.appNode = document.getElementById('app');

	// Methods
	this.renderApp = function (app) {
		
		// Clear app
		while (this.appNode.firstChild) {
			this.appNode.removeChild(this.appNode.firstChild);
		}

		// Declare vars
		var appWrapper, 
		    listNode, listNodeHeader, listAdder, 
		    taskWrapper, taskNode, taskCheckBox, taskDescription, taskAdder;

		// Iterate and create nodes, content
		appWrapper = document.createElement('ul');
		this.appNode.appendChild(appWrapper);

		// Add list
		listNode = document.createElement('li');
		// listNode.id = "list" + eggsTodo.app.lists[i].id;	
		appWrapper.appendChild(listNode);
		
		listNodeHeader = document.createElement('button');
		listNodeHeader.className = 'listadder';
		listNodeHeader.innerHTML = 'Add list';
		listNode.appendChild(listNodeHeader);

		// Create nodes and attrbutes for lists
		for (var i = 0, listLength = eggsTodo.app.lists.length; i < listLength; i++ ){

			listNode = document.createElement('li');
			listNode.id = 'list_' + eggsTodo.app.lists[i].id;	
			appWrapper.appendChild(listNode);
			
			listNodeHeader = document.createElement('h2');
			listNodeHeader.id = 'listdescription_' + eggsTodo.app.lists[i].id;
			listNodeHeader.className = 'listdescription';
			listNodeHeader.innerHTML = eggsTodo.app.lists[i].description;
			listNode.appendChild(listNodeHeader);

			taskWrapper = document.createElement('ul');
			taskWrapper.className = 'taskwrapper';
			listNode.appendChild(taskWrapper);

			for (var ii = 0, taskLength = eggsTodo.app.lists[i].tasks.length; ii < taskLength; ii++ ) {
				
				taskNode = document.createElement('li');
				taskNode.id = 'task_' + eggsTodo.app.lists[i].id + '_' + eggsTodo.app.lists[i].tasks[ii].id;
				taskNode.className = 'task';
				taskWrapper.appendChild(taskNode);

				taskCheckBox = document.createElement('input');
				taskCheckBox.id = 'checkbox_' + eggsTodo.app.lists[i].id + '_' + eggsTodo.app.lists[i].tasks[ii].id;
				taskCheckBox.className = 'checkbox';
				taskCheckBox.type = 'checkbox';
				taskCheckBox.checked = eggsTodo.app.lists[i].tasks[ii].done;
					
				taskNode.appendChild(taskCheckBox);

				taskDescription = document.createElement('span');
				taskDescription.id = 'taskdescription_' + eggsTodo.app.lists[i].id + '_' + eggsTodo.app.lists[i].tasks[ii].id;
				taskDescription.className = 'taskdescription';
				taskNode.appendChild(taskDescription);
				taskDescription.innerHTML = eggsTodo.app.lists[i].tasks[ii].description;

			}

			// Add todo
			taskNode = document.createElement('li');
			taskWrapper.appendChild(taskNode);

			taskAdder = document.createElement('a');
			taskAdder.id = 'taskadder_' + eggsTodo.app.lists[i].id;
			taskAdder.className = 'taskadder';
			taskAdder.innerHTML = 'Add todo';
			taskNode.appendChild(taskAdder);

		}

		


		console.log('App rendered');
		return true;
	}

	this.renderList = function (id) {
		
		console.log('renderList(' + id + ')')




		/*
		console.log('renderList(' + id + ')')

		// Declare variables
		var listNode, taskWrapper, taskNode;

		// Check if list exists
		if (listNode = document.getElementById('list' + id)) {
		
			// Check if task wrapper exists and empty
			if (taskWrapper = document.getElementById('taskwrapper' + id)) {
				// Clear task wrapper
				while (taskWrapper.firstChild) {
					taskWrapper.removeChild(taskWrapper.firstChild);
				}
			}
			// Create if not
			else {
				taskWrapper = document.createElement('ul');
				taskWrapper.id = 'taskwrapper' + id;
			}

			taskNode = document.createElement('li');
			taskNode.innerHTML = "Hepp!";
			taskWrapper.appendChild(taskNode);

			listNode.appendChild(taskWrapper);
			console.log (listNode);
			console.log('List rendered');
			return true;

		}
		// If no such list
		else {

			console.log('No such list');
			return false;
		}
		*/
	}

	this.renderTask = function (id) {

	}
}