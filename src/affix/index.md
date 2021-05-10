## Affix 固钉

```tsx
/**
 * title: Affix 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Affix, Button } from 'kenshin';

export default () => {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null)

  return <div className="scrollable-container" ref={setContainer}>
    <div className="background">
      <Affix target={() => container}>
        <Button type="primary">固定在顶部</Button>
      </Affix>
    </div>
  </div>
}
```

<API/>

<style>
.scrollable-container{
  height: 100px;
  overflow-y: scroll;
}

.background{
  padding-top: 60px;
  height: 300px;
  background-image: url('https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg');
}
</style>
