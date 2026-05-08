组件可跨技术栈使用，每个组件实际是独立vue应用，使用时候需要进行初始化组件，实际是挂载独立的 vue 实例，其组件及用法：

| 组件名称      | 说明                                             | 初始化方式                                            |
| ------------- | ------------------------------------------------ | ----------------------------------------------------- |
| UserCard      | 用户信息浮层展示组件，鼠标悬停展示用户详细信息   | hwComps.hwUserCard.init(element, options);            |
| PersonnelList | 用户选择列表组件，适合表单内下拉框形式选择用户   | hwComps.hwPersonnelListSelect.init(element, options); |
| UserSelect    | 用户选择组件，适合弹窗内以穿梭框形式批量选择用户 | hwComps.hwUserSelect.init(element, options);          |

**如果在组件的挂载点在模板的 `slot` 里 请在 `nextTick` 里 `init` 组件**

每个组件的详细文档及 options 详细参数可以查看：

```
<skill-dir>/reference/hwork-business-components/{{组件的串行命名}}/index.md
```

比如查看 **PersonnelList 组件** 的用法，对此组件请一直使用 ` style: { width: "100%" }` ，来实现宽度自适应。

```javascript
import hwComps from '@hwork/hwork-business-components'

hwComps.hwPersonnelListSelect.init(personnelSelectRef.value, {
  value: undefined,
  placeholder: '请选择人',
  allowClear: true,
  style: { width: '100%' }, // 此组件请一直使用此属性
  onChange: (value) => {
    if (value && value.label) {
      searchParams.orderPerson = value.label
    } else {
      searchParams.orderPerson = ''
    }
  }
})
```

比如查看 **PersonnelList 组件** 的详细文档，使用 Read 工具读取：

- 业务组件文档：`<skill-dir>/reference/hwork-business-components/personnel-list/index.md`
- 组件参数详细文档：`<skill-dir>/reference/hwork-business-components/personnel-list/references/api_reference.md`
- 组件使用示例：`<skill-dir>/reference/hwork-business-components/personnel-list/references/code_examples.md`
