## Menu导航菜单

###### 为页面和功能提供导航的菜单列表。

## 何时使用

- 导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

- 可切换页码浏览数据。

## 代码演示

```tsx
/**
 * title: 顶部导航
 * desc: 水平的顶部导航菜单。
 */
import React from 'react';
import { Menu } from "kenshin"
const {SubMenu} = Menu;
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

export default () => {

  const [current,setCurrent] = React.useState('mail');

  return (
    <>
      <Menu onClick={(e) => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item>
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
          <SubMenu key="sub1" title="Item 3">
            <Menu.Item key="setting:5">Option 3-1</Menu.Item>
            <Menu.Item key="setting:6">Option 3-2</Menu.Item>
            <Menu.Divider/>
            <SubMenu key="sub1-1" title="Item 3-3">
              <Menu.Item key="setting:7">Option 3-3-1</Menu.Item>
              <Menu.Item key="setting:8">Option 3-3-2</Menu.Item>
          </SubMenu>
          </SubMenu>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="/#" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
    </>
  );
};
```


```tsx
/**
 * title: 内嵌菜单
 * desc: 垂直菜单，子菜单内嵌在菜单区域。
 */
import React from 'react';
import { Menu } from "kenshin"
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
const {SubMenu} = Menu;

export default () => {

  const [current,setCurrent] = React.useState('mail');

  return (
    <Menu
        onClick={(e) => console.log(e)}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
  );
};
```
```tsx
/**
 * title: 缩起内嵌菜单
 * desc: 内嵌菜单可以被缩起/展开。
 */
import React from 'react';
import { Button,Menu } from 'kenshin';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
const {SubMenu} = Menu;

export default () => {

  const [collapsed,setCollapsed] = React.useState(false);

  return (
    <div style={{ width: 256 }}>
        <Button type="primary" onClick={()=>setCollapsed(!collapsed)} style={{ marginBottom: 16 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Option 3
          </Menu.Item>
          <SubMenu key="sub1" onTitleClick={(e) => console.log(e)} icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
  );
};
```
```tsx
/**
 * title: 只展开当前父级菜单
 * desc: 点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。
 */
import React from 'react';
import { Button,Menu } from 'kenshin';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
const {SubMenu} = Menu;

export default () => {
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  const [openKeys, setOpenKeys] = React.useState(['sub1']);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 256 }}>
      <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  );
};
```
```tsx
/**
 * title: 垂直菜单
 * desc: 子菜单是弹出的形式。
 */
import React from 'react';
import { Button,Menu } from 'kenshin';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
  const {SubMenu} = Menu;

export default () => {

  return (
  <Menu onClick={(e) => console.log(e)} style={{ width: 256 }} mode="vertical">
    <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
      <Menu.ItemGroup title="Item 1">
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Iteom 2">
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
      <Menu.Item key="5">Option 5</Menu.Item>
      <Menu.Item key="6">Option 6</Menu.Item>
      <SubMenu key="sub3" title="Submenu">
        <Menu.Item key="7">Option 7</Menu.Item>
        <Menu.Item key="8">Option 8</Menu.Item>
      </SubMenu>
    </SubMenu>
    <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
      <Menu.Item key="9">Option 9</Menu.Item>
      <Menu.Item key="10">Option 10</Menu.Item>
      <Menu.Item key="11">Option 11</Menu.Item>
      <Menu.Item key="12">Option 12</Menu.Item>
    </SubMenu>
  </Menu>
  );
};
```
```tsx
/**
 * title: 主题
 * desc: 内建了两套主题 `light` 和 `dark`，默认 `light`。
 */
import React from 'react';
import { Switch,Menu } from 'kenshin';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const {SubMenu} = Menu;

export default () => {

  const [current, setCurrent] = React.useState('1');
  const [isDark, setIsDark] = React.useState(true);

  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
        <Switch
          checked={isDark}
          onChange={setIsDark}
          onText="Dark"
          offText="Light"
        />
        <br />
        <br />
        <Menu
          theme={isDark?'dark':''}
          onClick={handleClick}
          style={{ width: 256 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode="inline"
        >
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </>
  );
};
```

## API


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultOpenKeys | 初始展开的 SubMenu 菜单项 key 数组 | `string[]` | - |
| defaultSelectedKeys | 初始选中的菜单项 key 数组 | `string[]` | - |
| expandIcon | 自定义展开图标 | `ReactNode \| (props: SubMenuProps & { isSubMenu: boolean }) => ReactNode` | - |
| forceSubMenuRender | 在子菜单展示之前就渲染进 DOM | `boolean` | `false` |
| inlineCollapsed | inline 时菜单是否收起状态 | `boolean` | `-` |
| inlineIndent | inline 模式的菜单缩进宽度 | `number` | `24` |
| mode | 菜单类型，现在支持垂直、水平、和内嵌模式三种 | `vertical` \| `horizontal` \| `inline` | `vertical` |
| multiple | 是否允许多选 | `boolean` | `false` |
| openKeys | 当前展开的 SubMenu 菜单项 key 数组 | `string[]` | - |
| overflowedIndicator | 自定义 Menu 折叠时的图标 | `ReactNode` | - |
| selectable | 是否允许选中 | `boolean` | `true` |
| selectedKeys | 当前选中的菜单项 key 数组 | `string[]` | - |
| style | 根节点样式 | `CSSProperties` | - |
| subMenuCloseDelay | 用户鼠标离开子菜单后关闭延时，单位：秒 | `number` | `0.1` |
| subMenuOpenDelay | 用户鼠标进入子菜单后开启延时，单位：秒 | `number` | `0` |
| theme | 主题颜色 | `light` \| `dark` | `light` |
| triggerSubMenuAction | SubMenu 展开/关闭的触发行为 | `hover` \| `click` | `hover` |
| onClick | 点击 MenuItem 调用此函数 | `function({ item, key, keyPath, domEvent })` | - |
| onDeselect | 取消选中时调用，仅在 multiple 生效 | `function({ item, key, keyPath, selectedKeys, domEvent })` | - |
| onOpenChange | SubMenu 展开/关闭的回调 | `function(openKeys: string[])` | - |
| onSelect | 被选中时调用 | `function({ item, key, keyPath, selectedKeys, domEvent })` | -   |

> 更多属性查看 [rc-menu](https://github.com/react-component/menu#api)

### Menu.Item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| danger | 展示错误状态样式 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| icon | 菜单图标 | `ReactNode` | - |
| key | item 的唯一标志 | `string` | - |
| title | 设置收缩时展示的悬浮标题 | `string` | - |

### Menu.SubMenu

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子菜单的菜单项 | `Array&lt;MenuItem \| SubMenu>` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| icon | 菜单图标 | `ReactNode` | - |
| key | 唯一标志 | `string` | - |
| popupClassName | 子菜单样式，`mode="inline"` 时无效 | `string` | - |
| popupOffset | 子菜单偏移量，`mode="inline"` 时无效 | `[number, number]` | - |
| title | 子菜单项值 | `ReactNode` | - |
| onTitleClick | 点击子菜单标题 | `function({ key, domEvent })` | - |

### Menu.ItemGroup

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 分组的菜单项 | `MenuItem[]` | - |
| title | 分组标题 | `ReactNode` | - |

### Menu.Divider

菜单项分割线，只用在弹出菜单内。

