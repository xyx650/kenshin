## Slider 滑块

Demo:

```tsx
import React from 'react';
import { Slider } from 'kenshin';

export default () => <Slider value={50}/>;
```

<API></API>

<style>

#rate-demo .kenshin-row {
  margin-bottom: 10px;
}
#rate-demo .kenshin-button + .kenshin-rate {
  margin-left: 10px;
}
#rate-demo .kenshin-rate-group {
  margin-bottom: 20px;
}

#rate-demo .kenshin-rate__icon  + .kenshin-rate__icon {
  margin-left: 0;
}

#rate-demo .kenshin-rate__icon {
  margin-left: 5px;
}

#rate-demo .intro-block {
  overflow: hidden;
  margin: -24px;
  padding: 0;
}

#rate-demo .intro-block .block {
  padding: 30px 0;
  text-align: center;
  border-right: 1px solid #eff2f6;
  float: left;
  width: 50%;
  box-sizing: border-box;

}
#rate-demo .intro-block .block:last-child { border-bottom: none; }


#rate-demo .intro-block .demonstration {
  font-size: 14px;
  color: #8492a6;
  line-height: 44px;
}

#rate-demo .intro-block .wrapper {
  margin-right: 20px;
}

</style>
