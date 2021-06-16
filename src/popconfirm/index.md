## Popconfirm 气泡确认框

```tsx
/**
 * title: 基本用法
 * desc: 基本用法
 */
import React from 'react';
import { Popconfirm } from 'kenshin';

export default () => <Popconfirm title="are you sure？">
  <span>点击</span>
</Popconfirm>
```

```tsx
/**
 * title: 自定义按钮文字
 * desc: 使用 `okText` 和 `cancelText` 自定义按钮文字。
 */
import React from 'react';
import { Popconfirm, Button } from 'kenshin';

export default () => <Popconfirm
  title="确认删除？"
  okText="是"
  cancelText="否"
>
  <Button type='danger'>删除</Button>
</Popconfirm>
```

```tsx
/**
 * title: 自定义 Icon 图标
 * desc: 自定义 `Icon` 图标
 */
import React from 'react';
import { Popconfirm, Button } from 'kenshin';
import { QuestionCircleOutlined } from '@ant-design/icons'

export default () => <Popconfirm
  title="确认删除？"
  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
>
  <Button type='danger'>删除</Button>
</Popconfirm>
```

```tsx
/**
 * title: 异步关闭
 * desc: 点击确定后异步关闭气泡确认框，例如提交表单。
 */
import React from 'react';
import { Popconfirm, Button } from 'kenshin';

export default () => {

  const [visible, setVisible] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false)

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }


  return <Popconfirm
    title="确认删除？"
    okButtonProps={{ loading: confirmLoading }}
    onConfirm={handleOk}
    onCancel={ () => setVisible(false) }
    okType="danger"
    visible={visible}
  >
    <Button type='danger' onClick={ () => setVisible(true) }>删除</Button>
  </Popconfirm>
}
```

## API

| Name          | Description     | Type                                                         |    Default       |
| --- | --- | --- | --- |
| cancelText | 取消按钮文字 | `string` | `取消` |
| cancelButtonProps | ok 按钮 props | `同 Button` | - |
| disabled | 阻止点击 Popconfirm 子元素时弹出确认框 | `boolean` | `false` |
| icon | 自定义弹出气泡 Icon 图标 | `React.ReactNode` | `<ExclamationCircle />` |
| okText | 确认按钮文字 | `string` | `确定` |
| okType | 确认按钮类型 | `同 Button 支持的类型` | `primary` |
| okButtonProps | ok 按钮 props | `同 Button` | - |
| title | 确认框的描述 | `React.ReactNode \| () => React.ReactNode` | - |
| onCancel | 点击取消的回调 | `() => void` | - |
| onConfirm | 点击确认的回调 | `() => void` | - |
