## Select 选择

```tsx
/**
 * title: Select 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Select } from 'kenshin';

const { Option } = Select

export default () => <Select defaultValue="apple" style={{ width: 200 }}>
  <Option value="apple">apple</Option>
  <Option value="banana">banana</Option>
  <Option value="strawberry">strawberry</Option>
  <Option value="orange">orange</Option>
</Select>
```

```tsx
/**
 * title: 多选
 * desc: 多选，从已有条目中选择。
 */
import React from 'react';
import { Select } from 'kenshin';

const { Option } = Select

export default () => <Select
  mode="multiple"
  allowClear
  style={{ width: '100%' }}
  placeholder="choose your like"
>
  <Option value="apple">apple</Option>
  <Option value="banana">banana</Option>
  <Option value="strawberry">strawberry</Option>
  <Option value="orange">orange</Option>
</Select>
```

```tsx
/**
 * title: 分组
 * desc: 用 `OptGroup` 进行选项分组。
 */
import React from 'react';
import { Select } from 'kenshin';

const { Option, OptGroup } = Select

export default () => <Select style={{ width: 200 }} placeholder="choose your like">
  <OptGroup label="Fruit">
    <Option value="apple">apple</Option>
    <Option value="banana">banana</Option>
    <Option value="strawberry">strawberry</Option>
    <Option value="orange">orange</Option>
  </OptGroup>
  <OptGroup label="Vegetables">
    <Option value="potato">potato</Option>
    <Option value="tomatoes">tomatoes</Option>
    <Option value="mushroom">mushroom</Option>
    <Option value="Cordyceps sinensis">Cordyceps sinensis</Option>
  </OptGroup>
</Select>
```

```tsx
/**
 * title: 带排序的搜索
 * desc: 带排序的搜索
 */
import React from 'react';
import { Select } from 'kenshin';

const { Option } = Select

export default () => <Select
  showSearch
  style={{ width: 200 }}
  placeholder="choose your like"
  optionFilterProp="children"
  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  filterSort={(A, B) => A.children.toLowerCase().localeCompare(B.children.toLowerCase())}
>
  <Option value="apple">apple</Option>
  <Option value="banana">banana</Option>
  <Option value="strawberry">strawberry</Option>
  <Option value="orange">orange</Option>
</Select>
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 支持清除 | `boolean` | `false` |
| autoClearSearchValue | 是否在选中项后清空搜索框，只在 `mode` 为 `multiple` 或 `tags` 时有效 | `boolean` | `true` |
| autoFocus | 默认获取焦点 | `boolean` | `false` |
| bordered | 是否有边框 | `boolean` | `true` |
| clearIcon | 自定义的多选框清空图标 | `React.ReactNode` |  |
| defaultActiveFirstOption | 是否默认高亮第一个选项 | `boolean` | `true` |
| defaultOpen | 是否默认展开下拉菜单 | `boolean` | `false` |
| defaultValue | 指定默认选中的条目 | `string \| string[] \| number \| number[] \| LabeledValue \| LabeledValue[]` |  |
| disabled | 是否禁用 | `boolean` | `false` |
| dropdownClassName | 下拉菜单的 className 属性 | `string` |
| dropdownRender | 自定义下拉框内容 | `(originNode: React.ReactNode) => React.ReactNode` |  |
| dropdownStyle | 下拉菜单的 style 属性 | `React.CSSProperties` |  |  |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false | `boolean \| (inputValue: string \| string[] \| number \| number[], option: Option \| Option[]) => boolean` | `true` |
| filterSort | 搜索时对筛选结果项的排序函数, 用法同`Array.prototype.sort` | `(A: Option, B: Option) => number`|
| getPopupContainer | 菜单渲染父节点。| `triggerNode => React.ReactNode` | `() => document.body` |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 { value: string, label: ReactNode } 的格式 | `boolean` | `false` |
| listHeight | 设置弹窗滚动高度 | `number` | `256` |
| loading | 加载中状态 | `boolean` | `false` |
| maxTagCount | 最多显示多少个 tag，响应式模式会对性能产生损耗 | `number \| responsive` |  |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | `React.ReactNode \| omittedValues => React.ReactNode` |  |
| maxTagTextLength | 最大显示的 tag 文本长度 | `number` |  |
| menuItemSelectedIcon | 自定义多选时当前选中的条目图标 | `React.ReactNode` |  |
| mode | 设置 Select 的模式为多选或标签 | `multiple` \| `tags` |  |
| notFoundContent | 当下拉列表为空时显示的内容 | `React.ReactNode` | `Not Found` |
| open | 是否展开下拉菜单 | `boolean` | `false` |
| optionFilterProp | 搜索时过滤对应的 `option` 属性，如设置为 `children` 表示对内嵌内容进行搜索。若通过 `options` 属性配置选项内容，建议设置 `optionFilterProp="label"` 来对内容进行搜索。 | `string` | `value` |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value`。 | `string` | `children` |
| options | 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能 | `{ label, value }[]` |  |
| placeholder | 选择框默认文本 | `string` |  |
| removeIcon | 自定义的多选框清除图标 | `React.ReactNode` |  |
| searchValue | 控制搜索文本 | `string` |  |
| showArrow | 是否显示下拉小箭头 | `boolean` | `单选为 true，多选为 false` |
| showSearch | 使单选模式可搜索 | `boolean` | `false` |
| size | 选择框大小 | `large` \| `middle` \| `small` | `middle` |
| suffixIcon | 自定义的选择框后缀图标 | `React.ReactNode` |  |
| tagRender | 自定义 tag 内容 render | `props => React.ReactNode` |  |
| tokenSeparators | 在 `tags` 和 `multiple` 模式下自动分词的分隔符 | `string[]` |  |
| value | 指定当前选中的条目 | `string \| string[] \| number \| number[] \| LabeledValue \| LabeledValue[]` |  |
| virtual | 设置 false 时关闭虚拟滚动 | `boolean` | `true` |
| onBlur | 失去焦点时回调 | `() => void` |  |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | `(value: string \| string[] \| number \| number[], option: Option \| Option[]) => void` |  |
| onClear | 清除内容时回调 | `() => void` |  |
| onDeselect | 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 `multiple` 或 `tags` 模式下生效 | `(value: string \| number \| LabeledValue) => void` |  |
| onDropdownVisibleChange | 展开下拉菜单的回调 | `open => void` |  |
| onFocus | 获得焦点时回调 | `() => void` |  |
| onInputKeyDown | 按键按下时回调 | `() => void` |  |
| onMouseEnter | 鼠标移入时回调 | `() => void` |  |
| onMouseLeave | 鼠标移出时回调 | `() => void` |  |
| onPopupScroll | 下拉列表滚动时的回调 | `() => void` |  |
| onSearch | 文本框值变化时回调 | `(value: string) => void` |  |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | `(string \| number \| LabeledValue, option: Option) => void` |  |
