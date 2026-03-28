#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
H-work UI 核心模块 - 用于 H-work UI 设计规范的 BM25 搜索引擎
"""

import csv
import re
import os
from pathlib import Path
from math import log
from collections import defaultdict

# ============ 配置 ============
MAX_RESULTS = 5

# 自动检测 data 目录路径
def find_data_dir():
    """
    自动查找 data 目录，支持从任意目录执行脚本
    搜索顺序：
    1. 脚本所在目录的父目录下的 data/
    2. 从当前工作目录向上查找 data/
    3. 从用户主目录查找 data/
    """
    # 方式1：相对于脚本位置（标准方式）
    script_based = Path(__file__).parent.parent / "data"
    if script_based.exists():
        return script_based

    # 方式2：从当前工作目录向上查找
    current = Path.cwd()
    for parent in [current] + list(current.parents):
        candidate = parent / "data"
        if candidate.exists():
            return candidate

    # 方式3：从用户主目录查找（全局安装的 skill）
    home_based = Path.home() / "data"
    if home_based.exists():
        return home_based

    # 如果都找不到，返回默认路径（会在使用时报错）
    return script_based


DATA_DIR = find_data_dir()

# 组件类别映射
COMPONENT_CATEGORIES = {
    # 基础组件
    "alert": "hwork-alert.csv",
    "anchor": "hwork-anchor.csv",
    "backtop": "hwork-back-top.csv",
    "badge": "hwork-badge.csv",
    "breadcrumb": "hwork-breadcrumb.csv",
    "button": "hwork-button.csv",
    "carousel": "hwork-carousel.csv",
    "cascader": "hwork-cascader.csv",
    "chart": "hwork-chart.csv",
    "checkbox": "hwork-checkbox.csv",
    "collapse": "hwork-collapse.csv",
    "color": "hwork-color.csv",
    "container": "hwork-container.csv",
    "datepicker": "hwork-date-picker.csv",
    "descriptions": "hwork-descriptions.csv",
    "drawer": "hwork-drawer.csv",
    "dropdown": "hwork-dropdown.csv",
    "font": "hwork-font.csv",
    "footer": "hwork-footer.csv",
    "form": "hwork-form.csv",
    "input": "hwork-input.csv",
    "inputnumber": "hwork-input-number.csv",
    "layout": "hwork-layout.csv",
    "margin": "hwork-margin.csv",
    "menu": "hwork-menu.csv",
    "message": "hwork-message.csv",
    "messagebox": "hwork-message-box.csv",
    "notification": "hwork-notification.csv",
    "pageheader": "hwork-page-header.csv",
    "pagination": "hwork-pagination.csv",
    "popconfirm": "hwork-popconfirm.csv",
    "popover": "hwork-popover.csv",
    "previewimage": "hwork-preview-image.csv",
    "progress": "hwork-progress.csv",
    "radio": "hwork-radio.csv",
    "radius": "hwork-radius.csv",
    "scrollbar": "hwork-scrollbar.csv",
    "search": "hwork-search.csv",
    "segment": "hwork-segment.csv",
    "select": "hwork-select.csv",
    "shadow": "hwork-shadow.csv",
    "skeleton": "hwork-skeleton.csv",
    "slider": "hwork-slider.csv",
    "spin": "hwork-spin.csv",
    "steps": "hwork-steps.csv",
    "switch": "hwork-switch.csv",
    "tab": "hwork-tab.csv",
    "table": "hwork-table.csv",
    "tag": "hwork-tag.csv",
    "timeline": "hwork-timeline.csv",
    "timepicker": "hwork-time-picker.csv",
    "tooltip": "hwork-tooltip.csv",
    "transfer": "hwork-transfer.csv",
    "tree": "hwork-tree.csv",
    "treeselect": "hwork-tree-select.csv",
    "upload": "hwork-upload.csv",
    "icon": "hwork-icon.csv"
}

# CSV 列配置
CSV_COLUMNS = {
    "search_cols": ["Category", "Name", "Usage", "Description"],
    "output_cols": ["Category", "Name", "Value", "Usage", "Description", "Severity"]
}


# ============ BM25 实现 ============
class BM25:
    """用于文本搜索的 BM25 排名算法"""

    def __init__(self, k1=1.5, b=0.75):
        self.k1 = k1
        self.b = b
        self.corpus = []
        self.doc_lengths = []
        self.avgdl = 0
        self.idf = {}
        self.doc_freqs = defaultdict(int)
        self.N = 0

    def tokenize(self, text):
        """转换为小写、分词、移除标点符号、过滤短词"""
        text = re.sub(r'[^\w\s]', ' ', str(text).lower())
        return [w for w in text.split() if len(w) > 1]

    def fit(self, documents):
        """从文档构建 BM25 索引"""
        self.corpus = [self.tokenize(doc) for doc in documents]
        self.N = len(self.corpus)
        if self.N == 0:
            return
        self.doc_lengths = [len(doc) for doc in self.corpus]
        self.avgdl = sum(self.doc_lengths) / self.N

        for doc in self.corpus:
            seen = set()
            for word in doc:
                if word not in seen:
                    self.doc_freqs[word] += 1
                    seen.add(word)

        for word, freq in self.doc_freqs.items():
            self.idf[word] = log((self.N - freq + 0.5) / (freq + 0.5) + 1)

    def score(self, query):
        """对所有文档进行查询评分"""
        query_tokens = self.tokenize(query)
        scores = []

        for idx, doc in enumerate(self.corpus):
            score = 0
            doc_len = self.doc_lengths[idx]
            term_freqs = defaultdict(int)
            for word in doc:
                term_freqs[word] += 1

            for token in query_tokens:
                if token in self.idf:
                    tf = term_freqs[token]
                    idf = self.idf[token]
                    numerator = tf * (self.k1 + 1)
                    denominator = tf + self.k1 * (1 - self.b + self.b * doc_len / self.avgdl)
                    score += idf * numerator / denominator

            scores.append((idx, score))

        return sorted(scores, key=lambda x: x[1], reverse=True)


# ============ 搜索函数 ============
def _load_csv(filepath):
    """加载 CSV 文件并返回字典列表"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return list(csv.DictReader(f))


