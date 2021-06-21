## Tabs 标签页

###### 选项卡切换组件。

## 何时使用

###### 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

#

#

- 卡片式的页签，提供可关闭的样式，常用于容器顶部。

- 既可用于容器顶部，也可用于容器内部，是最通用的 Tabs。

## 代码演示

```tsx
/**
 * title: 基本
 * desc: 默认选中第一项。
 */
import React from 'react';
import { Tabs, Button } from 'kenshin';
const { TabPane } = Tabs;

export default () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Tab 1" key="1">
        Tab 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Tab 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Tab 3
      </TabPane>
    </Tabs>
  );
};
```

```tsx
/**
 * title: 禁用
 * desc: 禁用某一项。
 */
import React from 'react';
import { Tabs, Button } from 'kenshin';
const { TabPane } = Tabs;

export default () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Tab 1" key="1">
        Tab 1
      </TabPane>
      <TabPane tab="Tab 2" disabled key="2">
        Tab 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Tab 3
      </TabPane>
    </Tabs>
  );
};
```

```tsx
/**
 * title: 居中
 * desc: 标签居中展示
 */
import React from 'react';
import { Tabs, Button } from 'kenshin';
const { TabPane } = Tabs;

export default () => {
  return (
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};
```

```tsx
/**
 * title: 滑动
 * desc: 可以左右、上下滑动，容纳更多标签
 */
import React from 'react';
import { Tabs, Button } from 'kenshin';
const { TabPane } = Tabs;

export default () => {
  const [mode, setMode] = React.useState('top');

  return (
    <div>
      <Button.Group>
        <Button type="plain" onClick={() => setMode('top')}>
          Horizontal
        </Button>
        <Button type="plain" onClick={() => setMode('left')}>
          Vertical
        </Button>
      </Button.Group>
      <Tabs defaultActiveKey="1" tabPosition={mode} style={{ height: 220 }}>
        {[...Array.from({ length: 30 }, (v, i) => i)].map(i => (
          <TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
            Content of tab {i}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
```

```tsx
/**
 * title: 附加内容
 * desc: 可以在页签两边添加附加操作。
 */
import React from 'react';
import { Tabs, Button } from 'kenshin';
const { TabPane } = Tabs;

const OperationsSlot = {
  left: <Button style={{ marginRight: 16 }}>Left Extra Action</Button>,
  right: <Button>Right Extra Action</Button>,
};

export default () => {
  return (
    <>
      <Tabs tabBarExtraContent={OperationsSlot}>
        <TabPane tab="Tab 1" key="1">
          Content of tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of tab 3
        </TabPane>
      </Tabs>
    </>
  );
};
```

```tsx
/**
 * title: 位置
 * desc: 有四个位置，`tabPosition="left|right|top|bottom"`
 */
import React from 'react';
import { Tabs, Button } from 'kenshin';
const { TabPane } = Tabs;

export default () => {
  const [tabPosition, setTabPosition] = React.useState('top');

  return (
    <>
      Tab position：
      <Button.Group style={{ marginBottom: '30px' }}>
        <Button type="plain" onClick={() => setTabPosition('top')}>
          top
        </Button>
        <Button type="plain" onClick={() => setTabPosition('bottom')}>
          bottom
        </Button>
        <Button type="plain" onClick={() => setTabPosition('left')}>
          left
        </Button>
        <Button type="plain" onClick={() => setTabPosition('right')}>
          right
        </Button>
      </Button.Group>
      <Tabs tabPosition={tabPosition}>
        <TabPane tab="Tab 1" key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </>
  );
};
```

```tsx
/**
 * title: 大小
 * desc: 大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。
 */
import React from 'react';
import { Tabs, Button } from 'kenshin';
const { TabPane } = Tabs;

export default () => {
  const [size, setSize] = React.useState('top');

  return (
    <>
      <Button.Group style={{ marginBottom: '30px' }}>
        <Button type="plain" onClick={() => setSize('small')}>
          small
        </Button>
        <Button type="plain" onClick={() => setSize('default')}>
          default
        </Button>
        <Button type="plain" onClick={() => setSize('large')}>
          large
        </Button>
      </Button.Group>
      <Tabs size={size}>
        <TabPane tab="Tab 1" key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </>
  );
};
```

```tsx
/**
 * title: 卡片式页签
 * desc: 另一种样式的页签，不提供对应的垂直样式。
 */
import React from 'react';
import { Tabs, Button } from 'kenshin';
const { TabPane } = Tabs;

export default () => {
  return (
    <Tabs defaultActiveKey="1" type="card">
      <TabPane tab="Tab 1" key="1">
        Tab 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Tab 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Tab 3
      </TabPane>
    </Tabs>
  );
};
```

