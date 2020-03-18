var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//to add bunch of methods that are coming with package to userSchema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);