// angular module for frontend
angular.module('angularTodoApp', ["todoController"]);


// controller of the web app
var mainController = function($scope, $http) {

    $scope.formData = {}; // variable for task post operation
    $scope.status = undefined; // variable for save status of a task
    $scope.taskInfo = {};  // variable for showing task information
    // Status values for show and control
    $scope.allStatus = [
        {
            name: "Opened",
            value: "opened"
        },
        {
            name: "In-progress",
            value: "in_progress"
        },
        {
            name: "Completed",
            value: "completed"
        },
        {
            name: "Archived",
            value: "archived"
        }
    ]

    // function that get all the task from DB
    $scope.getTask = function(){
        $scope.task_panel = [];
        $http.get('/api/task')
            .success(function (data) {

                // we define all the required information to create each panel with its tasks
                const ts_array = [data.opened, data.in_progress, data.completed, data.archived];
                const class_array = ["card border-secondary mb-3", "card border-primary mb-3", "card border-success mb-3", "card border-warning mb-3"];
                var tmp_info = {};
                for(var i=0; i<4; i++){
                    tmp_info = {
                        title: `${$scope.allStatus[i].name} tasks`,
                        myTasks: ts_array[i],
                        sts: `${$scope.allStatus[i].value}`,
                        class_panel: class_array[i]
                    };
                    $scope.task_panel.push(tmp_info);
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // function that add an user
    $scope.addUser = function(){
        const data = {
            us_name : $scope.formData.us_name
        };
        $http.post('/api/user', data).then(function (response) {
            $scope.formData = {};
            $scope.getUser();
            console.log(response);
        })
    };

    // function that get ready the variables to add a task
    $scope.setAddTask = function(status){
        $scope.addmsg = "";
        if(status === "completed"){
            $scope.addmsg = `Add a ${status} task`;
        }
        else{
            $scope.addmsg = `Add an ${status} task`;
        }
        $scope.formData = {};
        $scope.getUser();
        $scope.status = status;
        $scope.formData.status = status;

        console.log(status)
    }

    // function that save a task, getting the data from a form and later post them,
    $scope.saveTask = function(){
        const data = {
            ts_title: $scope.formData.title,
            ts_description: $scope.formData.description,
            ts_status: $scope.formData.status,
            ts_users : [$scope.formData.users]
        };

        $http.post('/api/task', data).then(function(response){
            console.log($scope.formData);
            $scope.formData = {};
            $scope.getTask();
            console.log(response);
        });
    };

    // function to edit the task information
    $scope.editTask = function(id){
        const data = {
            ts_title: $scope.formData.title,
            ts_description: $scope.formData.description,
            ts_status: $scope.formData.status
        };

        $http.put(`api/task/${id}`, data).then(function (response) {
            $scope.formData = {};
            $scope.getTask();
            console.log(response);
        });
    };

    // function that get the users from DB and set the information
    $scope.getUser = function(){
        $scope.ts_names = [];
        $http.get('/api/user')
            .success(function (data) {
                $scope.users = data;
            })
            .error(function (data) {
                console.log('Error' + data);
            });
    };

    // function that get the information of a task for showing it in the modals
    $scope.showDetail = function(id){
        $http.get(`/api/task/${id}`)
            .success(function (data) {
                console.log("succ");
                $scope.taskInfo = data;
                var usersName = [];

                const status_array = {
                    opened: "Opened",
                    in_progress: "In progress",
                    completed: "Completed",
                    archived: "Archived"
                };

                $scope.taskInfo.ts_status = status_array[$scope.taskInfo.ts_status];
                for(let uid of $scope.taskInfo.ts_users){
                    $http.get(`/api/user/${uid}`)
                        .success(function (data) {
                            usersName.push(data.us_name);
                        })
                        .error(function (data) {
                            console.log(data);
                        });
                }
                $scope.taskInfo.ts_users = usersName;
            })
            .error(function (data) {
                console.log("err");
                console.log(data);
            });
    };

    $scope.cleanTaskInfo = function(){
        $scope.taskInfo = {};
    };

    //Call functions
    $scope.getTask();
    $scope.getUser();

};

// we add the controller to the module
angular.module("todoController", []).controller("MainController", ["$scope", "$http", mainController]);
