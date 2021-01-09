# mini-ui -- 是一个基于 vue 的组件

作者： Dennis tang

[![Build Status](https://travis-ci.org/tang-xuan11/mini-ui.svg?branch=master)](https://travis-ci.org/tang-xuan11/mini-ui)

## 开始使用

使用本框架前，请在 css 中开启 border-box

```
*,*::before,*::after{box-sizing: border-box}
```
 IE 8 及以上浏览器都支持此样式。
```
html {
  --button-height: 32px;
  --font-size: 14px;
  --button-bg: white;
  --button-active-bg: #eee;
  --border-radius: 4px;
  --color: #333;
  --border-color: #999;
  --border-color-hover: #666;
}
```
## 安装

 ```
  npm i --save yinxuan-test-1-1
  ```

## 引入 mini

 ```
  import {Button, ButtonGroup, Icon} from 'yinxuan-test-1-1'
  import 'yinxuan-test-1-1/dist/index.css'
   export default {
    name: 'app',
    components: {
      'g-button': Button,
      'g-icon': Icon
    }
  }
  ```

## 文档

## 提问

## 变更记录

## 联系方式

## 贡献代码