exports = module.exports = function (mongoose) {

    // DB model for tasks
    var task = new mongoose.Schema({
        ts_title:           {
            type: String,
            required: true}, // task title
        ts_description:     {type: String},
        ts_status:          {
                        type: String,
                        enum: ["opened", "in_progress", "completed", "archived"],
                        required: true
                            },
        ts_users: [
                            {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
        ]
    });

    mongoose.model('Task', task);
};
