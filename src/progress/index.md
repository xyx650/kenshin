## Progress 进度条

```tsx
/**
 * title: Progress 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Progress } from 'kenshin';

export default () => <>
  <Progress percentage={30} />
  <Progress percentage={70} />
  <Progress percentage={100} status="success" />
  <Progress percentage={50} status="exception" />
</>
```

```tsx
/**
 * title: 百分比内显
 * desc:  百分比不占用额外控件，适用于文件上传等场景。
 */
import React from 'react';
import { Progress } from 'kenshin';

export default () => <>
  <Progress strokeWidth={18} percentage={0} textInside />
  <Progress strokeWidth={18} percentage={70} textInside />
  <Progress strokeWidth={18} percentage={100} status="success" textInside />
  <Progress strokeWidth={18} percentage={50} status="exception" textInside />
</>
```

```tsx
/**
 * title: 环形进度条
 * desc:  添加 `type="circle"` 设置形状为环形
 */
import React from 'react';
import { Progress } from 'kenshin';

export default () => <>
  <Progress type="circle" percentage={0} />
  <Progress type="circle" percentage={25} />
  <Progress type="circle" percentage={100} status="success" />
  <Progress type="circle" percentage={50} status="exception" />
</>
```



<API/>

<style>
.__dumi-default-previewer-demo {
  width: 650px;
}

.kenshin-progress {
  margin: 15px;
}
</style>
