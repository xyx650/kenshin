## ColorPicker 颜色选择器

```tsx
/**
 * title: 基础用法
 * desc: 有默认值
 */
import React from 'react';
import { ColorPicker } from 'kenshin';


export default () => {
  const [color,] = React.useState('#123456')
  const onChange = color => {
    console.log(color)
  }
  return <ColorPicker value={'#123456'} onChange={onChange} showAlpha/>
}
```


<API/>
