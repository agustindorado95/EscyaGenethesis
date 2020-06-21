const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const { articleCheck, articleSettingsCheck } = require("../../middleware/validators");
const { sortByObjectIndex } = require("../../middleware/utils")
const userRequired = require("../../middleware/tokenVarifier");

const Article = require("../../models/Article");
const User = require("../../models/User");

// @路径    GET api/articles/
// @功能    获取论文所属用户的所有论文的基础信息
// @权限    论文所属用户或管理员
router.get("/", userRequired, async (req, res) => {
    try {
        const articles = await Article.find({
            user: req.user.id,
        }).select([
            "language",
            "tutor",
            "status",
            "title",
            "titleSecondLanguage",
            "subTitle",
            "subTitleSecondLanguage",
            "keywords",
            "keywordsSecondLanguage",
            "timeCreated",
            "timeEdited",
        ]);
        return res.json(articles);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errors: [
                {
                    msg: `用户论文加载失败，因为${error.message}`,
                    location: "banner",
                },
            ],
        });
    }
});

// @路径    GET api/articles/:articleId
// @功能    获取ID为articleId的论文信息，包含排序后的章节
// @权限    论文所属用户或管理员
router.get("/:articleId", userRequired, async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);
        if (!article) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "没有找到对应的论文。",
                        location: "banner",
                    },
                ],
            });
        }
        const user = await User.findById(req.user.id).select("-password");
        if (article.user != user.id && !user.admin) {
            return res.status(403).json({
                errors: [
                    {
                        msg: "您只能访问属于您自己的论文。",
                        location: "banner",
                    },
                ],
            });
        }
        article.chapters.sort(sortByObjectIndex)
        return res.json(article);
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            errors: [
                {
                    msg: "没有找到对应的论文。",
                    location: "banner",
                },
            ],
        });
    }
});

// @路径    PUT api/articles/:articleId/markstatus
// @功能    更改ID为articleId的论文的状态 (progress / finalized)
// @权限    论文所属用户或管理员
router.put("/:articleId/markstatus", userRequired, async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);
        if (!article) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "没有找到对应的论文。",
                        location: "banner",
                    },
                ],
            });
        }
        const user = await User.findById(req.user.id).select("-password");
        if (article.user != user.id && !user.admin) {
            return res.status(403).json({
                errors: [
                    {
                        msg: "您只能访问属于您自己的论文。",
                        location: "banner",
                    },
                ],
            });
        }
        article.status = req.body.status;
        await article.save();
        return res.json(article);
    } catch (error) {
        return res.status(500).json({
            errors: [
                {
                    msg: `论文标记失败，因为${error.message}`,
                    location: "banner",
                },
            ],
        });
    }
});

