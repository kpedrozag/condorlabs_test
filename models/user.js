exports = module.exports = function (mongoose) {

    // DB model for users
    var user = new mongoose.Schema({
        us_name:            {
            type: String,
            required: true,
            unique: true}, // user name
        us_tasks: [
                    {
                        type: mongoose.Schema.ObjectId,
                        ref: 'Task'}
        ]
    });

    var user_model = mongoose.model('User', user);
//   SAMPLES OF USERS FOR TEST THE APP
//      Uncomment to create them.
/*
    // Create a sample user for api testing
    var new_user1 = new user_model({us_name: "kpedrozag"});
    new_user1.save(function (error, user) {
        if(error){
            console.log("Error adding user1");
            throw error;
        }
    });

    var new_user2 = new user_model({us_name: "kirito"});
    new_user2.save(function (error, user) {
        if(error){
            console.log("Error adding user2");
            throw error;
        }
    });

    var new_user3 = new user_model({us_name: "bindo"});
    new_user3.save(function (error, user) {
        if(error){
            console.log("Error adding user3");
            throw error;
        }
    });
//    */
};