def _search_csv(filepath, search_cols, output_cols, query, max_results):
    """使用 BM25 的核心搜索函数"""
    if not filepath.exists():
        return []

    data = _load_csv(filepath)

    # 从搜索列构建文档
    documents = [" ".join(str(row.get(col, "")) for col in search_cols) for row in data]

    # BM25 搜索
    bm25 = BM25()
    bm25.fit(documents)
    ranked = bm25.score(query)

    # 获取评分 > 0 的最佳结果
    results = []
    for idx, score in ranked[:max_results]:
        if score > 0:
            row = data[idx]
            results.append({col: row.get(col, "") for col in output_cols if col in row})

    return results


def detect_category(query):
    """从查询中自动检测最相关的组件类别"""
    query_lower = query.lower()

    # 关键词映射 - 覆盖所有 59 个组件
    # 使用加权评分：精确匹配权重更高
    category_keywords = {
        # 基础组件
        "alert": {
            "exact": ["alert", "警告", "提示框"],
            "partial": ["warning", "info", "success", "error"]
        },
        "anchor": {
            "exact": ["anchor", "锚点", "锚链接"],
            "partial": ["定位"]
        },
        "backtop": {
            "exact": ["backtop", "back top", "返回顶部", "回到顶部"],
            "partial": ["top"]
        },
        "badge": {
            "exact": ["badge", "徽标", "徽章"],
            "partial": ["标记", "数字角标"]
        },
        "breadcrumb": {
            "exact": ["breadcrumb", "面包屑", "导航路径"],
            "partial": ["路径"]
        },
        "button": {
            "exact": ["button", "btn", "按钮"],
            "partial": ["点击", "提交", "确认", "取消", "primary", "secondary"]
        },
        "carousel": {
            "exact": ["carousel", "轮播", "走马灯"],
            "partial": ["banner", "slider"]
        },
        "cascader": {
            "exact": ["cascader", "级联", "级联选择"],
            "partial": ["cascade", "联动"]
        },
        "chart": {
            "exact": ["chart", "图表"],
            "partial": ["echarts", "可视化", "数据图"]
        },
        "checkbox": {
            "exact": ["checkbox", "复选", "多选", "复选框"],
            "partial": ["check"]
        },
        "collapse": {
            "exact": ["collapse", "折叠", "折叠面板"],
            "partial": ["accordion", "展开"]
        },
        "color": {
            "exact": ["color", "颜色", "色彩", "品牌色", "功能色", "文字色", "hwork blue"],
            "partial": ["主色", "blue"]
        },
        "container": {
            "exact": ["container", "容器"],
            "partial": ["wrapper", "box"]
        },
        "datepicker": {
            "exact": ["datepicker", "date picker", "日期选择"],
            "partial": ["date", "日期"]
        },
        "descriptions": {
            "exact": ["descriptions", "描述列表"],
            "partial": ["详情", "信息展示"]
        },
        "drawer": {
            "exact": ["drawer", "抽屉"],
            "partial": ["侧边栏", "slide"]
        },
        "dropdown": {
            "exact": ["dropdown", "下拉菜单"],
            "partial": ["popover"]
        },
        "font": {
            "exact": ["font", "字体", "排版", "typography"],
            "partial": ["字号", "行高", "pingfang", "roboto"]
        },
        "footer": {
            "exact": ["footer", "页脚"],
            "partial": ["底部"]
        },
        "form": {
            "exact": ["form", "表单"],
            "partial": ["验证", "提交", "label", "标签", "field"]
        },
        "icon": {
            "exact": ["icon", "图标"],
            "partial": ["svg", "symbol", "pictogram"]
        },
        "input": {
            "exact": ["input", "输入框", "文本框"],
            "partial": ["输入", "text", "textbox"]
        },
        "inputnumber": {
            "exact": ["inputnumber", "input number", "数字输入"],
            "partial": ["number", "计数器"]
        },
        "layout": {
            "exact": ["layout", "布局", "栅格"],
            "partial": ["grid", "flex", "响应式"]
        },
        "margin": {
            "exact": ["margin", "padding", "间距", "spacing"],
            "partial": ["内边距", "外边距", "space"]
        },
        "menu": {
            "exact": ["menu", "菜单"],
            "partial": ["导航", "nav", "侧边栏", "navigation"]
        },
        "message": {
            "exact": ["message", "消息提示"],
            "partial": ["toast", "通知"]
        },
        "messagebox": {
            "exact": ["messagebox", "message box", "弹框", "对话框"],
            "partial": ["dialog", "modal", "confirm"]
        },
        "notification": {
            "exact": ["notification", "通知"],
            "partial": ["提醒", "notice"]
        },
        "pageheader": {
            "exact": ["pageheader", "page header", "页头"],
            "partial": ["顶部", "header"]
        },
        "pagination": {
            "exact": ["pagination", "分页", "页码"],
            "partial": ["翻页", "pager"]
        },
        "popconfirm": {
            "exact": ["popconfirm", "pop confirm", "气泡确认"],
            "partial": ["确认框"]
        },
        "popover": {
            "exact": ["popover", "气泡卡片"],
            "partial": ["弹出层", "tooltip"]
        },
        "previewimage": {
            "exact": ["previewimage", "preview image", "图片预览"],
            "partial": ["图片", "放大", "查看"]
        },
        "progress": {
            "exact": ["progress", "进度条"],
            "partial": ["加载", "loading"]
        },
        "radio": {
            "exact": ["radio", "单选", "单选框"],
            "partial": ["选项"]
        },
        "radius": {
            "exact": ["radius", "圆角", "border-radius"],
            "partial": ["rounded"]
        },
        "scrollbar": {
            "exact": ["scrollbar", "滚动条"],
            "partial": ["scroll", "滚动"]
        },
        "search": {
            "exact": ["search", "搜索", "搜索框"],
            "partial": ["查询"]
        },
        "segment": {
            "exact": ["segment", "分段", "分段控制"],
            "partial": ["segmented"]
        },
        "select": {
            "exact": ["select", "选择器"],
            "partial": ["选择", "下拉", "dropdown", "option"]
        },
        "shadow": {
            "exact": ["shadow", "阴影", "box-shadow"],
            "partial": ["elevation"]
        },
        "skeleton": {
            "exact": ["skeleton", "骨架屏"],
            "partial": ["占位", "loading"]
        },
        "slider": {
            "exact": ["slider", "滑块"],
            "partial": ["滑动", "range", "拖动"]
        },
        "spin": {
            "exact": ["spin", "加载", "loading"],
            "partial": ["spinner", "转圈"]
        },
        "steps": {
            "exact": ["steps", "步骤", "步骤条"],
            "partial": ["流程", "step"]
        },
        "switch": {
            "exact": ["switch", "开关"],
            "partial": ["切换", "toggle"]
        },
        "tab": {
            "exact": ["tab", "标签页", "选项卡"],
            "partial": ["tabs"]
        },
        "table": {
            "exact": ["table", "表格"],
            "partial": ["列表", "数据", "行", "列", "cell", "row"]
        },
        "tag": {
            "exact": ["tag", "标签"],
            "partial": ["标记", "label"]
        },
        "timeline": {
            "exact": ["timeline", "时间线"],
            "partial": ["时间轴", "历史"]
        },
        "timepicker": {
            "exact": ["timepicker", "time picker", "时间选择"],
            "partial": ["time", "时间"]
        },
        "tooltip": {
            "exact": ["tooltip", "文字提示"],
            "partial": ["提示", "tip"]
        },
        "transfer": {
            "exact": ["transfer", "穿梭", "穿梭框"],
            "partial": ["shuttle"]
        },
        "tree": {
            "exact": ["tree", "树形", "树形控件"],
            "partial": ["节点", "层级"]
        },
        "treeselect": {
            "exact": ["treeselect", "tree select", "树选择"],
            "partial": ["tree", "树形"]
        },
        "upload": {
            "exact": ["upload", "上传"],
            "partial": ["文件", "附件", "file"]
        }
    }

    # 加权评分：精确匹配 3 分，部分匹配 1 分
    scores = {}
    for cat, keywords in category_keywords.items():
        score = 0
        score += sum(3 for kw in keywords["exact"] if kw in query_lower)
        score += sum(1 for kw in keywords["partial"] if kw in query_lower)
        scores[cat] = score

    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else None


