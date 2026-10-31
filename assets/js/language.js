/* Homepage language switch. English stays in the HTML for no-script readers. */
(function () {
  'use strict';

  var button = document.getElementById('language-toggle');
  if (!button) return;
  var translations = [];

  // Capture the original markup once so switching back restores every link.
  function translate(selector, chinese) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element, index) {
      var value = Array.isArray(chinese) ? chinese[index] : chinese;
      if (value === undefined) return;
      translations.push({ element: element, english: element.innerHTML, chinese: value });
    });
  }

  translate('.sidebar-info h4', '刘逸伦');
  translate('.sidebar-line:first-of-type > span', 'Yilun Liu');
  translate('.section-title', ['代表性学术成果', '近期预印本', '教育背景', '科研资助与计算资源', '学术服务']);
  translate('.col-lg-9 > .section-card:first-child > .pub-entry',
    '你好！我目前是<a href="https://www.lmu.de/en/" target="_blank" rel="noopener noreferrer">慕尼黑大学（LMU Munich）</a>计算机科学系博士研究生，师从 <a href="https://www.dbs.ifi.lmu.de/~tresp/" target="_blank" rel="noopener noreferrer">Volker Tresp 教授</a>，同时也是<a href="https://mcml.ai/" target="_blank" rel="noopener noreferrer">慕尼黑机器学习中心（MCML）</a>的<a href="https://mcml.ai/team/juniors/" target="_blank" rel="noopener noreferrer">初级研究员</a>。此前，我于<a href="https://www.cit.tum.de/en/cit/home/" target="_blank" rel="noopener noreferrer">慕尼黑工业大学（TUM）</a>获数据工程与分析硕士学位，于<a href="https://eie.xjtu.edu.cn/" target="_blank" rel="noopener noreferrer">西安交通大学</a>获计算机科学与技术（少年班）学士学位。' +
    '<br><br>我的研究主要关注大语言模型与智能体系统的能力边界及内部机理，并以此为基础探索新的方法与解决方案。目前的研究方向包括智能体递归自我提升、高效模型架构设计、机制可解释性与安全。欢迎兴趣相近的朋友<a href="mailto:liuyilun2000@126.com">与我联系</a>，共同交流研究想法和合作机会。');

  var summaries = {
    'RFMoE.png': [
      '提出无路由混合专家架构，移除外部路由器、Softmax、TopK 及硬编码负载均衡限制',
      '通过统一的自适应负载均衡框架，联合优化词元与专家的负载分配，提升模型性能与运算效率'
    ],
    'PyraVid.png': [
      '面向长视频推理，构建由粗到细的金字塔式多模态分层记忆框架',
      '结合结构引导的记忆扩充与剪枝，检索因果关联强但语义相似度低的事件',
      '在长视频基准、不同规模模型与多类问题上取得一致提升'
    ],
    'SIREN.png': [
      '提出即插即用的 SIREN 安全检测框架，利用大语言模型内部表征识别有害内容，在检测精度、泛化能力与效率上优于专用安全模型'
    ],
    'PERFT.png': [
      '探讨混合专家模型高效微调中，专家记忆向量与路由器向量的动态交互',
      '提出将参数高效微调与混合专家模型结合的统一框架，构建有效且可扩展的 PERFT 适配策略系列'
    ],
    'SPIN.png': [
      '提出基于语言模型内部神经元表征的轻量级、即插即用文本分类框架，提升分类性能、效率与可解释性'
    ],
    'bifurc.png': [
      '仅在动力系统的局部参数区间训练小型自回归 Transformer，即可在闭环外推中恢复未见过的全局动力学结构',
      '通过因果注意力干预，揭示控制参数信息如何塑造生成的动力学行为'
    ],
    'MGM.png': [
      '提出递归自我改进智能体框架，从历史存档中引入额外的比较信号',
      '提升性能与效率，使 35B 开源模型超越规模大 117 倍的前沿模型',
      '在不同基准与模型间实现泛化，形成可复用、可扩展的智能体框架'
    ],
    'binomial.png': [
      '构建语言模型二项式排序偏好的评估协议，涵盖 8 种语言、600 对词语的多语言数据集',
      '揭示模型对偏好方向的行为拟合优于对偏好强度的拟合，并证实偏好强度可在内部表征中定位与干预'
    ],
    'fiberwiseOT.png': [
      '基于纤维最优传输构建模型感知生成调度，将预测风险与动能作用量结合，得到闭式时间分配方案，并在强基线上取得一致提升',
      '归一化风险曲线与调度形变在不同模型间呈现一致性，固定解析形式仍能保留大部分收益'
    ]
  };

  Object.keys(summaries).forEach(function (image) {
    var img = document.querySelector('.pub-image[src="assets/images/' + image + '"]');
    if (!img) return;
    var entry = img.closest('.pub-entry');
    var list = entry.querySelector('.pub-abstract');
    translations.push({
      element: list,
      english: list.innerHTML,
      chinese: summaries[image].map(function (summary) { return '<li>' + summary + '</li>'; }).join('')
    });
  });
  translate('.pub-authors small', '（*共同一作）');
  var authorSpacing = [];
  document.querySelectorAll('.pub-authors small').forEach(function (note) {
    var node = note.previousSibling;
    if (node && node.nodeType === 3) {
      authorSpacing.push({ node: node, english: node.textContent, chinese: node.textContent.trimEnd() });
    }
  });
  document.querySelectorAll('.pub-links a').forEach(function (link) {
    var labels = { '[Paper]': '[论文]', '[Code]': '[代码]', '[Demo]': '[网页]', '[Poster]': '[海报]' };
    if (labels[link.textContent]) {
      translations.push({ element: link, english: link.innerHTML, chinese: labels[link.textContent] });
    }
  });
  // Translate only the venue text node; keep its links and their event targets.
  var venues = [];
  document.querySelectorAll('.pub-venue').forEach(function (element) {
    var node = element.firstChild;
    var english = node.textContent;
    var chinese = english.replace('arXiv preprint', 'arXiv 预印本');
    venues.push({ node: node, english: english, chinese: chinese });
  });

  translate('.edu-content > strong', [
    '计算机科学  ·  博士研究生',
    '数据工程与分析  ·  理学硕士（M.Sc.）',
    '计算机科学与技术（少年班） ·  工学学士（B.E.）'
  ]);
  translate('.edu-period', ['2025.10 – 至今', '2021.10 – 2026.03', '2017.09 – 2021.07']);
  translate('.edu-content .institution', [
    '<a href="https://www.lmu.de/en/" target="_blank" rel="noopener">慕尼黑大学（LMU Munich）</a>计算机科学系<br>德国  ·  巴伐利亚  ·  慕尼黑',
    '<a href="https://www.in.tum.de/in/startseite/" target="_blank" rel="noopener">慕尼黑工业大学（TUM）</a>计算机学院<br>德国  ·  巴伐利亚  ·  慕尼黑',
    '<a href="https://eie.xjtu.edu.cn/" target="_blank" rel="noopener">西安交通大学</a>钱学森学院、计算机学院<br>中国  ·  陕西  ·  西安'
  ]);
  translate('.funding-provider a', [
    '慕尼黑机器学习中心（MCML）', '莱布尼茨超级计算中心（LRZ）',
    '黑森州人工智能研究中心（hessian.AI）',
    '埃尔朗根-纽伦堡大学德国国家高性能计算中心（NHR@FAU）',
    'JUPITER 百亿亿次级超级计算机'
  ]);
  translate('.funding-funders', [
    '德国联邦研究技术与航天部（BMFTR），巴伐利亚科学与艺术部（StMWK）',
    '德国联邦研究技术与航天部（BMFTR），黑森州数字战略与创新部（HMD）',
    '德国联邦政府，巴伐利亚政府，德国研究基金会（DFG），埃尔朗根-纽伦堡大学（FAU）',
    '欧洲高性能计算联合计划（EuroHPC JU），德国联邦研究技术与航天部（BMFTR），北莱茵-威斯特法伦州文化与科学部（MKW NRW）'
  ]);
  var fundingSeparator = document.querySelector('.funding-provider a').nextSibling;
  var englishFundingSeparator = fundingSeparator.textContent;
  translate('.skill-category > strong', ['评议', '受邀报告']);
  translate('.skill-category > span', "ICLR'25, COLM'25, IC2S2'25, ICLR'26, COLM'26, ICLR'27, WWW'27, ACL Rolling Review (ARR)");
  translate('.talk-list li', [
    '通过递归自我提升构建代码智能体，<a href="http://ccbr99.cn/" target="_blank" rel="noopener">CCBR 2026 博士生论坛</a>，中国西安',
    '<a href="https://www.bilibili.com/video/BV1p3YJ6VEBb/" target="_blank" rel="noopener">孟德尔哥德尔机器（Mendel Gödel Machine）</a>，NICE 2026'
  ]);

  var language = 'en';
  function applyLanguage(next) {
    language = next === 'zh-CN' ? 'zh-CN' : 'en';
    var chinese = language === 'zh-CN';
    translations.forEach(function (item) {
      item.element.innerHTML = chinese ? item.chinese : item.english;
    });
    authorSpacing.forEach(function (item) {
      item.node.textContent = chinese ? item.chinese : item.english;
    });
    venues.forEach(function (item) {
      item.node.textContent = chinese ? item.chinese : item.english;
    });
    document.documentElement.lang = language;
    document.title = chinese ? '刘逸伦 – 个人主页' : 'Yilun Liu – About';
    fundingSeparator.textContent = chinese ? '，' : englishFundingSeparator;
    button.title = chinese ? 'Switch to English' : '切换到中文';
    button.setAttribute('aria-label', button.title);
    var theme = document.getElementById('theme-toggle');
    theme.title = chinese ? '切换明暗主题' : 'Toggle dark/light mode';
    theme.setAttribute('aria-label', theme.title);
    document.querySelector('.navbar-toggler').setAttribute('aria-label', chinese ? '展开或收起导航' : 'Toggle navigation');
    document.querySelector('.sidebar-links').setAttribute('aria-label', chinese ? '个人资料链接' : 'Profile links');
  }

  applyLanguage('en');
  button.addEventListener('click', function () {
    applyLanguage(language === 'en' ? 'zh-CN' : 'en');
  });
})();
