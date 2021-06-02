## Card 卡片

```tsx
/**
 * title: Card 基本使用方式
 * desc: Card 组件包括 header 和 body 部分，header 部分需要有显式具名 slot 分发，同时也是可选的。
 */
import React from 'react';
import { Card } from 'kenshin';

export default () => <Card className="box-card" header="卡片名称">
  <div className="item">列表内容 1</div>
  <div className="item">列表内容 2</div>
  <div className="item">列表内容 3</div>
  <div className="item">列表内容 4</div>
</Card>
```

<API/>


<style>
.box-card {
  width: 400px;
}
.item {
  font-size: 14px;
  padding: 10px 0;
  color: #666;
}
</style>
