## Loading 加载

```tsx
/**
 * title: Loading 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Loading } from 'kenshin';


export default () => {
  const [loading, setLoading] = React.useState(true)
  setTimeout(() => setLoading(false), 3000)

  return <Loading loading={loading} text='Disappear in 3 seconds'>
    <div style={{ padding: '20px' }}>loading content</div>
  </Loading>
}
```

<API/>
