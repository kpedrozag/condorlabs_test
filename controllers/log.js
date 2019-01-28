var mongoose = require("mongoose"),
    Log = mongoose.model("Log");

exports.SaveLog = function (request, response, next){
    const {old_value, new_value, type} = request.body;
    var log = new Log({
        old_value,
        new_value,
        type
    });
    log.save();
    next()
};
