exports = module.exports = function (mongoose) {

    // DB model for log
    var log = new mongoose.Schema({
        old_value:{
            type: mongoose.Schema.Types.Mixed},
        new_value:{
            type: mongoose.Schema.Types.Mixed},
        type: {
            type: String,
            enum: ['CREATE_TASK', 'EDIT_TASK', 'CHANGE_USER']
        }
    });

    mongoose.model('Log', log);
};
