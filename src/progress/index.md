## Progress 进度条

Demo:

```tsx
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
import React from 'react';
import { Progress } from 'kenshin';

export default () => <>
  <Progress type="circle" percentage={0} />
  <Progress type="circle" percentage={25} />
</>
```

<API/>
