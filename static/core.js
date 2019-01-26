angular.module('angularTodoApp', ["todoController"]);

var mainController = function($scope, $http) {
    $scope.formData = {};

    $scope.getTask = function(){
        $http.get('/api/task')
            .success(function (data) {
                $scope.completed = data.completed;
                $scope.in_progress = data.in_progress;
                $scope.opened = data.opened;
                $scope.archived = data.archived;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getUser = function(){
        $http.get('/api/user')
            .success(function (data) {
                $scope.users = data;
            })
            .error(function (data) {
                console.log('Error' + data);
            });
    };

    $scope.addUser = function(){
        const data = {
            ts_title: $scope.formData.us_user
        };
        $http.post('/api/user', data).then(function (response) {
            $scope.formData = {};
            $scope.getUser();
            console.log(response);
        })
    };

    $scope.saveOpenedTask = function(){
        const data = {
            ts_title: $scope.formData.title,
            ts_description: $scope.formData.description,
            ts_status: "opened"
        };
        $http.post('/api/task', data).then(function(response){
            $scope.formData = {};
            $scope.getTask();
            console.log(response);
        });
    };

    $scope.saveInProgTask = function(){
        const data = {
            ts_title: $scope.formData.title,
            ts_description: $scope.formData.description,
            ts_status: "in_progress"
        };
        $http.post('/api/task', data).then(function(response){
            $scope.formData = {};
            $scope.getTask();
            console.log(response);
        });
    };
    $scope.saveCompTask = function(){
        const data = {
            ts_title: $scope.formData.title,
            ts_description: $scope.formData.description,
            ts_status: "completed"
        };
        $http.post('/api/task', data).then(function(response){
            $scope.formData = {};
            $scope.getTask();
            console.log(response);
        });
    };

    $scope.saveArchivedTask = function(){
        const data = {
            ts_title: $scope.formData.title,
            ts_description: $scope.formData.description,
            ts_status: "archived"
        };
        $http.post('/api/task', data).then(function(response){
            $scope.formData = {};
            $scope.getTask();
            console.log(response);
        });
    };

    //Call functions
    $scope.getTask();
    $scope.getUser();
};

angular.module("todoController", []).controller("MainController", ["$scope", "$http", mainController]);