// @路径    POST api/articles/:articleId/settings
// @功能    更新ID为articleId的论文设置信息，或创建新论文条目
// @权限    论文所属用户或管理员
router.post("/:articleId/settings", [userRequired, articleCheck], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let article = null;
        if (req.params.articleId == "new") {
            article = new Article({
                user: req.user.id,
                language: req.body.language,
                tutor: req.body.tutor,
                title: req.body.title,
                titleSecondLanguage: req.body.titleSecondLanguage,
                subTitle: req.body.subTitle,
                subTitleSecondLanguage: req.body.subTitleSecondLanguage,
                keywords: req.body.keywords,
                keywordsSecondLanguage: req.body.keywordsSecondLanguage,
                font: req.body.font,
                fontSecondLanguage: req.body.fontSecondLanguage,
                marginLeft: req.body.marginLeft,
                marginRight: req.body.marginRight,
                marginTop: req.body.marginTop,
                marginBottom: req.body.marginBottom,
                headingFontSize: req.body.headingFontSize,
                bodyFontSize: req.body.bodyFontSize,
                imageCommentFontSize: req.body.imageCommentFontSize,
                referenceFontSize: req.body.referenceFontSize,
                bibliographyFontSize: req.body.bibliographyFontSize,
                tocFontSize: req.body.tocFontSize,
                headingLineSpacing: req.body.headingLineSpacing,
                tocLineSpacing: req.body.tocLineSpacing,
                bodyLineSpacing: req.body.bodyLineSpacing,
                imageCommentLineSpacing: req.body.imageCommentLineSpacing,
                referenceLineSpacing: req.body.referenceLineSpacing,
                bibliographyLineSpacing: req.body.bibliographyLineSpacing,
                headingAfterSpacing: req.body.headingAfterSpacing,
                bodyAfterSpacing: req.body.bodyAfterSpacing,
                tocIndentGrowth: req.body.tocIndentGrowth,
                bodyIndent: req.body.bodyIndent,
                chapters: []
            });
        } else {
            article = await Article.findById(req.params.articleId);
            const user = await User.findById(req.user.id).select("-password");
            if (article.user != user.id && !user.admin) {
                return res.status(403).json({
                    errors: [
                        {
                            msg: "您只能修改您自己的文章。",
                            location: "banner",
                        },
                    ],
                });
            }
            article.language = req.body.language;
            article.tutor = req.body.tutor;
            article.title = req.body.title;
            article.titleSecondLanguage = req.body.titleSecondLanguage;
            article.subTitle = req.body.subTitle;
            article.subTitleSecondLanguage = req.body.subTitleSecondLanguage;
            article.keywords = req.body.keywords;
            article.keywordsSecondLanguage = req.body.keywordsSecondLanguage;
            article.font = req.body.font;
            article.fontSecondLanguage = req.body.fontSecondLanguage;
            article.marginLeft = req.body.marginLeft;
            article.marginRight = req.body.marginRight;
            article.marginTop = req.body.marginTop;
            article.marginBottom = req.body.marginBottom;
            article.headingFontSize = req.body.headingFontSize;
            article.bodyFontSize = req.body.bodyFontSize;
            article.imageCommentFontSize = req.body.imageCommentFontSize;
            article.referenceFontSize = req.body.referenceFontSize;
            article.bibliographyFontSize = req.body.bibliographyFontSize;
            article.tocFontSize = req.body.tocFontSize;
            article.headingLineSpacing = req.body.headingLineSpacing;
            article.tocLineSpacing = req.body.tocLineSpacing;
            article.bodyLineSpacing = req.body.bodyLineSpacing;
            article.imageCommentLineSpacing = req.body.imageCommentLineSpacing;
            article.referenceLineSpacing = req.body.referenceLineSpacing;
            article.bibliographyLineSpacing = req.body.bibliographyLineSpacing;
            article.headingAfterSpacing = req.body.headingAfterSpacing;
            article.bodyAfterSpacing = req.body.bodyAfterSpacing;
            article.tocIndentGrowth = req.body.tocIndentGrowth;
            article.bodyIndent = req.body.bodyIndent;
            article.timeEdited = Date.now();
        }
        await article.save();
        res.json(article);
    } catch (error) {
        return res.status(500).json({
            errors: [
                {
                    msg: `论文设置更新失败，因为${error.message}`,
                    location: "banner",
                },
            ],
        });
    }
});

// @路径    DELETE api/articles/:articleId
// @功能    删除ID为articleId的论文条目
// @权限    论文所属用户或管理员
router.delete("/:articleId", userRequired, async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);
        if (!article) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "没有找到对应的论文。",
                        location: "banner",
                    },
                ],
            });
        }
        const user = await User.findById(req.user.id).select("-password");
        if (article.user != user.id && !user.admin) {
            return res.status(403).json({
                errors: [
                    {
                        msg: "您只能访问属于您自己的论文。",
                        location: "banner",
                    },
                ],
            });
        }
        await article.remove();
        return res.status(200).send('success');
    } catch (error) {
        if (error.name == "CastError")
            return res.status(404).json({
                errors: [
                    {
                        msg: "没有找到对应的论文。",
                        location: "banner",
                    },
                ],
            });
        console.log(error);
        return res.status(500).json({
            errors: [
                {
                    msg: `删除论文失败，因为${error.message}`,
                    location: "banner",
                },
            ],
        });
    }
});


