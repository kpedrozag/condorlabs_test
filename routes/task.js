exports = module.exports = function (express, app, task_ctrl) {

// Router object for routing API urls
    var route_tasks = express.Router();

// Methods for /task
    route_tasks.route('/task')
        .get(task_ctrl.ListAllTasks) // List all tasks
        .post(task_ctrl.createTask);  // Add a new task

// Methods for /task/:id
    route_tasks.route('/task/:ts_id')
        .get(task_ctrl.ShowTask)  // Show task info by ID
        .put(task_ctrl.updateTask);  // Edit a task by ID

// Methods for /task/:ts_id/:us_id
    route_tasks.route('/task/:ts_id/:us_id')
        .put(task_ctrl.TaskToUser) // Assign a task to a user
        .delete(task_ctrl.UserFromTask); // Remove a user from a task

// Methods for /task/:ts_status
    route_tasks.route('/task/status/:ts_status')
        .get(task_ctrl.ListTasksByStatus); // Show the status of the task by its ID.

// Get the app to use the router object above
    app.use('/api', route_tasks);

    return route_tasks;
};
