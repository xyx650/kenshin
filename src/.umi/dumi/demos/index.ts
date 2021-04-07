// @ts-nocheck
import React from 'react';
import { dynamic } from 'dumi';

export default {
  'button-demo': {
    component: function DumiDemo() {
  var _interopRequireDefault = require("/Users/xyx650/Documents/kenshin/node_modules/@umijs/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault");

  var _react = _interopRequireDefault(require("react"));

  var _kenshin = require("kenshin");

  var _default = function _default() {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_kenshin.Button, {
      type: "primary",
      style: {
        marginRight: '10px'
      }
    }, "primary"), /*#__PURE__*/_react["default"].createElement(_kenshin.Button, {
      type: "dashed",
      style: {
        marginRight: '10px'
      }
    }, "dashed"), /*#__PURE__*/_react["default"].createElement(_kenshin.Button, {
      type: "text"
    }, "text"));
  };

  return _react["default"].createElement(_default);
},
    previewerProps: {"sources":{"_":{"tsx":"import React from 'react';\nimport { Button } from 'kenshin';\n\n\nexport default () => <>\n  <Button type=\"primary\" style={{ marginRight: '10px' }}>primary</Button>\n  <Button type=\"dashed\" style={{ marginRight: '10px' }}>dashed</Button>\n  <Button type=\"text\">text</Button>\n</>"}},"dependencies":{"react":{"version":"17.0.2"},"kenshin":{"version":"1.0.0"}},"componentName":"button","title":"基础 Modal","description":"<div class=\"markdown\"><p>这是 antd Modal 组件的基础示例</p></div>","identifier":"button-demo"},
  },
  'empty-demo': {
    component: function DumiDemo() {
  var _interopRequireDefault = require("/Users/xyx650/Documents/kenshin/node_modules/@umijs/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault");

  var _react = _interopRequireDefault(require("react"));

  var _kenshin = require("kenshin");

  var _default = function _default() {
    return /*#__PURE__*/_react["default"].createElement(_kenshin.Empty, null);
  };

  return _react["default"].createElement(_default);
},
    previewerProps: {"sources":{"_":{"tsx":"import React from 'react';\nimport { Empty } from 'kenshin';\n\nexport default () => <Empty />;"}},"dependencies":{"react":{"version":"17.0.2"},"kenshin":{"version":"1.0.0"}},"componentName":"empty","identifier":"empty-demo"},
  },
  'empty-demo-1': {
    component: function DumiDemo() {
  var _interopRequireDefault = require("/Users/xyx650/Documents/kenshin/node_modules/@umijs/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault");

  var _react = _interopRequireDefault(require("react"));

  var _kenshin = require("kenshin");

  var _default = function _default() {
    return /*#__PURE__*/_react["default"].createElement(_kenshin.Empty, {
      image: "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg",
      imageStyle: {
        height: 60
      },
      description: /*#__PURE__*/_react["default"].createElement("span", null, "Customize ", /*#__PURE__*/_react["default"].createElement("a", {
        href: "#API"
      }, "Description"))
    });
  };

  return _react["default"].createElement(_default);
},
    previewerProps: {"sources":{"_":{"tsx":"import React from 'react';\nimport { Empty } from 'kenshin';\n\nexport default () => (\n  <Empty\n    image=\"https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg\"\n    imageStyle={{\n      height: 60,\n    }}\n    description={\n      <span>\n        Customize <a href=\"#API\">Description</a>\n      </span>\n    }\n  ></Empty>\n);"}},"dependencies":{"react":{"version":"17.0.2"},"kenshin":{"version":"1.0.0"}},"componentName":"empty","identifier":"empty-demo-1"},
  },
  'foo-demo': {
    component: function DumiDemo() {
  var _interopRequireDefault = require("/Users/xyx650/Documents/kenshin/node_modules/@umijs/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault");

  var _react = _interopRequireDefault(require("react"));

  var _kenshin = require("kenshin");

  var _default = function _default() {
    return /*#__PURE__*/_react["default"].createElement(_kenshin.Foo, null);
  };

  return _react["default"].createElement(_default);
},
    previewerProps: {"sources":{"_":{"tsx":"import React from 'react';\nimport { Foo } from 'kenshin';\n\nexport default () => <Foo />;"}},"dependencies":{"react":{"version":"17.0.2"},"kenshin":{"version":"1.0.0"}},"componentName":"foo","identifier":"foo-demo"},
  },
  'loading-demo': {
    component: function DumiDemo() {
  var _interopRequireDefault = require("/Users/xyx650/Documents/kenshin/node_modules/@umijs/babel-preset-umi/node_modules/@babel/runtime/helpers/interopRequireDefault");

  var _react = _interopRequireDefault(require("react"));

  var _kenshin = require("kenshin");

  var _default = function _default() {
    return /*#__PURE__*/_react["default"].createElement(_kenshin.Foo, {
      title: "loading"
    });
  };

  return _react["default"].createElement(_default);
},
    previewerProps: {"sources":{"_":{"tsx":"import React from 'react';\nimport { Foo } from 'kenshin';\n\nexport default () => <Foo title=\"loading\" />;"}},"dependencies":{"react":{"version":"17.0.2"},"kenshin":{"version":"1.0.0"}},"componentName":"loading","identifier":"loading-demo"},
  },
};
