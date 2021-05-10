---
title: Tag 标签
toc: content
---

## Tag 标签

```tsx
/**
 * title: 基本使用方式
 * desc: 由type属性来选择tag的类型，也可以通过color属性来自定义背景色。
 */
import React from 'react';
import { Tag } from 'kenshin';

export default () => {

  return <>
    <Tag>标签一</Tag>
    <Tag type="gray">标签二</Tag>
    <Tag type="primary">标签三</Tag>
    <Tag type="success">标签四</Tag>
    <Tag type="warning">标签五</Tag>
    <Tag type="danger">标签六</Tag>
  </>
}
```

```tsx
/**
 * title: 可移除标签
 * desc: 设置closable属性来定义一个可移除的标签，接受一个Boolean，设置为true即可。设置close事件可以处理关闭后的回调函数。
 */
import React from 'react';
import { Tag } from 'kenshin';

export default () => {
  const [tags, setTags] = React.useState([
    { key: 1, name: '标签一', type: '' },
    { key: 2, name: '标签二', type: 'gray' },
    { key: 5, name: '标签三', type: 'primary' },
    { key: 3, name: '标签四', type: 'success' },
    { key: 4, name: '标签五', type: 'warning' },
    { key: 6, name: '标签六', type: 'danger' }
  ])

  const handleClose = tag => {
    const newTags = tags.filter(el => el.key !== tag.key)
    setTags(newTags)
  }

  return <>
    {
      tags.map(tag => <Tag
        key={tag.key}
        closable
        type={tag.type}
        onClose={() => handleClose(tag)}>{tag.name}
      </Tag>)
    }
  </>
}
```

<API/>

<style>
.kenshin-tag{
  margin-right: 10px;
}
</style>
