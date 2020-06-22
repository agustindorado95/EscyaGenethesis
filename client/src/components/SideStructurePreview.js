import React, { Fragment } from "react";

export const sideStructurePreview = (article) => {
    return (
        <Fragment>
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                <div className="card card-profile shadow">
                    <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                        <h3>当前论文目录</h3>
                    </div>
                    <div className="card-body pt-0 pt-md-2">
                        <div className="text-left">
                            <p className="text-sm text-muted">摘要</p>
                            {article.chapters.map((c) => (
                                <Fragment key={c._id}>
                                    <p id={c._id} className="text-sm text-muted" style={{ marginLeft: `${(c.index.split(".").length - 1) * 2}rem` }}>
                                        {c.hideIndex ? c.title : `章节${c.index}: ${c.title}`}
                                    </p>
                                </Fragment>
                            ))}
                            <p className="text-sm text-muted">参考文献</p>
                            <p className="text-sm text-muted">致谢辞</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
