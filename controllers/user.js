var mongoose = require("mongoose"),
    User = mongoose.model("User");

// Req. 6: List of Users
exports.ListAllUsers = function (request, response) {
    User.find(function (error, user) {
        if(error) return response.send(500).send(error.message);

        console.log("GET /user");
        response.status(200).jsonp(user);
    });
};
// No Req.: Get user info By id

exports.ShowUser = function (request, response) {
    User.findById(request.params.us_id, function (error, user) {
        if(error) return response.send(500).send(error.message);

        console.log("GET /user/{us_id}");
        response.status(200).jsonp(user);
    });
};

exports.createUser = function (request, response) {
    let {us_name, us_tasks} = request.body;
    if(typeof us_tasks === 'string')
    {
        const val = us_tasks.concat();
        us_tasks = [];
        us_tasks.push(val);
    }
    var user = new User({
        us_name,
        us_tasks
    });

    user.save(function (error, user) {
        if(error) return response.send(500, error.message);

        console.log("POST /user");
        response.status(200).jsonp(user);
    })
}
