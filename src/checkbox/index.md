## Checkbox 复选框

```tsx
/**
 * title: 基本使用方式
 * desc: 单独使用可以表示两种状态之间的切换
 */
import React from 'react';
import { Checkbox } from 'kenshin';

export default () => <>
  <Checkbox checked>选项1</Checkbox>
  <Checkbox>选项2</Checkbox>
</>
```

```tsx
/**
 * title: indeterminate 状态
 * desc: indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果
 * debug: true
 */
import React from 'react';
import { Checkbox } from 'kenshin';

const cities = ['上海', '北京', '广州', '深圳']
export default () => {
  // const [state, setState] = React.useState({
  //   checkAll: false,
  //   isIndeterminate: true,
  //   checkedCities: ['上海', '北京']
  // })

  const [checkAll, setCheckAll] = React.useState(false)
  const [isIndeterminate, setIsIndeterminate] = React.useState(true)
  const [checkedCities, setCheckedCities] = React.useState<string[]>(['上海', '北京'])

  // React.useEffect(() => {
  //   // console.log(checkAll, 'effect')
  // }, [checkAll])

  const handleCheckedCitiesChange = value => {
    // console.log(checkedCities, 'handleChecked---CitiesChange')
    // console.log(cities.length, 'cities.length')
    // console.log(value.length, 'value.length')
    //
    // setCheckedCities(checkedCities => checkedCities)
    // setCheckAll(() => value.length === cities.length)
    // setIsIndeterminate(() => value.length && value.length < cities.length)
  }

  const handleCheckAllChange = checked => {
    // console.log(checked, 'isCheckAll')
    // console.log(checkedCities, 'isCheckAll-checkedCities')
    // setCheckAll(checked)
    // setIsIndeterminate(false)
    // setCheckedCities(checked ? ['上海', '北京', '广州', '深圳'] : [])
  }


  return <>
    <Checkbox
      style={{ marginBottom: '10px' }}
      checked={checkAll}
      indeterminate={isIndeterminate}
      onChange={handleCheckAllChange}
    >全选</Checkbox>
    <Checkbox.Group
      value={checkedCities}
      onChange={handleCheckedCitiesChange}
    >
      {cities.map((city, index) => <Checkbox key={index} label={city}></Checkbox>)}
    </Checkbox.Group>
  </>
}
```

```tsx
/**
 * title: Checkbox.Group 多选框组
 * desc: Checkbox.Group元素能把多个 checkbox 管理为一组，只需要在 Group 中使用`value`绑定Array类型的变量即可，label属性除了改变 checkbox 按钮后的介绍外，同时也是该 checkbox 对应的值，label与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。
 */
import React from 'react';
import { Checkbox } from 'kenshin';

const cities = ['上海', '北京', '广州', '深圳']

const handleChange = value => {
  console.log(value)
}

export default () => <Checkbox.Group value={['上海', '北京']} max={3} onChange={handleChange}>
  {cities.map((city, index) => <Checkbox key={index} label={city} />)}
</Checkbox.Group>
```

```tsx
/**
 * title: 按钮样式的多选组合
 * desc: 只需要把Checkbox元素替换为Checkbox.Button元素即可。
 */
import React from 'react';
import { Checkbox } from 'kenshin';

const cities = ['上海', '北京', '广州', '深圳']

const handleChange = value => {
  console.log(value)
}

export default () => <Checkbox.Group value={['上海', '北京']} onChange={handleChange}>
  {cities.map((city, index) => <Checkbox.Button key={index} label={city} />)}
</Checkbox.Group>
```

## API

### Checkbox

| Name | Description | Type | Default |
| ------------- | --------------- | ------------------------------------------------------------ |----------------- |
| label | 选中状态的值（只有在Checkbox.Group或者绑定对象类型为array时有效） | `string`  | `--` |
| trueLabel | 选中时的值 | `string \| number`|     `--`       |
| falseLabel | 没有选中时的值 | `string \| number`|      `--`          |
| disabled | 禁用状态 | `boolean`                                                      |  `false`  |
| loading | 加载状态 | `boolean`                                                      |   `false`  |
| disabled | 禁用状态| `boolean`                                                      |  `false`  |
| checked | 当前是否勾选 | `boolean`|   `false` |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | `boolean`             |   `false` |
| className | 自定义样式类 | `string`                                                       |  `--`  |
| style | 自定义样式类| `React.CSSProperties`                                          |  `--`  |
| prefixCls | 自定义样式前缀 | `string`|  `--`  |

### Checkbox.Group

| Name          | Description     | Type                                                         |    Default       |
| ------------- | --------------- | ------------------------------------------------------------ |----------------- |
| value         | 指定选中的选项     | `string[]`                                                   | `default` |
| size          | 尺寸             | `large \| small \| mini`                                     |     `--`       |
| fill          | 按钮激活时的填充色和边框色       |  `string`                                        |      `#20a0ff`          |
| textColor     | 按钮激活时的文本颜色    | `string`                                                  |  `#ffffff`  |
| max           | 可被勾选的 checkbox 的最大数量  | `number`                                                      |   `--`  |
| min           | 可被勾选的 checkbox 的最小数量  | `number`                                                      |  `--`  |
| onChange      | 当绑定值变化时触发的事件  | `(value: string[]) => void`                                      |  `--`  |

