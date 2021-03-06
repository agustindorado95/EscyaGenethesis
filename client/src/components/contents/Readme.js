import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSection } from "../../actions/section";

const Readme = ({ setSection }) => {
    useEffect(() => {
        setSection("用户须知");
    }, []);

    return (
        <div className="row">
            <div className="col">
                <div className="card shadow">
                    <div className="card-header border-0">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="mb-2" data-toc-skip>
                                    用户须知
                                </h3>
                                <small className="text-muted">包括了隐私声明、更新说明之类的，或许还有点未来展望？</small>
                            </div>
                        </div>
                        <hr className="mt-3 mb-0" />
                    </div>
                    <div className="card-body pt-2" id="main-doc">
                        <h3 className="mb-4">致参加Alpha测试的用户们：</h3>
                        <p className="text-muted text-sm">
                            首先我想谈一谈隐私问题。如果我说你们的数据我拿不到，那我是鬼扯，因为无论是文件还是数据库都存在我的服务器上，但是我作为一个在读学生，真的没有利益相关。写这个应用三成是为了自用，三成是为了熟悉Python语言，三成是因为闲着无聊，还有一成是为了证明那个什么维普论文系统简直业余得搞笑。别说科班出身，我这个文科生单枪匹马既当设计狮又当程序猿，这个应用只用了半个月多点。一个专业团队能把系统做成那样，本强迫症实名反对。
                        </p>
                        <p className="text-muted text-sm">
                            但是有一点很重要，就是<strong className="text-red">用户的密码我是拿不到的</strong>
                            。因为整个系统上没有任何地方存储过用户密码的明码，后端一收到，立刻就用Bcrypt做过了hash处理，代码开源，不放心的话可以检查一下users/routes.py文件。所以绝对不用担心我拿你们的用户名和密码去碰别的应用，光拿着hash码是没用的。如果你还是不放心，又觉得一定要用这个系统，所有代码都是开源的，从Github里克隆下来在本地运行也行。
                        </p>
                        <p className="text-muted text-sm">
                            接下来说一说这个系统的功能问题。因为我刚开始写的时候主要原因是打算自用，我用的macOS，也没装Office，处理docx文档很不方便。所以功能上主要还是根据我自己的需要来设计的。所以章节层次只做到了三级，也就是最多1.1.1，
                            <strong>也不打算添加更多了</strong>，讲真如果要写到第四级，未免太过零碎，私以为没有必要。
                        </p>
                        <p className="text-muted text-sm">
                            <strong>表格还暂时不能添加</strong>
                            ，这也是因为我自己的论文里没有表格。当然，设计狮已经在思考收集表格数据的界面问题，以后可能会实现。不过赶在今年论文截稿前恐怕不大现实。
                        </p>
                        <p className="text-muted text-sm">
                            <strong>附录还暂时不能添加</strong>
                            ，一方面是因为我的论文里没有附录，另一方面是因为附录这东西可能包含的形式太多，设计狮也没想好该怎么做前端收集数据，程序猿也没搞明白数据库怎么架构。如果有好点子的话，欢迎来联系我。
                        </p>
                        <p className="text-muted text-sm">除此之外，我一个人一个月不到做出的系统，里面当然也会有别的bug：</p>
                        <ul className="ml-4">
                            <li className="text-muted text-sm mb-2 font-weight-normal">
                                对有脚注标记（编辑器里显示为橙色）的文字进行加粗、斜体和下划线的操作时会导致一个后端的Regular
                                Expression错误，保存到数据库的代码会混入从Quill.js获取的HTML代码，这主要是因为我写论文生成的代码在先，用的主要是类似于jinja2的双大括号标记方案，例如
                                {"{% raw %}{{bold:Text}}{% endraw %}"}
                                ，但后来为了改善用户体验，编辑器用了Quill.js的所见即所得富文本编辑器。重写论文生成的代码会耗费不少时间，为了让各位能在论文截稿前用上，只好写了RegEx来转换。如果这个应用继续开发下去，我应该会把论文生成部分的标记方案也换成HTML语言，这个问题就能解决。
                            </li>
                            <li className="text-muted text-sm mb-2 font-weight-normal">
                                有一些页面的响应式还没有做好，因此手机端包括小屏幕体验就欠佳。但鉴于这个项目的定位主要是帮助论文排版，复制粘贴手机上本来也很难操作，所以这个工作优先级就不那么高了。
                            </li>
                            <li className="text-muted text-sm mb-2 font-weight-normal">
                                上传过大插图或者一次性上传过多插图会导服务器宕机，因为我用的是Vultr租的小服务器，内存小得很，处理几个字符还能撑，大型图片就没戏了。如果觉得体验差，可以把项目下载到本地，用自己的电脑运行，这就不会有任何性能问题了。
                            </li>
                            <li className="text-muted text-sm mb-2 font-weight-normal">
                                字数统计为初步测试功能，显示内容为该章节下所有子章节、次级子章节的字数（或单词数）相加值。但是要判断某一个章节的语言很困难，目前程序猿没想到别的好办法，所以直接取了一段话的第一个字，如果是中文，就返回字符串长度，如果不是，就返回空格分割得到的单词数。但这样未免有误差，所以参考一下就好。
                            </li>
                            <li className="text-muted text-sm mb-2 font-weight-normal">以及其他我没有发现的bug们……</li>
                        </ul>
                        <p className="text-muted text-sm">
                            除了服务器性能的问题，我都会想方设法地解决，但是本人毕竟是个文科狗，这些都是自学的，水平有限，不保证能搞定。此外，这是一个免费开源的项目，我没有任何通过这个项目盈利的途径，这也表示我不欠任何人某些功能，也并没有责任一直维护这个项目保证它的运行。因此请不要来要求我添加某些功能，即使是附录、表格这些，我也是
                            <strong className="text-red">只凭兴趣、没有义务</strong>
                            地在做。但是，说这些并不意味着我怂恿用户拿着一叠钱来跟我说做某某功能。写程序不是我的本业，我也并不希望将爱好变成工作，那样就真的失去一个爱好了。
                        </p>
                        <p className="text-muted text-sm">
                            最后，希望各位都能成功完成论文，通过答辩，顺利毕业。此外，也祝愿各位能找到自己生命中的热情，不求名，不求利，但求快意。
                        </p>
                        <h4 className="text-right">Agustín Dorado</h4>
                        <p className="text-muted text-sm text-right">2019.04.10</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Readme.propTypes = {
    setSection: PropTypes.func.isRequired,
};
export default connect(null, { setSection })(Readme);
