// Contains functions to load tasks
var address = "0xf13D96924C89019FAa3796516220Ad769C9A5984"; // Address of smart contract
var abi = [ // ABI of smart contract
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_task",
				"type": "string"
			}
		],
		"name": "createTasks",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "createUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "taskId",
				"type": "uint256"
			}
		],
		"name": "removeTasks",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addressToUser",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "numCompleted",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numTasks",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "hasCreated",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAmountOfComplete",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAmountOfTasks",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTasks",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "hasCreated",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

/* LOAD FUNCTIONS */
// Function to create a new checkbox
function createCheckbox(task, taskId) {
  var concatTaskId = "id=" + taskId.toString();
  var concatFor = "for=" + taskId.toString();
 
  $('#container').append("<input onclick='completeTask(this.id)' type='checkbox' name='task' " + concatTaskId + ">"); // Append a checkbox for a task to #container
  $('#container').append("<label " + concatFor + ">" + task + "</label"); // Append a matching label
  $('#container').append("<br>"); // Append a line break

  //document.getElementById(taskId.toString()).addEventListener("click", completeTask(taskId.toString()));
}

// Function to loop createCheckbox()
function loopCheckbox(num, tasks) {
// Loop to create new checkboxes
for (let i = 0; i < num; i++) {
  createCheckbox(tasks[i], i+1);
  }
}

// Function to load tasks
function loadTasks() {
	document.getElementById('createList').disabled = true; // Disable createList button

  // Get accounts
  web3.eth.getAccounts().then(function(accounts) {
    // Get amount of tasks user has
    contract.methods.getAmountOfTasks().call({
      from: accounts[0]
    }).then(function(getAmountOfTasks) {
      numOfTasks = getAmountOfTasks;
    }) 

    // Get tasks from user
    contract.methods.getTasks().call({
      from: accounts[0]
    }).then(function(getTasks) {
      tasks = getTasks;
      loopCheckbox(numOfTasks, tasks);
    })
  })
}

/* END OF LOAD FUNCTIONS */


/* FUNCTIONS TO CREATE A NEW TASK */

// Create a new task
async function createTask(task) {
	window.alert("After completing the transaction it may take a few seconds to reload - please be patient");
  // Get accounts
  await web3.eth.getAccounts().then(async function(accounts) {
    // Create a new task
    await contract.methods.createTasks(task).send({
      from: accounts[0]
    });

    // If task is created successfully
    }).then(function(tx) {
      window.alert("New task creation successful!");
      window.alert("Refresh the page to see changes...");

    // If task creation threw an error
    }).catch(function(tx) {
       window.alert("There was an error, please try again later");
  })
}

// When user clicks newTask button
$('#newTask').click(function() {
  var task = document.getElementById('taskInput').value;

  // If string taken from taskInput has 0 or less characters this info
  if (task.length <= 0) {
    window.alert("Please enter a task (min 1 character)");
        
    // Otherwise call the createTask function
  } else {
    createTask(task);
  }
})

/* END OF NEW TASK FUNCTIONS */


/* FUNCTIONS TO COMPLETE A TASK */

// Function is called when user completes a task
async function completeTask(taskId) {
	console.log(taskId);
	window.alert("After completing the transaction it may take a few seconds to reload - please be patient");
	// Get accounts
	await web3.eth.getAccounts().then(async function(accounts) {
			// Call remove tasks function in smart contract
			await contract.methods.removeTasks(taskId).send({
					from: accounts[0]
			}).then(function(tx) {
					window.alert("Task successfully completed!");
					window.alert("Refresh the page to see changes...");
			}).catch(function(tx) {
					window.alert("Task completion unsuccessful, please try again later...");
			})
	})
}

/* END OF FUNCTIONS TO COMPLETE TASK */