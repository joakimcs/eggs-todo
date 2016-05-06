QUnit.test( "App creation and manipulation test", function( assert ) {

	// Create empty app object
	var testApp = new eggsTodo.class.App();
	assert.deepEqual( testApp.lists, [], "An empty app object can be created and must contain an empty lists array" );

	assert.ok (testApp.addList(
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
		}
	), "List object can be added to app object");
	assert.ok (testApp.getLists()[0], "App object contains list object after addition");
	assert.ok (testApp.removeList(123), "List object can be removed frome app object");
	assert.equal (testApp.getLists()[0], undefined, "App object does not contain list object after removal");
});

QUnit.test( "List creation and manipulation test", function( assert ) {
	// Create test object
	var testList = new eggsTodo.class.List();
	assert.deepEqual( testList.tasks, [], "An empty list object can be created and must contain an empty tasks array" );
	assert.ok ( testList.id, "... and an id: " + testList.id);
	assert.deepEqual ( testList.description, "", "... and an empty description");

	// TODO: Test creation w/ object
	assert.ok ( testList.addTask(
		{
			"id" : 123,
			"description" : "Oppgave 1",
			"done" : false
		}
	), "Task object can be added to list object");
	assert.ok (testList.getTasks()[0], "List object contains task object after addition");
	assert.ok (testList.removeTask(123), "Task object can be removed from list object");
	assert.ok (testList.description = "List 1", "Can set list description");
	assert.equal (testList.description, "List 1", "Can get list description");
});

QUnit.test( "Task creation and manipulation test", function( assert ) {
	var testTask = new eggsTodo.class.Task();
	assert.ok ( testTask.id, "An empty task object can be created and must contain an id:" + testTask.id);
	assert.deepEqual ( testTask.description, "", "... an empty description ...");
	assert.deepEqual ( testTask.done, false, "... and a boolean done status");

	// TODO: Test creation w/ object
	assert.ok (testTask.description = "Task 1", "Can set task description");
	assert.equal (testTask.description, "Task 1", "Can get task description");
	assert.ok (testTask.done = true, "Can set task status");
	assert.deepEqual (testTask.done, true, "Can get task status");

});

QUnit.test( "Overall data model test", function( assert ) {
	// Test app object from data object
	var testApp = new eggsTodo.class.App(
		[
			{
				"id" : 123,
				"description" : "Liste 1",
				"tasks" : [
					{
						"id" : 321,
						"description" : "Oppgave 1",
						"done" : false
					},
					{
						"id" : 322,
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
	);
	assert.ok( testApp.lists, "An app object can be created based on passed json data" );
	assert.deepEqual ( testApp.lists[0].id, 123, "Sample list id is verified in object data" );
	assert.deepEqual ( testApp.lists[0].tasks[0].id, 321, "Sample task id is verified in object data" );

	assert.deepEqual ( testApp.getList(123).description, "Liste 1", "Verified list description using getList method" );
	assert.deepEqual ( testApp.getList(123).getTask(321).description, "Oppgave 1", "Verified task description using linked getList/getTask method" );
});
