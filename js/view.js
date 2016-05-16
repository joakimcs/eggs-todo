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
		/*
		var appHeader, appWrapper, 
		    listNode, listNodeHeader, listAdder, 
		    taskWrapper, taskNode, taskCheckBox, taskDescription, taskAdder; */

		// Create header
		var appHeader = document.createElement('h1');
		appHeader.innerHTML = "<span>Eggs todo</span>";
		this.appNode.appendChild(appHeader);

		var listNodeHeader = document.createElement('button');
		listNodeHeader.className = 'listadder';
		listNodeHeader.innerHTML = 'Add list';
		appHeader.appendChild(listNodeHeader);

		// Iterate and create nodes, content
		var appWrapper = document.createElement('ul');
		this.appNode.appendChild(appWrapper);

		// Add list
		
		var listNode = document.createElement('li');
		listNode.id = "listadderwrapper";	
		appWrapper.appendChild(listNode);
		

		// Create nodes and attrbutes for lists
		for (var i = 0, listLength = eggsTodo.app.lists.length; i < listLength; i++ ){

			listNode = document.createElement('li');
			listNode.id = 'list_' + eggsTodo.app.lists[i].id;
			listNode.className = 'list';
			appWrapper.appendChild(listNode);
			
			var listNodeHeader = document.createElement('h2');
			listNode.appendChild(listNodeHeader);

			var listNodeHeaderDescription = document.createElement('span');
			listNodeHeaderDescription.id = 'listdescription_' + eggsTodo.app.lists[i].id;
			listNodeHeaderDescription.className = 'listdescription';
			listNodeHeaderDescription.innerHTML = eggsTodo.app.lists[i].description;
			listNodeHeader.appendChild(listNodeHeaderDescription);

			var listDeleter = document.createElement('button');
			listDeleter.id = 'listdeleter_' + eggsTodo.app.lists[i].id;
			listDeleter.className = 'listdeleter';
			listDeleter.innerHTML = 'x';
			listNodeHeader.appendChild(listDeleter);

			var taskWrapper = document.createElement('ul');
			taskWrapper.className = 'taskwrapper';
			listNode.appendChild(taskWrapper);

			for (var ii = 0, taskLength = eggsTodo.app.lists[i].tasks.length; ii < taskLength; ii++ ) {
				
				var taskNode = document.createElement('li');
				taskNode.id = 'task_' + eggsTodo.app.lists[i].id + '_' + eggsTodo.app.lists[i].tasks[ii].id;
				taskNode.className = 'task';
				taskWrapper.appendChild(taskNode);

				var taskCheckBox = document.createElement('input');
				taskCheckBox.id = 'checkbox_' + eggsTodo.app.lists[i].id + '_' + eggsTodo.app.lists[i].tasks[ii].id;
				taskCheckBox.className = 'checkbox';
				taskCheckBox.type = 'checkbox';
				taskCheckBox.checked = eggsTodo.app.lists[i].tasks[ii].done;
					
				taskNode.appendChild(taskCheckBox);

				var taskDescription = document.createElement('span');
				taskDescription.id = 'taskdescription_' + eggsTodo.app.lists[i].id + '_' + eggsTodo.app.lists[i].tasks[ii].id;
				taskDescription.className = 'taskdescription';
				taskNode.appendChild(taskDescription);
				taskDescription.innerHTML = eggsTodo.app.lists[i].tasks[ii].description;

				var taskDeleter = document.createElement('button');
				taskDeleter.id = 'taskdeleter_' + eggsTodo.app.lists[i].id + '_' + eggsTodo.app.lists[i].tasks[ii].id;
				taskDeleter.className = 'taskdeleter';
				taskNode.appendChild(taskDeleter);
				taskDeleter.innerHTML = 'x';

			}

			// Add todo
			taskNode = document.createElement('li');
			taskWrapper.appendChild(taskNode);

			var taskAdder = document.createElement('a');
			taskAdder.id = 'taskadder_' + eggsTodo.app.lists[i].id;
			taskAdder.className = 'taskadder';
			taskAdder.innerHTML = 'Add todo...';
			taskNode.appendChild(taskAdder);

		}
		return true;
	}

	this.renderList = function (id) {
		
		// console.log('renderList(' + id + ')');
		var listNode;

		// Check if list node exists, and refresh if so
		if (listNode = document.getElementById('list_' + id)) {
	
			// Clear list node
			while (listNode.firstChild) {
				listNode.removeChild(listNode.firstChild);
			}

			// Declare vars
			// var listNodeHeader, taskWrapper, taskCheckBox, taskDescription, taskAdder;

			// Get list item
			var listItem = eggsTodo.app.getList(Number(id));
		
			var listNodeHeader = document.createElement('h2');
			listNode.appendChild(listNodeHeader);

			var listNodeHeaderDescription = document.createElement('span');
			listNodeHeaderDescription.id = 'listdescription_' + listItem.id;
			listNodeHeaderDescription.className = 'listdescription';
			listNodeHeaderDescription.innerHTML = listItem.description;
			listNodeHeader.appendChild(listNodeHeaderDescription);

			var listDeleter = document.createElement('button');
			listDeleter.id = 'listdeleter_' + listItem.id;
			listDeleter.className = 'listdeleter';
			listDeleter.innerHTML = 'x';
			listNodeHeader.appendChild(listDeleter);

			var taskWrapper = document.createElement('ul');
			taskWrapper.className = 'taskwrapper';
			listNode.appendChild(taskWrapper);

			for (var ii = 0, taskLength = listItem.tasks.length; ii < taskLength; ii++ ) {
				
				var taskNode = document.createElement('li');
				taskNode.id = 'task_' + listItem.id + '_' + listItem.tasks[ii].id;
				taskNode.className = 'task';
				taskWrapper.appendChild(taskNode);

				var taskCheckBox = document.createElement('input');
				taskCheckBox.id = 'checkbox_' + listItem.id + '_' + listItem.tasks[ii].id;
				taskCheckBox.className = 'checkbox';
				taskCheckBox.type = 'checkbox';
				taskCheckBox.checked = listItem.tasks[ii].done;
					
				taskNode.appendChild(taskCheckBox);

				var taskDescription = document.createElement('span');
				taskDescription.id = 'taskdescription_' + listItem.id + '_' + listItem.tasks[ii].id;
				taskDescription.className = 'taskdescription';
				taskNode.appendChild(taskDescription);
				taskDescription.innerHTML = listItem.tasks[ii].description;

				var taskDeleter = document.createElement('button');
				taskDeleter.id = 'taskdeleter_' + listItem.id + '_' + listItem.tasks[ii].id;
				taskDeleter.className = 'taskdeleter';
				taskNode.appendChild(taskDeleter);
				taskDeleter.innerHTML = 'x';
			}

			// Add todo
			var taskNode = document.createElement('li');
			taskWrapper.appendChild(taskNode);

			var taskAdder = document.createElement('a');
			taskAdder.id = 'taskadder_' + listItem.id;
			taskAdder.className = 'taskadder';
			taskAdder.innerHTML = 'Add todo...';
			taskNode.appendChild(taskAdder);
		}

	}

	this.renderTask = function (listId, taskId) {	

		// console.log('Getting task_' + listId + '_' + taskId);
		var taskNode;

		if (taskNode = document.getElementById('task_' + listId + '_' + taskId)) {

			while (taskNode.firstChild) {
				taskNode.removeChild(taskNode.firstChild);
			}

			var taskItem = eggsTodo.app.getList(listId).getTask(taskId);

			var taskCheckBox = document.createElement('input');
			taskCheckBox.id = 'checkbox_' + listId + '_' + taskId;
			taskCheckBox.className = 'checkbox';
			taskCheckBox.type = 'checkbox';
			taskCheckBox.checked = taskItem.done;
				
			taskNode.appendChild(taskCheckBox);

			var taskDescription = document.createElement('span');
			taskDescription.id = 'taskdescription_' + listId + '_' + taskId;
			taskDescription.className = 'taskdescription';
			taskNode.appendChild(taskDescription);
			taskDescription.innerHTML = taskItem.description;

			var taskDeleter = document.createElement('button');
			taskDeleter.id = 'taskdeleter_' + listId + '_' + taskId;
			taskDeleter.className = 'taskdeleter';
			taskNode.appendChild(taskDeleter);
			taskDeleter.innerHTML = 'x';
		}
	}
}

