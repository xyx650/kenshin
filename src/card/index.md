## Card 卡片

```tsx
/**
 * title: 基本使用方式
 * desc: Card 组件包括 `header` 和 `body` 部分，header 需要传入 React.ReactNode，同时也是可选的。
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

```tsx
/**
 * title: 可配置定义更丰富的内容展示
 * desc: 配置`body-style`属性来自定义 body 部分的 style，我们还使用了布局组件。
 */
import React from 'react';
import { Card, Button } from 'kenshin';

export default () => <Card bodyStyle={{ padding: 0 }} style={{ display: 'inline-block' }}>
  <img
    src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.mianfeiwendang.com%2Fpic%2F380f083302a80ec7c240a84c%2F1-434-png_6_0_0_135_156_652_488_892.979_1262.879-580-0-0-580.jpg&refer=http%3A%2F%2Fwww.mianfeiwendang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625283182&t=e0e3e32e64b619c44a378ce8cc5f6a5d'
    className="image" />
  <div style={{ padding: 14 }}>
    <span className='pic-title'>一只大菜🐶</span>
    <div className="card-demo">
      <time className="time">2022-10-22 22:22</time>
      <Button type="success">原谅色</Button>
    </div>
  </div>
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
.card-demo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pic-title{
  font-size: 20px;
}
.time {
  font-size: 14px;
  color: #999;
}
.image {
  width: 300px;
}
</style>
