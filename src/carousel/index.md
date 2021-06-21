## Carousel 走马灯

###### 提及组件。

#

## 何时使用

###### 用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

#

#

## 代码演示

```tsx
/**
 * title: 基本使用。
 * desc: 基本使用。
 */
import React from 'react';
import { Card, Carousel } from 'kenshin';
export default () => {
  return (
    <Card header="banner卡片">
      <Carousel autoplay>
        {new Array(6).fill('').map((_, index) => (
          <div key={index}>
            <div style={{ background: '#DEEEFF', height: '200px' }}>{index + 1}</div>
          </div>
        ))}
      </Carousel>
    </Card>
  );
};
```

```tsx
/**
 * title: 渐显
 * desc: 切换效果为渐显。
 */
import React from 'react';
import { Card, Carousel } from 'kenshin';
export default () => {
  return (
    <Card header="渐显">
      <Carousel autoplay effect="fade" showIcon={false} dotsType="dots">
        {new Array(6).fill('').map((_, index) => (
          <div key={index}>
            <div style={{ background: '#DEEEFF', height: '200px' }}>{index + 1}</div>
          </div>
        ))}
      </Carousel>
    </Card>
  );
};
```

```tsx
/**
 * title: 卡片化切换
 * desc: 卡片化切换
 */
import React from 'react';
import { Card, Carousel } from 'kenshin';
export default () => {
  const contentStyle = {
    margin: 10,
    background: '#DEEEFF',
    height: '300px',
  };

  return (
    <Card header="卡片化切换">
      <Carousel type="card" dotPosition="outside">
        {new Array(6).fill('').map((_, index) => (
          <div key={index}>
            <h3 style={contentStyle}>{index + 1}</h3>
          </div>
        ))}
      </Carousel>
    </Card>
  );
};
```

```tsx
/**
 * title: 指标卡片
 * desc: dotPosition为vertical，可以垂直移动，slidesToShow设置显示一页显示多少，slidesToScroll设置滚动数量
 */
import React from 'react';
import { Card, Carousel } from 'kenshin';
export default () => {
  const contentStyle = {
    background: '#DEEEFF',
    height: '170px',
    width: '30%',
  };

  return (
    <Card header="指标卡片">
      <Carousel slidesToShow={2} slidesToScroll={2} dotPosition="vertical" dotsType="dots">
        {new Array(6).fill('').map((_, index) => (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <h3 style={contentStyle}>{index + 1}</h3>
              <h3 style={contentStyle}>{index + 1}</h3>
              <h3 style={contentStyle}>{index + 1}</h3>
            </div>
          </div>
        ))}
      </Carousel>
    </Card>
  );
};
```

```tsx
/**
 * title: 自定义走马灯。
 * desc: 可以自定义轮播内容。
 */
import React from 'react';
import { Card, Carousel } from 'kenshin';
export default () => {
  const contentStyle = {
    box: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    image: {
      width: '45%',
      height: '80px',
      background: '#DEEEFF',
      marginBottom: '20px',
    },
    video: {
      width: '100%',
      height: '165px',
      background: '#DEEEFF',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  };

  return (
    <Card
      header="视频卡片"
      style={{ width: '500px' }}
      showIcon={false}
      extra={<a href="#">更多</a>}
    >
      <Carousel dotPosition="outside" dotsType="dots">
        {new Array(4).fill('').map((_, index) => (
          <div key={index}>
            <div style={contentStyle.box}>
              <div style={contentStyle.image}></div>
              <div style={contentStyle.image}></div>
              <div style={contentStyle.video}>
                <svg
                  t="1623226842179"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1729"
                  width="67"
                  height="67"
                >
                  <path
                    d="M511.996 1.28C229.933 1.28 1.276 229.937 1.276 512s228.657 510.72 510.72 510.72c282.07 0 510.72-228.657 510.72-510.72 0.004-282.067-228.65-510.72-510.72-510.72z m249.46 520.727c-25.906 15.157-329.382 192.31-344.566 201.08-18.953 10.96-38.122-2.982-38.122-21.717V298.4c0-20.641 21.186-30.664 37.342-21.583 22.07 12.371 326.692 190.424 345.345 201.534 16.733 9.969 17.006 33.703 0 43.656z"
                    fill="#FFFFFF"
                    p-id="1730"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </Card>
  );
};
```

## API

| 参数           | 说明                                                                | 类型                                  | 默认值      |
| -------------- | ------------------------------------------------------------------- | ------------------------------------- | ----------- |
| autoplay       | 是否自动切换                                                        | `boolean`                             | `false`     |
| dotPosition    | 面板指示点位置，可选 `include` `outside` `vertical`                 | `string`                              | `include`   |
| dots           | 是否显示面板指示点，如果为 `object` 则同时可以指定 `dotsClass` 或者 | `boolean` \| `{ className?: string }` | `true`      |
| easing         | 动画效果                                                            | `string`                              | `linear`    |  |
| effect         | 动画效果函数                                                        | `scrollx` \| `fade`                   | `scrollx`   |
| afterChange    | 切换面板的回调                                                      | `function(current)`                   | -           |
| beforeChange   | 切换面板的回调                                                      | `function(from, to)`                  | -           |
| slidesToShow   | 一帧要放映多少张幻灯片                                              | `number`                              | `1`         |
| slidesToScroll | 一次可以滚动多少张幻灯片                                            | `number`                              | `1`         |
| showIcon       | 是否显示左右切换按钮                                                | `boolean`                             | `true`      |
| dotsType       | 设置指示器样式，点阵`dots`和矩形`rectangle`                         | `dots \| rectangle`                   | `rectangle` |

## 方法

| 名称                           | 描述                                              |
| ------------------------------ | ------------------------------------------------- |
| goTo(slideNumber, dontAnimate) | 切换到指定面板, dontAnimate = true 时，不使用动画 |
| next()                         | 切换到下一面板                                    |
| prev()                         | 切换到上一面板                                    |
