const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const { articleCheck, articleSettingsCheck } = require("../../middleware/validators");
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

// @route    POST api/articles/:id (or 'new')
// @func     Create an article or update it
// @access   Requires current user
router.post("/:id", [userRequired, articleCheck], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        if (req.params.id == 'new') {
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
                abstractSecondLanguage: req.body.abstractSecondLanguage,
                gratitude: req.body.gratitude
            });
        } else {
            const article = await Article.findById(req.params.id)
            article.language = req.body.language
            article.title = req.body.title
            article.titleSecondLanguage = req.body.titleSecondLanguage
            article.subTitle = req.body.subTitle
            article.subTitleSecondLanguage = req.body.subTitleSecondLanguage
            article.keywords = req.body.keywords
            article.keywordsSecondLanguage = req.body.keywordsSecondLanguage
            article.abstract = req.body.abstract
            article.abstractSecondLanguage = req.body.abstractSecondLanguage
            article.gratitude = req.body.gratitude
            article.timeEdited = Date.now()
        }
        await article.save();
        res.json(article);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error.");
    }
});


// @route    POST api/articles/:id/settings
// @func     Update settings of an article
// @access   Requires current user
router.post("/:id/settings", [userRequired, articleSettingsCheck], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const article = await Article.findById(req.params.id)
        article.font = req.body.font
        article.fontSecondLanguage = req.body.fontSecondLanguage
        article.marginLeft = req.body.marginLeft
        article.marginRight = req.body.marginRight
        article.marginTop = req.body.marginTop
        article.marginBottom = req.body.marginBottom
        article.headingFontSize = req.body.headingFontSize
        article.bodyFontSize = req.body.bodyFontSize
        article.imageCommentFontSize = req.body.imageCommentFontSize
        article.referenceFontSize = req.body.referenceFontSize
        article.bibliographyFontSize = req.body.bibliographyFontSize
        article.tocFontSize = req.body.tocFontSize
        article.headingLineSpacing = req.body.headingLineSpacing
        article.tocLineSpacing = req.body.tocLineSpacing
        article.bodyLineSpacing = req.body.bodyLineSpacing
        article.imageCommentLineSpacing = req.body.imageCommentLineSpacing
        article.referenceLineSpacing = req.body.referenceLineSpacing
        article.bibliographyLineSpacing = req.body.bibliographyLineSpacing
        article.headingAfterSpacing = req.body.headingAfterSpacing
        article.bodyAfterSpacing = req.body.bodyAfterSpacing
        article.tocIndentGrowth = req.body.tocIndentGrowth
        article.bodyIndent = req.body.bodyIndent
        await article.save();
        res.json(article);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error.");
    }
});


// @route    GET api/articles/:articleId/chapters/:chapterId
// @func     Get chapter of article by id
// @access   Private
router.get("/:articleId/chapters/:chapterId", userRequired, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ msg: "Article not found." });
        }
        const user = await User.findById(req.user.id).select("-password");
        if (article.user != user.id & !user.admin) {
            return res.status(403).json({ msg: "Article does not belong to you." });
        }
        const chapter = await article.chapters.find(
            (chapter) => chapter.id === req.params.chapterId
        );
        if (!chapter) {
            return res.status(404).json({ msg: "Chapter not found." });
        }
        return res.json(chapter);
    } catch (error) {
        if (error.name == "CastError")
            return res.status(404).json({ msg: "Chapter not found." });
        console.log(error.message);
        return res.status(500).send("Internal server error.");
    }
});


// @route    POST api/articles/:articleId/chapters/:chapterId (or 'new')
// @func     Create a new chapter or update a chapter's content
// @access   Private
router.post("/:articleId/chapters/:chapterId", userRequired, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ msg: "Article not found." });
        }
        const user = await User.findById(req.user.id).select("-password");
        if (article.user != user.id & !user.admin) {
            return res.status(403).json({ msg: "Article does not belong to you." });
        }
        if (req.params.chapterId == 'new') {
            chapter = {
                order: req.body.order,
                title: req.body.title,
                content: req.body.content,
                tailContent: req.body.tailContent,
                timeEdited: Date.now()
            }
            article.chapters.push(chapter)
        } else {
            const chapter = await article.chapters.find(
                (chapter) => chapter.id === req.params.chapterId
            );
            if (!chapter) {
                return res.status(404).json({ msg: "Chapter not found." });
            }
            chapter.order = req.body.order
            chapter.title = req.body.title
            chapter.content = req.body.content
            chapter.tailContent = req.body.tailContent
            chapter.timeEdited = Date.now()
        }
        article.timeEdited = Date.now()
        await article.save()
        return res.json(chapter);
    } catch (error) {
        if (error.name == "CastError")
            return res.status(404).json({ msg: "Chapter not found." });
        console.log(error.message);
        return res.status(500).send("Internal server error.");
    }
});


// @route    DELETE api/articles/:articleId/chapters/:chapterId
// @func     Delete a chapter
// @access   Private
router.delete("/:articleId/chapters/:chapterId", userRequired, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ msg: "Article not found." });
        }
        const user = await User.findById(req.user.id).select("-password");
        if (article.user != user.id & !user.admin) {
            return res.status(403).json({ msg: "Article does not belong to you." });
        }
        const chapter = await article.chapters.find(
            (chapter) => chapter.id === req.params.chapterId
        );
        if (!chapter) {
            return res.status(404).json({ msg: "Chapter not found." });
        }
        const removeIndex = article.chapters
            .map((chapter) => chapter.id.toString())
            .indexOf(req.params.chapterId);
        article.chapters.splice(removeIndex, 1);
        await article.save()
        return res.json(article);
    } catch (error) {
        if (error.name == "CastError")
            return res.status(404).json({ msg: "Chapter not found." });
        console.log(error.message);
        return res.status(500).send("Internal server error.");
    }
});