## Alert 警告

```tsx
import React from 'react';
import { Alert } from 'kenshin';

export default () => <>
  <Alert title="不可关闭的 alert" type="success" closable={false} />
  <Alert title="自定义 close-text" type="info" closeText="知道了" />
  <Alert title="设置了回调的 alert" type="warning" onClose={() => alert('Hello World!')}/>
</>
```

<API/>

<style>
.kenshin-alert {
  margin: 10px;
}
</style>
