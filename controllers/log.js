var mongoose = require("mongoose"),
    Log = mongoose.model("Log");

exports.SaveLog = function (ov, nv, tp){
    const {old_value, new_value, type} = [ov, nv, tp];
    var log = new Log({
        old_value,
        new_value,
        type
    });
    log.save();
};
