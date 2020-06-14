const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Jimp = require("jimp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const {
    registerCheck,
    loginCheck,
    profileCheck,
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
        return res.json(user);
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
router.post("/me", [userRequired, profileCheck], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        firstName,
        lastName,
        university,
        faculty,
        grade,
        selfIntro,
    } = req.body;
    try {
        const user = await User.findById(req.user.id).select("-password");
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
            const randomFN = uuidv4() + path.extname(req.file.filename);
            const avatarPath = "./client/public/avatars/" + randomFN;
            Jimp.read(req.file.path, (err, file) => {
                if (err) throw err;
                file.resize(360, Jimp.AUTO) // resize
                    .quality(60) // set JPEG quality
                    .write(avatarPath); // save
            });
            const user = await User.findById(req.user.id);
            if (user.avatar != "default.jpg") {
                fs.unlink("./client/public/avatars/" + user.avatar);
            }
            user.avatar = randomFN;
            await user.save();
            fs.unlink(req.file.path);
            return res.status(200).send("Success.");
        } catch (error) {
            console.log(error.message);
            return res.status(500).send("Internal server error.");
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
            const randomFN = uuidv4() + path.extname(req.file.filename);
            const signaturePath = "./client/public/signatures/" + randomFN;
            Jimp.read(req.file.path, (err, file) => {
                if (err) throw err;
                file.resize(360, Jimp.AUTO) // resize
                    .quality(60) // set JPEG quality
                    .write(signaturePath); // save
            });
            const user = await User.findById(req.user.id);
            if (user.signature) {
                fs.unlink("./client/public/signatures/" + user.signature);
            }
            user.signature = randomFN;
            await user.save();
            fs.unlink(req.file.path);
            return res.status(200).send("Success.");
        } catch (error) {
            console.log(error.message);
            return res.status(500).send("Internal server error.");
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
            return res.status(400).json({ errors: errors.array() });
        }
        const { oldPassword, newPassword } = req.body;
        try {
            const user = await User.findById(req.user.id);
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(403).json({
                    errors: [
                        {
                            msg: "Incorrect password.",
                            param: "password",
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
