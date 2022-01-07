//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Wishlist {

    // User struct
    struct userStruct {
        uint numCompleted;
        uint numTasks;
        string[] tasks;
        bool hasCreated;
    }

    // Function to create a new user
    function createUser() public {
        userStruct storage newUser = addressToUser[msg.sender];
        newUser.numCompleted = 0;
        newUser.hasCreated = true; // Update hasCreated variable
        newUser.numTasks = 1; // Create first task
        newUser.tasks.push("My First Task"); // Push first task
    }

    mapping(address => userStruct) public addressToUser;

    // When user creats a new task
    function createTasks(string memory _task) public {
        userStruct storage user = addressToUser[msg.sender];
        user.numTasks += 1;
        user.tasks.push(_task);
    }

    // When user completes a task
    function removeTasks(uint taskId) public {
        userStruct storage user = addressToUser[msg.sender];
        user.numCompleted += 1;
        user.numTasks -= 1;
        
        user.tasks[taskId-1] = user.tasks[user.tasks.length - 1]; // Shift task to be last element in array
        user.tasks.pop(); // Remove item from array
    }

    // Returns amount of tasks
    function getAmountOfTasks() public view returns (uint) {
        userStruct storage user = addressToUser[msg.sender];
        return user.numTasks;
    } 

    // Return amount of finished tasks
    function getAmountOfComplete() public view returns(uint) {
        userStruct storage user = addressToUser[msg.sender];
        return user.numCompleted;
    }

    // Return tasks
    function getTasks() public view returns (string[] memory) {
        userStruct storage user = addressToUser[msg.sender];
        return user.tasks;
    }

    // Return if user has been has been created 
    function hasCreated() public view returns (bool) {
        userStruct storage user = addressToUser[msg.sender];
        return user.hasCreated;
    }
}