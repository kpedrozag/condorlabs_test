exports = module.exports = function (express, app, user_ctrl) {

    var route_users = express.Router();

    route_users.route('/user')
        .get(user_ctrl.ListAllUsers) // List all users
        .post(user_ctrl.createUser); // Create user

    route_users.route('/user/:us_id')
        .get(user_ctrl.ShowUser);  // Show user info by ID

// Get the app to use the router object above
    app.use('/api', route_users);

    return route_users;
};
