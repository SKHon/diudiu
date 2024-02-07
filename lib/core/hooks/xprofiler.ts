
import path from 'path';
import os from 'os';
import fs from 'fs';
import xprofiler from 'xprofiler';
import { deepMerge } from '../utils'
import { DiudiuProcess } from '../types';
const dprocess = process as DiudiuProcess;

export default async (app) => {
  const pkg = require(path.join(app.appPath, 'package.json'));
  const defaultConfig = {
    log_dir: os.tmpdir(),
    log_interval: 60, // seconds
    log_level: 1,
    log_type: 0,
    log_format_alinode: false,
    patch_http: true,
    patch_http_timeout: 30, // seconds，
    check_throw: true,
    auto_incr_heap_limit_size: 128, // MB,
    enable_log_uv_handles: true,
    enable_fatal_error_hook: true,
    enable_fatal_error_report: true,
    enable_fatal_error_coredump: false,
    enable_http_profiling: false,
    enable_auto_incr_heap_limit: false,
  };
  let xprofilerConfig = app.config?.xprofiler;

  if (xprofilerConfig) {
    try {
      if (xprofilerConfig.log_dir) {
        let logDir = path.resolve(app.appPath, xprofilerConfig.log_dir);
        xprofilerConfig.log_dir = logDir;
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true });
        }
      }
      xprofilerConfig = deepMerge(defaultConfig, xprofilerConfig);

      // 业务进程中，收集相关数据。上报给xtransit
      xprofiler.start(xprofilerConfig);

    } catch (error) {
      dprocess.emit('error', error);
    }
  }
}
