# Development of the To-Do App

This folder contains all the code for To-DoApp, i. e., the API and the web app.

Most of the development of this project was made based on the following [GitHub repo](https://github.com/carlosazaustre/node-api-rest-example/tree/feature-express4).

It was used Express, a NodeJS framework, for the configuration of the server and MongoDB as database manager. The integration of these components was done by Mongoose, a ORM module for JavaScript to manage MongoDB.

The Mongo database is placed on the database hosting mlab.com.

## Content of the folder

 * The `controllers` folder has the controllers of the two resources of the API: `task` and `user`.
 * The `models`folder contains the Database models and the code of its construction in MongoDB.
 * The `routes` folder has the routing component of the API.
 * The `static` has the Javascript file of the frond-end part as well as the html file of the web app.
    - Inside this folder we have the frontend file of the app `core.js`.
 * The `app.js` file is the main file of the API. 
 * The `package.json` file has some properties of the app, such as name, version, dependencies and so on.

## Deployment

First, we install the dependencies in `package.json` by typing the command:
``` 
    $ npm install  
```
And deploy the web with:
``` 
    $ nodejs app.js
    API running on port 8888
    Connection to database successful.
```

Once above is done, we can go to [`localhost:8888/`](localhost:8888) and interact with the Web app.

## API routes

### General routes

* URL:`/`.
    - GET: Show the index.html of the Web App.

* URL:`/routes`.
    - GET: Response a JSON with the routes of the API.

### Task routes

* URL: `/task`.
    - GET: List all the tasks.
    - POST: Add a new task.

* URL: `/task/{ts_id}` 
    - GET: Show the information of a task by its ID.
    - PUT: Edit the information (ts_description, ts_status) of a task by its ID.

* URL: `/task/{ts_id}/{us_id}` 
    - PUT: Assign a task to a user.
    - DELETE: Remove a user from a task.

* URL: `/task/status/{ts_status}` 
    - GET: Show the status of the task.

### User routes

* URL: `/user`.
    - GET: List all users.

* URL: `/user/{us_id}`
    - GET: Show the information of a user by its ID.
