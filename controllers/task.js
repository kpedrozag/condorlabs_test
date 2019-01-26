var mongoose = require("mongoose");
var Task = mongoose.model("Task");
var User = mongoose.model("User");
const _ = require("lodash");

var log_ctrl = require('./log');

// Req. 1a: Create Task. Method: POST
exports.createTask = function(request, response){
    const {ts_title, ts_description, ts_status, ts_users} = request.body;

    // New object for insertion to DB
    var task = new Task({
        ts_title,
        ts_description,
        ts_status,
        ts_users
    });

    // Save the new document into the Mongo DB
    task.save(function (error, task) {
        if(error) return response.send(500, error.message);

        log_ctrl.SaveLog(task, task, 'CREATE_TASK');

        // If the task was saved, it is mandatory to update the assigned tasks field of each user
        for (let us of task.ts_users){
            User.findById(us, function (error, user) {
                if(error) return response.send(500, error.message);

                // If the user has assigned tasks, we add one more.
                if(user.us_tasks) {
                    user.us_tasks.push(task.id);
                }
                else {
                    // Otherwise, we create the array of assigned task for that user
                    var ar = [];
                    ar.push(task.id);
                    // We make a copy of the array, Do not assign it explicitly
                    user.us_tasks = ar.concat();
                }

                // Once the information is updated, we commit the changes on the DB
                user.save(function (error) {
                    if(error) return response.send(500, error.message);
                });
            });
        }

        console.log("POST /task");
        response.status(200).jsonp(task);
    });
};

// Req. 1b: Update task information. Method: PUT
// Req. 7: Change status of a task. Method PUT
exports.updateTask = function (request, response){
    Task.findById(request.params.ts_id, function (error, task) {
        if(error) return response.send(500, error.message);

        const ov = task

        // We check if we got a new description. If it does, we assign it. The same procedure with the status of the task
        if(request.body.ts_description) task.ts_description = (task.ts_description === request.body.ts_description)?task.ts_description:request.body.ts_description;
        if(request.body.ts_status) task.ts_status = (task.ts_status === request.body.ts_status)?task.ts_status:request.body.ts_status;

        // Commit the changes on the DB
        task.save(function (error, task) {
            if(error) return response.send(500, error.message);

            log_ctrl.SaveLog(ov, task, 'EDIT_TASK');

            console.log("PUT /task/{ts_id}");
            response.status(200).jsonp(task);
        });
    });
};

// Req 2: List of task. Method: GET
exports.ListAllTasks = function (request, response) {

    Task.find(function (error, tasks) {
        if(error) return response.send(500).send(error.message);

        console.log("GET /task");
        const data = _.groupBy(tasks, 'ts_status');
        response.status(200).jsonp(data);
    });
};


// Req. 3: List task by ts_id. Method: GET

exports.ShowTask = function (request, response) {
    Task.findById(request.params.ts_id, function (error, task) {
        if(error) return response.send(500, error.message);

        console.log("GET /task/{ts_id}");
        response.status(200).jsonp(task);
    });
};

// No req. List task by status. Method: GET
exports.ListTasksByStatus = function (request, response) {
    const status = ["opened", "in-progress", "completed", "archived"];

    console.log(request.params.ts_status);

    if(status.indexOf(request.params.ts_status) === -1) return response.send(404).send("Error. Wrong task status");

    Task.find({ts_status:request.params.ts_status}, function (error, task) {
        if(error) return response.send(500).send(error.message);

        console.log("GET /task/status/{ts_status}");
        response.status(200).jsonp(task);
    })
};

// Req. 4: Assign a task to a User
exports.TaskToUser = function (request, response) {
    // We check if the task id exists
    Task.findById(request.params.ts_id, function (error_t, task) {
        if(error_t) return response.send(500).send(error_t.message);

        const ov = task;

        // And also check if the user id exist
        User.findById(request.params.us_id, function (error_u, user) {
            if(error_u) return response.send(500).send(error_u.message);

            // If both exist, update the users assigned to the task
            task.ts_users.push(user.id);

            // And update the assigned task to the users. Check if it is the first assigned task
            if(user.us_tasks){
                user.us_tasks.push(task.id);
            }
            else {
                var ar = [];
                ar.push(task.id);
                user.us_tasks = ar.concat();
            }

            // Commit the changes of both Objects
            user.save(function (error) {
                if(error) return response.send(500, error.message);
            });
            task.save(function (error, task) {
                if(error) return response.send(500, error.message);

                log_ctrl.SaveLog(ov, task, 'CHANGE_USER');
            });


            console.log("PUT /task/{ts_id}/{us_id}");
            response.status(200).jsonp(task);
        });

    });
};

// Req. 5: Remove a user from a task. Method: DELETE
exports.UserFromTask = function (request, response) {
   // Check if the task exist
   Task.findById(request.params.ts_id, function (error_t, task) {

       if(error_t) return response.send(500).send(error_t.message);

       const ov = task;

       // Check if the user exist
       User.findById(request.params.us_id, function (error_u, user) {

           if(error_u) return response.send(500).send(error_u.message);

           // Check if the user has assigned tasks
           // Otherwise, we send a message with the error.
           if(user.us_tasks){

               // We check if the task is assigned to the user AND vice-versa BY checking the position in the respective array
               // Remember: indexOf returns '-1' if the array does not have the searched value.
               var check1 = user.us_tasks.indexOf(task.id);
               var check2 = task.ts_users.indexOf(user.id);

               if(check1 !== -1 && check2 !== -1){
                   // With splice() we delete the value from the array by its position
                   user.us_tasks.splice(check1, 1);
                   task.ts_users.splice(check2, 1);

                   // Commit the changes
                   user.save(function (error) {
                       if(error) return response.send(500, error.message);
                   });
                   task.save(function (error, task) {
                       if(error) return response.send(500, error.message);

                       log_ctrl.SaveLog(ov, task, 'CHANGE_USER');
                   });

                   console.log("DELETE /task/{ts_id}/{us_id}");
                   response.status(200).jsonp(task);
               }
               else {
                   // Also, we check if just one of the values is not in the respective array
                   if(check2 === -1){
                       return response.send(404, "Task " + task.id + "has no assigned user " + user.id);
                   }
                   else {
                       return response.send(404, "User " + user.id + "has no assigned task " + task.id);
                   }
               }
           }
           else {
               return response.send(404, "User " + user.id + "has no assigned tasks.")
           }

       });
   });
};
