import React from "react";

export default () => {
    return (
        <footer className="footer">
            <div className="row align-items-center justify-content-xl-between">
                <div className="col-xl-6">
                    <div className="copyright text-center text-xl-left text-muted">
                        &copy; {new Date().getFullYear()}
                        <a
                            href="https://escya.ink"
                            className="font-weight-bold ml-1"
                            target="_blank"
                        >
                            Escya Technologies
                        </a>
                    </div>
                </div>
                <div className="col-xl-6">
                    <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                        <li className="nav-item">
                            <a
                                href="https://www.facebook.com/agustindorado95"
                                className="nav-link"
                                target="_blank"
                            >
                                Agustín Dorado
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                href="https://github.com/agustindorado95/EscyaGenethesis"
                                className="nav-link"
                                target="_blank"
                            >
                                源代码
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                href="https://github.com/agustindorado95/EscyaGenethesis/issues"
                                className="nav-link"
                                target="_blank"
                            >
                                提交问题
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
