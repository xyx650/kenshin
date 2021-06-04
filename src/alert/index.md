## Alert 警告

```tsx
/**
 * title: Alert 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Alert } from 'kenshin';

export default () => <>
  <Alert title="成功提示的文案" type="success" />
  <Alert title="消息提示的文案" type="info" />
  <Alert title="警告提示的文案" type="warning" />
  <Alert title="错误提示的文案" type="error" />
</>
```

```tsx
/**
 * title: 带有辅助性文字介绍
 * desc: 包含`标题`和`内容`，解释更详细的警告。
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

```tsx
/**
 * title: 带有 icon 和辅助性文字介绍
 * desc: 这是一个同时具有`icon`和`辅助性文字`的样例。
 */
import React from 'react';
import { Alert } from 'kenshin';

export default () => <>
  <Alert title="成功提示的文案" type="success" description="文字说明文字说明文字说明文字说明文字说明文字说明" showIcon />
  <Alert title="消息提示的文案" type="info" description="文字说明文字说明文字说明文字说明文字说明文字说明" showIcon />
  <Alert title="警告提示的文案" type="warning" description="文字说明文字说明文字说明文字说明文字说明文字说明" showIcon />
  <Alert title="错误提示的文案" type="error" description="文字说明文字说明文字说明文字说明文字说明文字说明" showIcon />
</>
```

<API/>

<style>
.kenshin-alert {
  margin: 10px;
}
</style>
