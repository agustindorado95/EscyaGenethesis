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

const articleSettingsCheck = [
    check("font", "Font is required.").exists(),
    check("fontSecondLanguage", "Second Language Font is required.").exists(),
    check("marginLeft", "Page Left Margin is required.").exists(),
    check("marginRight", "Page Right Margin is required.").exists(),
    check("marginTop", "Page Top Margin is required.").exists(),
    check("marginBottom", "Page Bottom Margin is required.").exists(),
    check("headingFontSize", "Heading Font Size is required.").exists(),
    check("bodyFontSize", "Body Font Size is required.").exists(),
    check("imageCommentFontSize", "Image Comment Font Size is required.").exists(),
    check("referenceFontSize", "Reference Font Size is required.").exists(),
    check("bibliographyFontSize", "Bibliography Font Size is required.").exists(),
    check("tocFontSize", "Table of Contents Font Size is required.").exists(),
    check("headingLineSpacing", "Heading Line Spacing is required.").exists(),
    check("tocLineSpacing", "Table of Contents Line Spacing is required.").exists(),
    check("bodyLineSpacing", "Body Line Spacing is required.").exists(),
    check("imageCommentLineSpacing", "Image Comment Line Spacing is required.").exists(),
    check("referenceLineSpacing", "Reference Line Spacing is required.").exists(),
    check("bibliographyLineSpacing", "Bibliography Line Spacing is required.").exists(),
    check("headingAfterSpacing", "Heading Paragraph After Spacing is required.").exists(),
    check("bodyAfterSpacing", "Body Paragraph After Spacing is required.").exists(),
    check("tocIndentGrowth", "Table of Contents Indent Growth is required.").exists(),
    check("bodyIndent", "Body First Line Indent is required.").exists()
]

const userProfileCheck = [
    check("firstName", "请输入您的姓。").isLength({min:1}),
    check("lastName", "请输入您的名。").isLength({min:1}),
    check("university", "请输入大学名称。").isLength({min:1}),
    check("faculty", "请输入院系名称。").isLength({min:1}),
    check("grade", "请输入年级。").isLength({min:1}),
]

const passwordChangeCheck = [
    check("oldPassword", "请输入旧密码。").exists(),
    check("newPassword", "新密码至少为6位。").isLength({
        min: 6,
    }),
]

module.exports = {
    registerCheck,
    loginCheck,
    articleSettingsCheck,
    userProfileCheck,
    passwordChangeCheck
};
