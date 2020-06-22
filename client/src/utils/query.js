var pinyin = require("chinese-to-pinyin");

const spell = (str) => {
    return pinyin(str, { removeTone: true, removeSpace: true });
};
export const queryArticleList = (articles, query) => {
    const results = articles.filter((a) => a.title[0].value.includes(query) || spell(a.title[0].value).includes(query) || a.subTitle[0].value.includes(query) || spell(a.subTitle[0].value).includes(query) || a.keywords[0].value.includes(query) || spell(a.keywords[0].value).includes(query) || a.tutor.includes(query) || spell(a.tutor).includes(query));
    return results;
};
