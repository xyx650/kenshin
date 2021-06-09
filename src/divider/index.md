## Divider 分割线


```tsx
/**
 * title: 水平分割线
 * desc: 默认为水平分割线，可在中间加入文字
 */
import React from 'react';
import { Divider } from 'kenshin';

export default () => <>
  <p className='p'>头上一片晴天，心中一个想念</p>
  <Divider/>
  <p className='p'>头上一片晴天，心中一个想念</p>
  <Divider/>
  <p className='p'>头上一片晴天，心中一个想念</p>
</>
```

```tsx
/**
 * title: 带文字的分割线
 * desc: 分割线中带有文字，可以用 `orientation` 指定文字位置。
 */
import React from 'react';
import { Divider } from 'kenshin';

export default () => <>
  <p className='p'>头上一片晴天，心中一个想念</p>
  <Divider orientation="left">left</Divider>
  <p className='p'>头上一片晴天，心中一个想念</p>
  <Divider>center</Divider>
  <p className='p'>头上一片晴天，心中一个想念</p>
  <Divider orientation="right">right</Divider>
  <p className='p'>头上一片晴天，心中一个想念</p>
</>
```


<API/>

<style>
.__dumi-default-previewer-demo {
  width: 650px;
}

.p {
  font-size: 14px;
  color: #999;
}
</style>
