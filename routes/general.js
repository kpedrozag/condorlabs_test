exports = module.exports = function (express, app) {

    var router = express.Router();
    var path = require("path");

    const index_res = {
        name: "List of API routes",
        list: [
            {
                route: "/",
                methods:
                [
                    {
                        verb: "GET",
                        action: "Show the list of API routes."
                    }
                ]
            },
            {
                route: "/task",
                methods:
                [
                    {
                        verb: "GET",
                        action: "List all the tasks."
                    },
                    {
                        verb: "POST",
                        action: "Add a new task."
                    }
                ]
            },
            {
                route: "/task/{ts_id}",
                methods:
                [
                    {
                        verb: "GET",
                        action: "Show information fo a task by ID."
                    },
                    {
                        verb: "PUT",
                        action: "Edit the information (ts_description, ts_status) a task by ID."
                    }
                ]
            },
            {
                route: "/task/{ts_id}/{us_id}",
                methods:
                [
                    {
                        verb: "PUT",
                        action: "Assign a task to a user."
                    },
                    {
                        verb: "DELETE",
                        action: "Remove a user from a task."
                    }
                ]
            }
        ]
    };

    router.get('/routes', function (request, response) {
        response.status(200).jsonp(index_res);
    });

    // send index file of web app
    router.get('*', function (request, response) {
        var rt = path.join(`${__dirname}/../static/index.html`);
        response.sendFile(rt);
    });

// Get the app to use the routing feature
    app.use(router);

    return router;
};

/*

*/
