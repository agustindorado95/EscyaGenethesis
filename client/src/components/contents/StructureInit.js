import React, { useEffect, useState, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSection } from "../../actions/section";

const StructureInit = ({ setSection }) => {
    const [v, sv] = useState(0); // integer state
    const forceUpdate = () => {
        sv(v + 1);
    };

    useEffect(() => {
        setSection("我的论文");
    }, []);

    const { articleId } = useParams();

    const test2 = [{ order: 1, index: "1", title: "", subChapters: [] }];
    const [chapters, setChapters] = useState(test2);

    const setTotalChapters = (e) => {
        const updatedChapters = chapters.filter((c) => c.order <= e.target.value);
        [...Array(Number(e.target.value)).keys()].map((o) => {
            if (updatedChapters.filter((c) => c.order === o + 1).length === 0) {
                updatedChapters.push({ order: o + 1, index: String(o + 1), title: "", subChapters: [] });
            }
            return null
        });
        setChapters(updatedChapters);
        forceUpdate();
    };

    const addSubChapter = (parentIndex) => {
        const updatedChapters = chapters;
        var target = updatedChapters;
        parentIndex.split(".").map((i) => {
            target = target.filter((c) => c.order === Number(i))[0].subChapters;
            return null
        });
        target.push({ order: target.length + 1, index: `${parentIndex}.${target.length + 1}`, title: "", subChapters: [] });
        setChapters(updatedChapters);
        forceUpdate();
    };

    const removeSubChapter = (parentIndex) => {
        const updatedChapters = chapters;
        var target = updatedChapters;
        parentIndex.split(".").map((i) => {
            target = target.filter((c) => c.order === Number(i))[0].subChapters;
            return null
        });
        target.pop();
        setChapters(updatedChapters);
        forceUpdate();
    };

    const setChapterTitle = (index, title) => {
        const updatedChapters = chapters;
        var target = updatedChapters;
        // get parent index first to recursively enter subchapters
        index.split(".").map((i, iter, arr) => {
            if (arr.length - 1 === iter) {
                target = target.filter((c) => c.order === Number(i))[0];
                target.title = title
            } else {
                target = target.filter((c) => c.order === Number(i))[0].subChapters;
            }
            return null
        });
        setChapters(updatedChapters);
        forceUpdate();
    };

    const submitStructure = () => {
        console.log(articleId);
        console.log(chapters);
    };

    const generateChapterInput = (chapter) => (
        <Fragment key={uuidv4()}>
            <div className="input-group-sm input-group mb-3 input-group-border-bottom-only">
                {chapter.index.split(".").map(() => (
                    <div className="pr-5" key={uuidv4()}></div>
                ))}
                <div className="input-group-prepend">
                    <span className="input-group-text">第{chapter.index}章</span>
                </div>
                <input type="text" className="form-control form-control-sm" placeholder="章节标题" value={chapter.title} onChange={(e)=>{setChapterTitle(chapter.index, e.target.value)}} />
                <div className="input-group-append">
                    <span
                        className="input-group-text cursor-pointer"
                        onClick={() => {
                            addSubChapter(chapter.index);
                        }}
                    >
                        <i className="fas fa-plus"></i>
                    </span>
                    <span
                        className="input-group-text cursor-pointer"
                        onClick={() => {
                            removeSubChapter(chapter.index);
                        }}
                    >
                        <i className="fas fa-minus"></i>
                    </span>
                </div>
            </div>
            {chapter.subChapters.map((subChapter) => generateChapterInput(subChapter))}
        </Fragment>
    );
    return (
        <Fragment>
            <div className="row">
                <div className="col">
                    <div className="card shadow">
                        <div className="card-header border-0">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="mb-2">论文大纲初始化</h3>
                                    <small className="text-muted pl-1">
                                        请根据已经在本地撰写好的论文内容，输入<strong> 正文部分 </strong>
                                        的框架结构。确认之后如果需要改动，也可以通过内容卡片逐一修改，但本页面请谨慎刷新，刷新会导致本页所有内容丢失。
                                    </small>
                                </div>
                            </div>
                            <hr className="mt-3 mb-0" />
                        </div>
                        <div className="card-body tree pt-2">
                            <strong>正文章节总数:</strong>
                            <input type="text" className="mb-3 mt-0 pt-0" id="chapter-total-number" placeholder="请输入整数..." onKeyUp={setTotalChapters}/>

                            {chapters.map((chapter) => generateChapterInput(chapter))}
                        </div>
                        <div className="card-footer py-4">
                            <div className="text-right">
                                <button className="btn btn-primary" onClick={submitStructure}>
                                    确认大纲
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

StructureInit.propTypes = {
    setSection: PropTypes.func.isRequired,
};
export default connect(null, { setSection })(StructureInit);