// @路径    GET api/articles/:articleId/chapters/:chapterId
// @功能    获取ID为chapterId的章节信息
// @权限    论文所属用户或管理员
router.get("/:articleId/chapters/:chapterId", userRequired, async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);
        if (!article) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "没有找到对应的论文。",
                        location: "banner",
                    },
                ],
            });
        }
        const user = await User.findById(req.user.id).select("-password");
        if (article.user != user.id && !user.admin) {
            return res.status(403).json({
                errors: [
                    {
                        msg: "您只能访问属于您自己的论文。",
                        location: "banner",
                    },
                ],
            });
        }
        const chapter = await article.chapters.find(
            (chapter) => chapter.id === req.params.chapterId
        );
        if (!chapter) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "没有找到对应的章节。",
                        location: "banner",
                    },
                ],
            });
        }
        return res.json(chapter);
    } catch (error) {
        if (error.name == "CastError")
            return res.status(404).json({
                errors: [
                    {
                        msg: "没有找到对应的章节。",
                        location: "banner",
                    },
                ],
            });
        console.log(error);
        return res.status(500).json({
            errors: [
                {
                    msg: `加载论文章节失败，因为${error.message}`,
                    location: "banner",
                },
            ],
        });
    }
});

// @路径    POST api/articles/:articleId/chapters/:chapterId
// @功能    更新ID为chapterId的章节信息，或创建新章节条目
// @权限    论文所属用户或管理员
router.post("/:articleId/chapters/:chapterId", userRequired, async (req, res) => {
    try {
        if (!/^\d+$/.test(req.body.index.replace(/\./g,''))) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "章节号格式错误。",
                        param: "index",
                        location: "body",
                    },
                ],
            });
        }
        const article = await Article.findById(req.params.articleId);
        if (!article) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "没有找到对应的论文。",
                        location: "banner",
                    },
                ],
            });
        }
        const user = await User.findById(req.user.id).select("-password");
        if (article.user != user.id && !user.admin) {
            return res.status(403).json({
                errors: [
                    {
                        msg: "您只能访问属于您自己的论文。",
                        location: "banner",
                    },
                ],
            });
        }

        let chapter = null;
        if (req.params.chapterId == "new") {
            chapter = {
                index: req.body.index,
                title: req.body.title,
                content: req.body.content,
                tailContent: req.body.tailContent,
            };
            article.chapters.push(chapter);
        } else {
            chapter = await article.chapters.find(
                (c) => c.id === req.params.chapterId
            );
            if (!chapter) {
                return res.status(404).json({
                    errors: [
                        {
                            msg: "没有找到对应的章节。",
                            location: "banner",
                        },
                    ],
                });
            }
            chapter.index = req.body.index;
            chapter.title = req.body.title;
            chapter.content = req.body.content;
            chapter.tailContent = req.body.tailContent;
            chapter.timeEdited = Date.now();
        }
        article.timeEdited = Date.now();
        await article.save();
        return res.json(article);
    } catch (error) {
        if (error.name == "CastError")
            return res.status(404).json({
                errors: [
                    {
                        msg: "没有找到对应的章节。",
                        location: "banner",
                    },
                ],
            });
        console.log(error);
        return res.status(500).json({
            errors: [
                {
                    msg: `更新章节信息失败，因为${error.message}`,
                    location: "banner",
                },
            ],
        });
    }
});

// @路径    DELETE api/articles/:articleId/chapters/:chapterId
// @功能    删除ID为chapterId的章节条目
// @权限    论文所属用户或管理员
router.delete("/:articleId/chapters/:chapterId", userRequired, async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);
        if (!article) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "没有找到对应的论文。",
                        location: "banner",
                    },
                ],
            });
        }
        const user = await User.findById(req.user.id).select("-password");
        if (article.user != user.id && !user.admin) {
            return res.status(403).json({
                errors: [
                    {
                        msg: "您只能访问属于您自己的论文。",
                        location: "banner",
                    },
                ],
            });
        }
        const chapter = await article.chapters.find(
            (chapter) => chapter.id === req.params.chapterId
        );
        if (!chapter) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "没有找到对应的章节。",
                        location: "banner",
                    },
                ],
            });
        }
        const removeIndex = article.chapters
            .map((chapter) => chapter.id.toString())
            .indexOf(req.params.chapterId);
        article.chapters.splice(removeIndex, 1);
        await article.save();
        return res.json(article);
    } catch (error) {
        if (error.name == "CastError")
            return res.status(404).json({
                errors: [
                    {
                        msg: "没有找到对应的章节。",
                        location: "banner",
                    },
                ],
            });
        console.log(error);
        return res.status(500).json({
            errors: [
                {
                    msg: `删除章节失败，因为${error.message}`,
                    location: "banner",
                },
            ],
        });
    }
});

module.exports = router;
