## Alert 警告

```tsx
/**
 * title: Alert 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Alert } from 'kenshin';

export default () => <>
  <Alert title="不可关闭的 alert" type="success" closable={false} />
  <Alert title="自定义 close-text" type="info" closeText="知道了" />
  <Alert title="设置了回调的 alert" type="warning" onClose={() => alert('Hello World!')}/>
</>
```

```tsx
/**
 * title: Alert 带有辅助性文字介绍
 * desc: 包含标题和内容，解释更详细的警告。
 */
import React from 'react';
import { Alert } from 'kenshin';

export default () => <Alert
  closable={false}
  title="带辅助性文字介绍"
  type="error"
  description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰"
/>
```

<API/>

<style>
.kenshin-alert {
  margin: 10px;
}
</style>
