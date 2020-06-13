const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const { articleCheck } = require("../../middleware/validators");
const userRequired = require("../../middleware/tokenVarifier");

const Article = require("../../models/Article");
const User = require("../../models/User");

// @route    GET api/articles/
// @func     Get all articles of current user
// @access   Private
router.get("/", userRequired, async (req, res) => {
    try {
        const articles = await Article.find({
            user: req.user.id,
        });
        return res.json(articles);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error.");
    }
});

// @route    GET api/articles/:id
// @func     Get article by id
// @access   Private
router.get("/:id", userRequired, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ msg: "Article not found." });
        }
        const user = await User.findById(req.user.id).select("-password");
        if (article.user != user.id & !user.admin) {
            return res.status(403).json({ msg: "Article does not belong to you." });
        }
        return res.json(article);
    } catch (error) {
        if (error.name == "CastError")
            return res.status(404).json({ msg: "Article not found." });
        console.log(error.message);
        return res.status(500).send("Internal server error.");
    }
});

// @route    POST api/articles/
// @func     Create an article
// @access   Requires current user
router.post("/", [userRequired, articleCheck], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const article = new Article({
            user: req.user.id,
            language: req.body.language,
            title: req.body.title,
            titleSecondLanguage: req.body.titleSecondLanguage,
            subTitle: req.body.subTitle,
            subTitleSecondLanguage: req.body.subTitleSecondLanguage,
            keywords: req.body.keywords,
            keywordsSecondLanguage: req.body.keywordsSecondLanguage,
            abstract: req.body.abstract,
            abstractSecondLanguage: req.body.abstractSecondLanguage
        });
        await article.save();
        res.json(article);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error.");
    }
});