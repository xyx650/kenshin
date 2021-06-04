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
      <Mentions style={{ width: '100%' }} defaultValue="@afc163">
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
 * <codesrc="/path/to/Demo.tsx"/>
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
