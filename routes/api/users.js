const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Jimp = require("Jimp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const {
    registerCheck,
    loginCheck,
    userProfileCheck,
    passwordChangeCheck,
} = require("../../middleware/validators");
const userRequired = require("../../middleware/tokenVarifier");

const User = require("../../models/User");
const Article = require("../../models/Article");

// @route    POST api/users/register
// @func     Register New User
// @access   Public
router.post("/register", registerCheck, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;
    try {
        // Check if user email exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Email already registered.",
                        param: "email",
                        location: "body",
                    },
                ],
            });
        }

        user = new User({ firstName, lastName, email, password });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                return res.json({ token });
            }
        );
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error.");
    }
});

// @route    GET api/users/load
// @func     Load user
// @access   Requires any user
router.get("/load", userRequired, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        const articles = await user.getArticlesMetadata()
        const userWithArticles = Object.assign(articles, user._doc)
        return res.json(userWithArticles);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error.");
    }
});

// @route    POST api/users/login
// @func     User login
// @access   Public
router.post("/login", loginCheck, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        // Check if user email exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "User does not exist.",
                        param: "email",
                        location: "body",
                    },
                ],
            });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Incorrect password.",
                        param: "password",
                        location: "body",
                    },
                ],
            });
        }

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error.");
    }
});

// @route    POST api/users/me
// @func     User profile update
// @access   Private
router.post("/me", [userRequired, userProfileCheck], async (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        email,
        firstName,
        lastName,
        university,
        faculty,
        grade,
        selfIntro,
    } = req.body;
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (email != user.email) {
            const duplicate = await User.findOne({ email });
            if (duplicate) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "该邮箱已经被其他用户注册，请更换。",
                            param: "email",
                            location: "body",
                        },
                    ],
                });
            }
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.university = university;
        user.faculty = faculty;
        user.grade = grade;
        user.selfIntro = selfIntro;
        await user.save();
        return res.json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error.");
    }
});

// @route    POST api/users/me/avatar
// @func     User avatar update
// @access   Private
router.post(
    "/me/avatar",
    [userRequired, upload.single("avatar")],
    async (req, res) => {
        try {
            const randomFN = uuidv4() + '.jpg';
            const avatarPath = "./client/public/avatars/" + randomFN;
            const img = await Jimp.read(req.file.path).catch(() => {
                fs.unlinkSync(req.file.path);
                throw "这恐怕不是一只图片……";
            });
            img.resize(360, Jimp.AUTO).quality(60).write(avatarPath);
            const user = await User.findById(req.user.id);
            const oldAvatarPath = "./client/public/avatars/" + user.avatar;
            if (user.avatar != "default.jpg" && fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }
            user.avatar = randomFN;
            await user.save();
            fs.unlinkSync(req.file.path);
            return res.status(200).send("Success.");
        } catch (error) {
            return res.status(500).send(error);
        }
    }
);

// @route    POST api/users/me/signature
// @func     User signature update
// @access   Private
router.post(
    "/me/signature",
    [userRequired, upload.single("signature")],
    async (req, res) => {
        try {
            const randomFN = uuidv4() + '.jpg';
            const signaturePath = "./client/public/signatures/" + randomFN;
            const img = await Jimp.read(req.file.path).catch(() => {
                fs.unlinkSync(req.file.path);
                throw "这恐怕不是一只图片……";
            });
            img.resize(360, Jimp.AUTO).quality(60).write(signaturePath);
            const user = await User.findById(req.user.id);
            const oldSignaturePath = "./client/public/signatures/" + user.signature;
            if (user.avatar != "default.jpg" && fs.existsSync(oldSignaturePath)) {
                fs.unlinkSync(oldSignaturePath);
            }
            user.signature = randomFN;
            await user.save();
            fs.unlinkSync(req.file.path);
            return res.status(200).send("Success.");
        } catch (error) {
            return res.status(500).send(error);
        }
    }
);

// @route    POST api/users/me/password
// @func     User password update
// @access   Private
router.post(
    "/me/password",
    [userRequired, passwordChangeCheck],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const { oldPassword, newPassword } = req.body;
        try {
            const user = await User.findById(req.user.id);
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(403).json({
                    errors: [
                        {
                            msg: "旧密码输入错误。",
                            param: "oldPassword",
                            location: "body",
                        },
                    ],
                });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            await user.save();
            return res.status(200).send("Success.");
        } catch (error) {
            console.log(error.message);
            return res.status(500).send("Internal server error.");
        }
    }
);

// @route    DELETE api/users/me
// @func     Delete a user, along with the profile and contents
// @access   Requires current user
router.delete("/me", userRequired, async (req, res) => {
    try {
        await User.findByIdAndRemove(req.user.id);
        await Article.find({ user: req.user.id }).remove();
        return res.json({ msg: "User and all related contents removed." });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error.");
    }
});

module.exports = router;
