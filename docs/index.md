# Welcome to use kenshin

## What is the kenshin UI

`kenshin` 是基于 Kenshin Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。

- 🌈 提炼自企业级中后台产品的交互语言和视觉风格。
- 📦 开箱即用的高质量 React 组件。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- ⚙️ 全链路开发和设计工具体系。
- 🌍 数十个国际化语言支持。
- 🎨 深入每个细节的主题定制能力。

## How to use kenshin

#### 使用 npm 或 yarn 安装

我们推荐使用 npm 或 yarn 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install kenshin --save
```

```bash
yarn add kenshin
```

#### 浏览器引入

在浏览器中使用 script 和 link 标签直接引入文件，并使用全局变量 kenshin。

我们在 npm 发布包内的 antd/dist 目录下提供了 kenshin.js kenshin.css 以及 kenshin.min.js kenshin.min.css。你也可以通过 CDNJS， 或 UNPKG 进行下载。

> 强烈不推荐使用已构建文件，这样无法按需加载，而且难以获得底层依赖模块的 bug 快速修复支持。<br>
> 注意：antd.js 和 antd.min.js 依赖 react/react-dom/moment，请确保提前引入这些文件。