```tsx
/**
 * title: 新增和关闭页签
 * desc: 只有卡片样式的页签支持新增和关闭选项。使用 `closable={false}` 禁止关闭。
 */
import React from 'react';
import { Tabs, Button } from 'kenshin';
const { TabPane } = Tabs;

const initialPanes = [
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  {
    title: 'Tab 3',
    content: 'Content of Tab 3',
    key: '3',
    closable: false,
  },
];

export default () => {
  const [activeKey, setActiveKey] = React.useState(initialPanes[0].key);
  const [panes, setPanes] = React.useState(initialPanes);

  const onEdit = (targetKey, action) => {
    action == 'add' ? add(targetKey) : remove(targetKey);
  };

  const add = async () => {
    const newPanes = [...panes];
    const newActiveKey = +newPanes[newPanes.length - 1].key + 1;
    newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: newActiveKey });

    await setPanes(newPanes);
  };

  const remove = targetKey => {
    const newPanes = [...panes];
    let index = newPanes.findIndex(item => item.key == targetKey);
    newPanes.splice(index, 1);
    setPanes(newPanes);
  };

  return (
    <Tabs type="editable-card" onChange={setActiveKey} activeKey={activeKey} onEdit={onEdit}>
      {panes.map(pane => (
        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
          {pane.content}
        </TabPane>
      ))}
    </Tabs>
  );
};
```

```tsx
/**
 * title: 自定义新增页签触发器
 * desc: 隐藏默认的页签增加图标，给自定义触发器绑定事件。
 */
import React from 'react';
import { Tabs, Button } from 'kenshin';
const { TabPane } = Tabs;

const initialPanes = [
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  {
    title: 'Tab 3',
    content: 'Content of Tab 3',
    key: '3',
    closable: false,
  },
];

export default () => {
  const [activeKey, setActiveKey] = React.useState(initialPanes[0].key);
  const [panes, setPanes] = React.useState(initialPanes);

  const onEdit = (targetKey, action) => {
    action == 'add' ? add(targetKey) : remove(targetKey);
  };

  const add = async () => {
    const newPanes = [...panes];
    const newActiveKey = +newPanes[newPanes.length - 1].key + 1;
    newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: newActiveKey });

    await setPanes(newPanes);
  };

  const remove = targetKey => {
    const newPanes = [...panes];
    let index = newPanes.findIndex(item => item.key == targetKey);
    newPanes.splice(index, 1);
    setPanes(newPanes);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={add}>ADD</Button>
      </div>
      <Tabs
        hideAdd
        onChange={setActiveKey}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
      >
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
```

## API

### Tabs

| 参数               | 说明                                                     | 类型                                                                                     | 默认值                    |
| ------------------ | -------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------- |
| activeKey          | 当前激活 tab 面板的 key                                  | `string`                                                                                 | -                         |
| addIcon            | 自定义添加按钮                                           | `ReactNode`                                                                              | -                         |
| centered           | 标签居中展示                                             | `boolean`                                                                                | `false`                   |
| defaultActiveKey   | 初始化选中面板的 key，如果没有设置 activeKey             | `string`                                                                                 | `第一个面板`              |
| hideAdd            | 是否隐藏加号图标，在 `type="editable-card"` 时有效       | `boolean`                                                                                | `false`                   |  |
| moreIcon           | 自定义折叠 icon                                          | `ReactNode`                                                                              | `&lt;EllipsisOutlined />` |
| renderTabBar       | 替换 TabBar，用于二次封装标签头                          | `(props: DefaultTabBarProps, DefaultTabBar: React.ComponentClass) => React.ReactElement` | -                         |
| size               | 大小，提供 `large` `default` 和 `small` 三种大小         | `string`                                                                                 | `default`                 |
| tabBarExtraContent | tab bar 上额外的元素                                     | `ReactNode \| {left?: ReactNode, right?: ReactNode}`                                     | -                         |
| tabBarGutter       | tabs 之间的间隙                                          | `number`                                                                                 | -                         |
| tabBarStyle        | tab bar 的样式对象                                       | `object`                                                                                 | -                         |
| tabPosition        | 页签位置，可选值有 `top` `right` `bottom` `left`         | `string`                                                                                 | `top`                     |
| type               | 页签的基本样式，可选 `line`、`card` `editable-card` 类型 | `string`                                                                                 | `line`                    |
| onChange           | 切换面板的回调                                           | `function(activeKey) {}`                                                                 | -                         |
| onEdit             | 新增和删除页签的回调，在 `type="editable-card"` 时有效   | `(targetKey, action): void`                                                              | -                         |
| onTabClick         | tab 被点击的回调                                         | `function(key: string, event: MouseEvent)`                                               | -                         |
| onTabScroll        | tab 滚动时触发                                           | `function({ direction: left \| right \| top \| bottom })`                                | -                         |

### Tabs.TabPane

| 参数        | 说明                                            | 类型        | 默认值  |
| ----------- | ----------------------------------------------- | ----------- | ------- |
| closeIcon   | 自定义关闭图标，`在 type="editable-card"`时有效 | `ReactNode` | -       |
| forceRender | 被隐藏时是否渲染 DOM 结构                       | `boolean`   | `false` |
| key         | 对应 activeKey                                  | `string`    | -       |
| tab         | 选项卡头显示文字                                | `ReactNode` | -       |
