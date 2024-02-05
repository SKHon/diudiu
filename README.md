<img src="/docs/logo.png" alt="Koa middleware framework for nodejs" width="300"/>

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][build-url]
  [![PR's Welcome][pr-welcoming-image]][pr-welcoming-url]

  一个基于koa的BFF框架，内置路由、模板、日志、mysql、redis、elasticsearch等模块。也支持用户自定义中间件能力。

## 使用指南
1. 全局安装脚手架
```bash
npm i -g diudiu-cli
```
2. 初始化项目
```bash
diudiu-cli new my-diudiu
```
3. 安装依赖
```bash
npm i
```
4. 启动项目
```bash
npm run dev
```

## 开发指南
1. 将diudiu工程最新代码拉下来
2. 目录介绍
    - lib：核心工程
    - example：调试工程，
    - cli：脚手架工程。
3. 在主工程diudiu下，按顺序执行
    - npm run lerna
    - npm run dev


### pr规范
对于 Pull Request，请遵守以下几点要求1：

1. 标题请写明本次 PR 的目的（做了 什么 工作，修复了 什么 问题）。
2. 内容请简要叙述修改的内容。如果修复了一个 issue 的问题，请在内容中添加 fix #xxxx 字段，其中 xxxx 代表 issue 的编号。
3. 推荐删除 pull request message 中的模板信息（“首先，十分感谢……”这一段）。
对于 Pull Request 的标题，推荐使用如下格式书写：
```
<修改类型>(<文件名>): <修改的内容> (<对应 issue 的编号>)
```

修改类型分为如下几类：

- feat: 新增特性或功能
- fix: 修复问题
- docs: 修改文档
- style: 修改代码格式
- refactor: 代码重构，不引入新功能和修复问题
- perf: 性能优化
- test: 新增、修改测试用例
- chore: 构建过程或者辅助工具的变动
- merge: 代码合并

# 官方群
<img src="/docs/qq.jpg" alt="qq group" width="300"/>

# License

如有引用，请标明出处。
[MIT](https://github.com/SKHon/koa-book-code/blob/master/LICENSE)

[demostart-url]: ./DEMOSTART.md
[npm-image]: https://img.shields.io/badge/npm-v0.0.1-green
[pr-welcoming-image]: https://img.shields.io/badge/PRs-welcome-orange
[pr-welcoming-url]: https://github.com/skhon/diudiu/pull/new
[travis-image]: https://img.shields.io/badge/build-passing-blue
[npm-url]: https://www.npmjs.com/package/diudiu-core
[build-url]: https://github.com/SKHon/diudiu
