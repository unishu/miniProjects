const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const user = new Schema({
    //userName: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    pic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
    email: { type: String, trim: true, required: true },
    password: { type: String },
    address: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
{timestamps: true,});

//will has passwords in db if used

user.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

user.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("users", user);

//const User =mongoose.model("User", UserSchema);
//module.exports = User;  if using this two lines; no need for models index.js