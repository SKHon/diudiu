1. 将diudiu工程最新代码拉下来
2. diudiu为主工程，lib为核心工程，example为调试工程，需要到各目录下执行npm i，安装各自依赖包(若npm网速较慢，推荐使用cnpm、yarn)

```
diudiu
├─ docs
├─ example
├─ lerna.json
├─ lib
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ README.md
├─ test
└─ tsconfig.json

```

3. 在主工程diudiu下，按顺义执行
   - npm run lerna
   - npm run dev

4. 在example/config/config.**.ts 中，为各个环境的功能配置文件，数据库有关功能已注释，若需开启，请按照相关要求配置对应参数。
