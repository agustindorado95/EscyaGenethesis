const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult } = require("express-validator");
const { registerCheck, loginCheck } = require("../../middleware/validators");
const userRequired = require("../../middleware/tokenVarifier");

const User = require("../../models/User");

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

// @route    DELETE api/users/me
// @func     Delete a user, along with the profile and contents
// @access   Requires current user
router.delete("/me", userRequired, async (req, res) => {
    try {
        await User.findByIdAndRemove(req.user.id);
        res.json({ msg: "User and all related contents removed." });
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

module.exports = router;
