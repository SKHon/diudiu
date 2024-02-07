const xtransit = require('xtransit');
const path = require('path');
const config = {
  server: 'ws://127.0.0.1:9190', // 填写 xtransit-server 地址
  appId: 1, // 创建应用得到的应用 ID
  appSecret: 'xxxx', // 创建应用得到的应用 Secret
  logDir: path.resolve(__dirname, 'xprofiler')  // 这里的路径要和xprofiler的log_dir要保持完全一致
};
xtransit.start(config);