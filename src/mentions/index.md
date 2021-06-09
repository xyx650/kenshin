## Mentions 提及

###### 提及组件。

#

## 何时使用

###### 用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

#

#

## 代码演示

```tsx
/**
 * title: 基本使用。
 * desc: 基本使用。
 */
import React from 'react';
import { Mentions } from 'kenshin';
const { Option } = Mentions;
export default () => {
  return (
    <>
      <Mentions loading style={{ width: '100%' }} defaultValue="@afc163">
        <Option value="afc163">afc163</Option>
        <Option value="zombieJ">zombieJ</Option>
        <Option value="yesmeck">yesmeck</Option>
        <Option value="afc1632">afc163</Option>
        <Option value="zombieJ2">zombieJ</Option>
        <Option value="yesmeck2">yesmeck</Option>
      </Mentions>
    </>
  );
};
```

```tsx
/**
 * title: 异步加载
 * desc: 匹配内容列表为异步返回时。
 */
import React from 'react';
import { Mentions } from 'kenshin';
const { Option } = Mentions;

export default () => {
  const [loading, setLoading] = React.useState(false);
  const Change = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      <Mentions
        style={{ width: '100%' }}
        defaultValue="@afc163"
        onChange={Change}
        loading={loading}
      >
        <Option value="afc163">afc163</Option>
        <Option value="zombieJ">zombieJ</Option>
        <Option value="yesmeck">yesmeck</Option>
        <Option value="afc1632">afc163</Option>
        <Option value="zombieJ2">zombieJ</Option>
        <Option value="yesmeck2">yesmeck</Option>
      </Mentions>
    </>
  );
};
```

```tsx
/**
 * title: 自定义触发字符
 * desc: 通过 prefix 属性自定义触发字符。默认为 @, 可以定义为数组。
 */
import React from 'react';
import { Mentions } from 'kenshin';
const { Option } = Mentions;

const MOCK_DATA = {
  '@': ['afc163', 'zombiej', 'yesmeck'],
  '#': ['1.0', '2.0', '3.0'],
};

export default () => {
  const [prefix, setPrefix] = React.useState('@');

  const onSearch = (_, prefix) => {
    setPrefix(prefix);
  };

  return (
    <>
      <Mentions
        style={{ width: '100%' }}
        prefix={['@', '#']}
        onSearch={onSearch}
        placeholder="请输入@提到人，#号提到标签"
      >
        {(MOCK_DATA[prefix] || []).map(value => (
          <Option key={value} value={value}>
            {value}
          </Option>
        ))}
      </Mentions>
    </>
  );
};
```

```tsx
/**
 * title: 无效或只读
 * desc: 通过 disabled 属性设置是否生效。通过 readOnly 属性设置是否只读。
 */
import React from 'react';
import { Mentions } from 'kenshin';
const { Option } = Mentions;

export default () => {
  return (
    <>
      <Mentions
        style={{ width: '100%', marginBottom: 10 }}
        disabled
        placeholder="disabled不可操作"
      ></Mentions>
      <Mentions style={{ width: '100%' }} readOnly placeholder="readOnly设置只读属性">
        <Option value="afc163">afc163</Option>
        <Option value="zombieJ">zombieJ</Option>
        <Option value="yesmeck">yesmeck</Option>
        <Option value="afc1632">afc163</Option>
        <Option value="zombieJ2">zombieJ</Option>
        <Option value="yesmeck2">yesmeck</Option>
      </Mentions>
    </>
  );
};
```

```tsx
/**
 * title: 向上展开
 * desc: 向上展开建议。
 */
import React from 'react';
import { Mentions } from 'kenshin';
const { Option } = Mentions;

export default () => {
  return (
    <>
      <Mentions placement="top" placeholder="向上展开建议。" style={{ width: '100%' }}></Mentions>
    </>
  );
};
```

<API/>

## API

######

| Name              | Description                   | Type                                                       | Default   |
| ----------------- | ----------------------------- | ---------------------------------------------------------- | --------- |
| loading           | 加载中                        | boolean                                                    | --        |
| autoFocus         | 自动获得焦点                  | boolean                                                    | false     |
| autoSize          | 自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 } boolean \| object | false     |
| defaultValue      | 默认值                        | string                                                     | --        |
| filterOption      | 自定义过滤逻辑                | false \| ((input: string, option: OptionProps) => boolean) | --        |
| getPopupContainer | 指定建议框挂载的              | HTML 节点 \| () => HTMLElement                             | --        |
| notFoundContent   | 当下拉列表为空时显示的内容    | ReactNode                                                  | Not Found |
| placement         | 弹出层展示位置                | "top" \| "bottom"                                          | bottom    |
| direction         | 设置弹出方向                  | "ltr" \| "rtl"                                             | ltr       |
| prefix            | 设置触发关键字                | string \| string[]                                         | @         |
| split             | 设置选中项前后分隔符          | string                                                     | --        |
| validateSearch    | 自定义触发验证逻辑            | (text: string, props: MentionsProps) => boolean            | --        |
| value             | 设置值                        | string                                                     | --        |
| onBlur            | 失去焦点时触发                | FocusEventHandler< Element>                                | --        |
| onChange          | 值改变时触发                  | (text: string) => void                                     | --        |
| onFocus           | 获得焦点时触发                | FocusEventHandler< Element>                                | --        |
| onSearch          | 搜索时触发                    | (text: string, prefix: string) => void                     | --        |
| onSelect          | 选择选项时触发                | (option: any, prefix: string) => void                      | --        |
| className         | 类名                          | string                                                     | --        |
| disabled          | 设置不可操作                  | boolean                                                    | --        |

### Mentions 方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |

### Option

| 参数     | 说明           | 类型      | 默认值 |
| -------- | -------------- | --------- | ------ |
| children | 选项内容       | ReactNode | -      |
| value    | 选择时填充的值 | string    | -      |