/**
 * Input view components class
 */

eggsTodo.class.Input = function () {

	this.showNewListInput = function() {
		// console.log('showNewListInput');
		input = document.createElement('input');
		input.className = 'listadderinput';
		input.type = "text";
		document.getElementById('listadderwrapper').appendChild(input);
		input.focus();
		input.onblur = function(e) {
			this.parentNode.removeChild(this);
		}
	}

	this.showListDescriptionInput = function(targetNode) {
		var part = targetNode.id.split('_');
		targetNode.style.display = 'none';
		input = document.createElement('input');
		input.id = 'listdescriptioninput_' + part[1];
		input.className = 'listdescriptioninput';
		input.value = targetNode.innerHTML;
		targetNode.parentNode.insertBefore(input, targetNode);
		input.focus();
		input.select();
		input.onblur = function(e) {
			targetNode.style.display = 'inline';
			this.parentNode.removeChild(this);
		}
	};

	this.showTaskDescriptionInput = function(targetNode) {
		var part = targetNode.id.split('_');
		targetNode.style.display = 'none';
		input = document.createElement('input');
		input.id = 'taskdescriptioninput_' + part[1] + '_' + part[2];
		input.className = 'taskdescriptioninput';
		input.value = targetNode.innerHTML;
		targetNode.parentNode.insertBefore(input, targetNode);
		input.focus();
		input.select();
		input.onblur = function(e) {
			targetNode.style.display = 'inline';
			this.parentNode.removeChild(this);
		}
	};

	this.showNewTaskInput = function(targetNode) {
		var part = targetNode.id.split('_');
		targetNode.style.display = 'none';
		input = document.createElement('input');
		input.id = 'newtaskinput_' + part[1] + '_' + part[2];
		input.className = 'newtaskinput';
		input.value = targetNode.innerHTML;
		targetNode.parentNode.insertBefore(input, targetNode);
		input.focus();
		input.select();
		input.onblur = function(e) {
			this.parentNode.removeChild(this);
			targetNode.style.display = 'inline';
		}
	};
}