def search(query, category=None, max_results=MAX_RESULTS):
    """主搜索函数"""
    # 如果没有指定类别，尝试自动检测
    if category is None:
        category = detect_category(query)

    # 如果指定了类别或检测到类别，搜索该类别
    if category and category in COMPONENT_CATEGORIES:
        filepath = DATA_DIR / COMPONENT_CATEGORIES[category]

        if not filepath.exists():
            return {
                "error": f"文件未找到: {filepath}",
                "category": category,
                "query": query
            }

        results = _search_csv(
            filepath,
            CSV_COLUMNS["search_cols"],
            CSV_COLUMNS["output_cols"],
            query,
            max_results
        )

        return {
            "category": category,
            "query": query,
            "file": COMPONENT_CATEGORIES[category],
            "count": len(results),
            "results": results
        }

    # 如果没有类别，搜索所有文件
    all_results = []
    for cat, filename in COMPONENT_CATEGORIES.items():
        filepath = DATA_DIR / filename
        if filepath.exists():
            results = _search_csv(
                filepath,
                CSV_COLUMNS["search_cols"],
                CSV_COLUMNS["output_cols"],
                query,
                max_results
            )
            for result in results:
                result["_category"] = cat
                result["_file"] = filename
            all_results.extend(results)
    
    # 按相关性排序（这里简化处理，实际应该重新计算 BM25 分数）
    all_results = all_results[:max_results]

    return {
        "category": "all",
        "query": query,
        "file": "multiple",
        "count": len(all_results),
        "results": all_results
    }


def get_available_categories():
    """获取所有可用的组件类别"""
    return list(COMPONENT_CATEGORIES.keys())
