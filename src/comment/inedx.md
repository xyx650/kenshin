## Comment 评论

Demo:

```tsx
import React from 'react';
import { Comment } from 'kenshin';

export default () => <Comment
  avatar="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=514539531,3516651487&fm=26&gp=0.jpg"
  author="Richard"
  content="距离东京奥运会开幕只剩不到2个月的时间，但日本的疫情仍在持续蔓延，东京都、大阪府、京都府和兵库县的紧急状态已被延长至5月31日。"
  datetime={new Date('2021/05/25 22:53:58').toLocaleString('zh-CN', { hour12: false })}
/>
```


## API

| Name          | Description                 | Type                                                         |    Default       |
| ------------- | ----------------------------| ------------------------------------------------------------ |----------------- |
| actions       | 在评论内容下面呈现的操作项列表    | `ReactNode[]`                                                |     `--`         |
| author        | 要显示为注释作者的元素           | `ReactNode`                                                  |     `--`        |
| avatar        | 要显示为评论头像的元素           |  `ReactNode`                                                 |      `--`        |
| children      | 嵌套注释应作为注释的子项提供      | `ReactNode`                                                  |       `--`        |
| content       | 评论的主要内容                 | `ReactNode`                                                   |       `--`       |
| datetime      | 展示时间描述                   | `ReactNode`                                                   |       `--`       |
