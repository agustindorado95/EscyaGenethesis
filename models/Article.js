const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const ArticleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    mainLanguage: {
        type: String,
        required: true,
    },
    tutor: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "progress",
    },
    title: {
        type: Array,
        required: true,
    },
    subTitle: {
        type: Array,
    },
    abstract: {
        type: Array,
    },
    keywords: {
        type: Array,
    },
    bibliography: {
        type: String,
        default: "",
    },
    gratitude: {
        type: String,
        default: "",
    },
    font: {
        type: Array,
        default: [{ language: "zh", value: "Times New Roman" }],
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
        default: 1.5,
    },
    tocLineSpacing: {
        type: Number,
        default: 1.5,
    },
    bodyLineSpacing: {
        type: Number,
        default: 1.5,
    },
    imageCommentLineSpacing: {
        type: Number,
        default: 1,
    },
    referenceLineSpacing: {
        type: Number,
        default: 1.5,
    },
    bibliographyLineSpacing: {
        type: Number,
        default: 1.5,
    },
    headingAfterSpacing: {
        type: Number,
        default: 10,
    },
    bodyAfterSpacing: {
        type: Number,
        default: 5,
    },
    tocIndentGrowth: {
        type: Number,
        default: 0,
    },
    bodyIndent: {
        type: Number,
        default: 0.75,
    },
    timeCreated: {
        type: Date,
        default: Date.now,
    },
    timeEdited: {
        type: Date,
        default: Date.now,
    },
    chapters: [
        {
            index: {
                type: String,
                require: true,
                // '1' / '2.3' / '3.1.4'
            },
            hideIndex: {
                type: Boolean,
                default: false,
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
            timeCreated: {
                type: Date,
                default: Date.now,
            },
            timeEdited: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

module.exports = Article = mongoose.model("article", ArticleSchema);
