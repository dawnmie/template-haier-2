#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
H-work UI 搜索 - 用于 H-work UI 设计规范的 BM25 搜索引擎
用法: python search.py "<查询>" [--category <类别>] [--max-results 5]

类别: button, input, select, table, form, menu, tab, pagination, color, font, layout, margin, radius, shadow 等
"""

import argparse
from core import COMPONENT_CATEGORIES, MAX_RESULTS, search, get_available_categories


def format_output(result):
    """格式化结果以供 AI 使用（token 优化）"""
    if "error" in result:
        return f"❌ 错误: {result['error']}"

    output = []
    output.append(f"## H-work UI 设计规范搜索结果")
    output.append(f"**类别:** {result['category']} | **查询:** {result['query']}")
    output.append(f"**来源:** {result['file']} | **找到:** {result['count']} 条结果\n")

    if result['count'] == 0:
        output.append("未找到匹配的结果。请尝试其他关键词或类别。\n")
        output.append(f"可用类别: {', '.join(get_available_categories())}")
        return "\n".join(output)

    for i, row in enumerate(result['results'], 1):
        output.append(f"### 结果 {i}")
        
        # 优先显示重要字段
        priority_fields = ["Category", "Name", "Value", "Usage", "Description", "Severity"]
        
        for field in priority_fields:
            if field in row and row[field]:
                value_str = str(row[field])
                if len(value_str) > 500:
                    value_str = value_str[:500] + "..."
                output.append(f"- **{field}:** {value_str}")
        
        # 显示其他字段
        for key, value in row.items():
            if key not in priority_fields and not key.startswith("_") and value:
                value_str = str(value)
                if len(value_str) > 500:
                    value_str = value_str[:500] + "..."
                output.append(f"- **{key}:** {value_str}")
        
        output.append("")

    return "\n".join(output)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="H-work UI 设计规范搜索",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=f"""
可用类别:
  {', '.join(sorted(get_available_categories()))}

示例:
  python search.py "primary button"
  python search.py "button size" --category button
  python search.py "brand color" --category color -n 10
  python search.py "form label" --category form
        """
    )
    
    parser.add_argument("query", help="搜索查询")
    parser.add_argument(
        "--category", "-c",
        choices=list(COMPONENT_CATEGORIES.keys()),
        help="搜索类别（可选，不指定则搜索所有类别）"
    )
    parser.add_argument(
        "--max-results", "-n",
        type=int,
        default=MAX_RESULTS,
        help=f"最大结果数 (默认: {MAX_RESULTS})"
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="以 JSON 格式输出"
    )
    parser.add_argument(
        "--list-categories",
        action="store_true",
        help="列出所有可用的类别"
    )

    args = parser.parse_args()

    # 列出类别
    if args.list_categories:
        print("可用的组件类别:")
        for cat in sorted(get_available_categories()):
            print(f"  - {cat}")
        exit(0)

    # 执行搜索
    result = search(args.query, args.category, args.max_results)

    # 输出结果
    if args.json:
        import json
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print(format_output(result))
