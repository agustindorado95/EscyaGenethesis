const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'default.jpg'
    },
    signature: {
        type: String,
        required: false
    },
    timeCreated: {
        type: Date,
        default: Date.now
    },
    university: {
        type: String,
        default: '某知名大学'
    },
    faculty: {
        type: String,
        default: '某杰出院系'
    },
    grade: {
        type: String,
        default: '某年级'
    },
    selfIntro: {
        type: String,
        default: '随便写点什么？程序员只是想测试一下textfield。'
    },
    admin: {
        type: Boolean,
        default: false
    },
});

module.exports = User = mongoose.model("user", UserSchema);