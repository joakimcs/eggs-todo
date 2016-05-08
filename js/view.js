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
		listNode.id = "listadderwrapper";	
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

		// console.log('App rendered');
		return true;
	}

	this.renderList = function (id) {
		
		// console.log('renderList(' + id + ')');

		// Check if list node exists, and refresh if so
		if (listNode = document.getElementById('list_' + id)) {
			
			while (listNode.firstChild) {
				listNode.removeChild(listNode.firstChild);
			}

			var listItem = eggsTodo.app.getList(Number(id));
		
			listNodeHeader = document.createElement('h2');
			listNodeHeader.id = 'listdescription_' + listItem.id;
			listNodeHeader.className = 'listdescription';
			listNodeHeader.innerHTML = listItem.description;
			listNode.appendChild(listNodeHeader);

			taskWrapper = document.createElement('ul');
			taskWrapper.className = 'taskwrapper';
			listNode.appendChild(taskWrapper);

			for (var ii = 0, taskLength = listItem.tasks.length; ii < taskLength; ii++ ) {
				
				taskNode = document.createElement('li');
				taskNode.id = 'task_' + listItem.id + '_' + listItem.tasks[ii].id;
				taskNode.className = 'task';
				taskWrapper.appendChild(taskNode);

				taskCheckBox = document.createElement('input');
				taskCheckBox.id = 'checkbox_' + listItem.id + '_' + listItem.tasks[ii].id;
				taskCheckBox.className = 'checkbox';
				taskCheckBox.type = 'checkbox';
				taskCheckBox.checked = listItem.tasks[ii].done;
					
				taskNode.appendChild(taskCheckBox);

				taskDescription = document.createElement('span');
				taskDescription.id = 'taskdescription_' + listItem.id + '_' + listItem.tasks[ii].id;
				taskDescription.className = 'taskdescription';
				taskNode.appendChild(taskDescription);
				taskDescription.innerHTML = listItem.tasks[ii].description;

			}

			// Add todo
			taskNode = document.createElement('li');
			taskWrapper.appendChild(taskNode);

			taskAdder = document.createElement('a');
			taskAdder.id = 'taskadder_' + listItem.id;
			taskAdder.className = 'taskadder';
			taskAdder.innerHTML = 'Add todo';
			taskNode.appendChild(taskAdder);
		}
	}

	this.renderTask = function (listId, taskId) {	

		// console.log('Getting task_' + listId + '_' + taskId);
		
		if (taskNode = document.getElementById('task_' + listId + '_' + taskId)) {

			while (taskNode.firstChild) {
				taskNode.removeChild(taskNode.firstChild);
			}

			var taskItem = eggsTodo.app.getList(listId).getTask(taskId);

			taskCheckBox = document.createElement('input');
			taskCheckBox.id = 'checkbox_' + listId + '_' + taskId;
			taskCheckBox.className = 'checkbox';
			taskCheckBox.type = 'checkbox';
			taskCheckBox.checked = taskItem.done;
				
			taskNode.appendChild(taskCheckBox);

			taskDescription = document.createElement('span');
			taskDescription.id = 'taskdescription_' + listId + '_' + taskId;
			taskDescription.className = 'taskdescription';
			taskNode.appendChild(taskDescription);
			taskDescription.innerHTML = taskItem.description;
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
			this.parentNode.removeChild(this);
			targetNode.style.display = 'block';
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
			targetNode.style.display = 'block';
		}
	};

}