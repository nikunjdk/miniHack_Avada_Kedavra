var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var UserSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    photo: String
});
UserSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", UserSchema);