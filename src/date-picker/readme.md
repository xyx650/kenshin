## DatePicker 日期选择

```tsx
/**
 * title: DatePicker 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { DatePicker } from 'kenshin';

const onChange = (date, dateString) => {
  console.log(date, dateString);
}

export default () => <DatePicker onChange={onChange}/>
```


## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 是否显示清除按钮 | `boolean` | `true` |
| autoFocus | 自动获取焦点 | `boolean` | `false` |
| bordered | 是否有边框 | `boolean` | `true` |
| className | 选择器 className | `string` | `-` |
| dateRender | 自定义日期单元格的内容 | `(currentDate: moment, today: moment) => React.ReactNode` | `-` |
| disabled | 禁用 | `boolean` | `false` |
| disabledDate | 不可选择的日期 | `(currentDate: moment) => boolean` | `-` |
| dropdownClassName | 额外的弹出日历 className | `string` | `-` |
| getPopupContainer | 定义浮层的容器，默认为 body 上新建 div | `(trigger) => HTMLElement` | `-` |
| inputReadOnly | 设置输入框为只读（避免在移动设备上打开虚拟键盘） | `boolean` | `false` |
| mode | 日期面板的状态 | `time` \| `date` \| `month` \| `year` \| `decade` | `-` |
| open | 控制弹层是否展开 | `boolean` | `-` |
| panelRender | 自定义渲染面板 | `(panelNode) => React.ReactNode` | `-` |
| picker | 设置选择器类型 | `date` \| `week` \| `month` \| `quarter` \| `year` | `date` |
| placeholder | 输入框提示文字 | `string \| \[string, string]` | `-` |
| popupStyle | 额外的弹出日历样式 | `React.CSSProperties` | `{}` |
| size | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | `large` \| `middle` \| `small` | `-` |
| style | 自定义输入框样式 | `React.CSSProperties` | `{}` |
| suffixIcon | 自定义的选择框后缀图标 | `React.ReactNode` | `-` |
| onOpenChange | 弹出日历和关闭日历的回调 | `(open) => void` | `-` |
| onPanelChange | 日历面板切换的回调 | `(value, mode) => void` | `-` |
