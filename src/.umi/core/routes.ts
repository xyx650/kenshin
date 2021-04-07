// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/xyx650/Documents/kenshin/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'/Users/xyx650/Documents/kenshin/node_modules/@umijs/preset-dumi/lib/theme/layout')})],
    "component": (props) => React.createElement(
        dynamic({
          loader: async () => {
            const { default: getDemoRenderArgs } = await import(/* webpackChunkName: 'dumi_demos' */ '/Users/xyx650/Documents/kenshin/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
            const { default: Previewer } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi-theme-default/src/builtins/Previewer.tsx');
            const { default: demos } = await import(/* webpackChunkName: 'dumi_demos' */ '@@/dumi/demos');
            const { usePrefersColor } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi/theme');

            return props => {
              
      const renderArgs = getDemoRenderArgs(props, demos);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
            }
          }
        }), props)
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'/Users/xyx650/Documents/kenshin/node_modules/@umijs/preset-dumi/lib/theme/layout')}), dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'/Users/xyx650/Documents/kenshin/node_modules/dumi-theme-default/src/layout.tsx')})],
    "routes": [
      {
        "path": "/button",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'button__index.md' */'/Users/xyx650/Documents/kenshin/src/button/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/button/index.md",
          "updatedTime": 1617098641000,
          "componentName": "button",
          "slugs": [
            {
              "depth": 3,
              "value": "Button 按钮",
              "heading": "button-按钮"
            }
          ],
          "title": "Button 按钮",
          "group": {
            "path": "/button",
            "title": "Button"
          }
        },
        "title": "Button 按钮"
      },
      {
        "path": "/empty",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'empty__index.md' */'/Users/xyx650/Documents/kenshin/src/empty/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/empty/index.md",
          "updatedTime": 1617087912000,
          "componentName": "empty",
          "title": "Empty",
          "slugs": [],
          "group": {
            "path": "/empty",
            "title": "Empty"
          }
        },
        "title": "Empty"
      },
      {
        "path": "/foo",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'foo__index.md' */'/Users/xyx650/Documents/kenshin/src/foo/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/foo/index.md",
          "updatedTime": 1616840136000,
          "componentName": "foo",
          "slugs": [
            {
              "depth": 2,
              "value": "Foo",
              "heading": "foo"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "Foo",
          "group": {
            "path": "/foo",
            "title": "Foo"
          }
        },
        "title": "Foo"
      },
      {
        "path": "/input",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'input__index.md' */'/Users/xyx650/Documents/kenshin/src/input/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/input/index.md",
          "updatedTime": 1617247853150,
          "componentName": "input",
          "slugs": [],
          "title": "Index",
          "group": {
            "path": "/input",
            "title": "Input"
          }
        },
        "title": "Index"
      },
      {
        "path": "/loading",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'loading__index.md' */'/Users/xyx650/Documents/kenshin/src/loading/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/loading/index.md",
          "updatedTime": 1616840136000,
          "componentName": "loading",
          "slugs": [
            {
              "depth": 2,
              "value": "Loading",
              "heading": "loading"
            }
          ],
          "title": "Loading",
          "group": {
            "path": "/loading",
            "title": "Loading"
          }
        },
        "title": "Loading"
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__index.md' */'/Users/xyx650/Documents/kenshin/docs/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1616840136000,
          "slugs": [
            {
              "depth": 1,
              "value": "Welcome to use kenshin",
              "heading": "welcome-to-use-kenshin"
            },
            {
              "depth": 2,
              "value": "What is the kenshin UI",
              "heading": "what-is-the-kenshin-ui"
            },
            {
              "depth": 2,
              "value": "How to use kenshin",
              "heading": "how-to-use-kenshin"
            },
            {
              "depth": 4,
              "value": "使用 npm 或 yarn 安装",
              "heading": "使用-npm-或-yarn-安装"
            },
            {
              "depth": 4,
              "value": "浏览器引入",
              "heading": "浏览器引入"
            }
          ],
          "title": "Welcome to use kenshin"
        },
        "title": "Welcome to use kenshin"
      }
    ],
    "title": "demo",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
