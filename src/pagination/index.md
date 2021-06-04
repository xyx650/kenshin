## Pagination 分页

###### 采用分页的形式分隔长列表，每次只加载一个页面。

## 何时使用

- 当加载/渲染所有数据将花费很多时间时；

- 可切换页码浏览数据。

## 代码演示

```tsx
/**
 * title: Pagination 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Pagination } from 'kenshin';

export default () => {
  return (
    <>
      <Pagination total={25} showSizeChanger />
    </>
  );
};
```

```tsx
/**
 * title: 简洁
 * desc: 简单的翻页
 */
import React from 'react';
import { Pagination } from 'kenshin';

export default () => {
  return (
    <>
      <Pagination total={250} pageSize={2} simple />
    </>
  );
};
```

```tsx
/**
 * title: 不可操作
 * desc: disable不可操作,defaultCurrent默认显示第几页
 */
import React from 'react';
import { Pagination } from 'kenshin';

export default () => {
  return (
    <>
      <Pagination defaultCurrent={5} total={250} disabled />
    </>
  );
};
```

```tsx
/**
 * title: 迷你
 * desc: 设置size来控制大小
 */
import React from 'react';
import { Pagination } from 'kenshin';

export default () => {
  return (
    <>
      <Pagination total={250} size="small" />
    </>
  );
};
```

```tsx
/**
 * title: 总数
 * desc: 通过设置 showTotal 展示总共有多少数据。
 */
import React from 'react';
import { Pagination } from 'kenshin';

export default () => {
  return (
    <>
      <Pagination total={250} showTotal={(total, _range) => `共${total}条记录`} />
    </>
  );
};
```

```tsx
/**
 * title: 跳转
 * desc: 通过设置 showQuickJumper 快速跳转到某一页
 */
import React from 'react';
import { Pagination } from 'kenshin';

export default () => {
  return (
    <>
      <Pagination total={250} showTotal={(total, _range) => `共${total}条记录`} showQuickJumper />
    </>
  );
};
```

```tsx
/**
 * title: 上一步和下一步
 * desc: 修改上一步和下一步为文字链接。
 */
import React from 'react';
import { Pagination } from 'kenshin';

export default () => {
  function itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  }

  return (
    <>
      <Pagination total={25} itemRender={itemRender} />
    </>
  );
};
```

<API/>
