const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const ArticleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    language: {
        type: String,
        required: true
    },
    tutor: {
        type: String,
    },
    status: {
        type: String,
        default: 'progress'
    },
    title: {
        type: String,
        required: true
    },
    titleSecondLanguage: {
        type: String,
    },
    subTitle: {
        type: String,
    },
    subTitleSecondLanguage: {
        type: String,
    },
    abstract: {
        type: String,
    },
    abstractSecondLanguage: {
        type: String,
    },
    introduction: {
        type: String,
    },
    keywords: {
        type: String,
    },
    keywordsSecondLanguage: {
        type: String,
    },
    bibliography: {
        type: String,
    },
    gratitude: {
        type: String,
    },
    font: {
        type: String,
        default: 'Times New Roman'
    },
    fontSecondLanguage: {
        type: String,
        default: 'Times New Roman'
    },
    marginLeft: {
        type: Number,
        default: 2,
    },
    marginRight: {
        type: Number,
        default: 2,
    },
    marginTop: {
        type: Number,
        default: 2,
    },
    marginBottom: {
        type: Number,
        default: 2,
    },
    headingFontSize: {
        type: Number,
        default: 12,
    },
    bodyFontSize: {
        type: Number,
        default: 12,
    },
    imageCommentFontSize: {
        type: Number,
        default: 10,
    },
    referenceFontSize: {
        type: Number,
        default: 10,
    },
    bibliographyFontSize: {
        type: Number,
        default: 12,
    },
    tocFontSize: {
        type: Number,
        default: 12,
    },
    headingLineSpacing: {
        type: Number,
        default: 1.5
    },
    tocLineSpacing: {
        type: Number,
        default: 1.5
    },
    bodyLineSpacing: {
        type: Number,
        default: 1.5
    },
    imageCommentLineSpacing: {
        type: Number,
        default: 1
    },
    referenceLineSpacing: {
        type: Number,
        default: 1.5
    },
    bibliographyLineSpacing: {
        type: Number,
        default: 1.5
    },
    headingAfterSpacing: {
        type: Number,
        default: 10
    },
    bodyAfterSpacing: {
        type: Number,
        default: 5
    },
    tocIndentGrowth: {
        type: Number,
        default: 0
    },
    bodyIndent: {
        type: Number,
        default: 0.75
    },
    timeCreated: {
        type: Date,
        default: Date.now
    },
    timeEdited: {
        type: Date,
        default: Date.now
    },
    chapters: [
        {
            order: {
                type: String,
                require: true,
                // '1' / '2.3' / '3.1.4'
            },
            title: {
                type: String,
            },
            content: {
                type: String,
            },
            tailContent: {
                type: String,
            },
            timeEdited: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

module.exports = Article = mongoose.model("article", ArticleSchema);