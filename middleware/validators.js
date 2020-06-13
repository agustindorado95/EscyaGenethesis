const { check } = require("express-validator");

const registerCheck = [
    check("firstName", "First Name is required.").not().isEmpty(),
    check("lastName", "Last Name is required.").not().isEmpty(),
    check("email", "Email is required.").isEmail(),
    check("password", "Password must be at least 6 digits.").isLength({
        min: 6,
    }),
];

const loginCheck = [
    check("email", "Email is required.").isEmail(),
    check("password", "Password is required").exists(),
];

const articleCheck = [
    check("language", "Language is required.").exists(),
    check("title", "Title is required.").exists()
];

module.exports = {
    registerCheck,
    loginCheck,
    articleCheck
};
