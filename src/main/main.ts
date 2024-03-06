/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { env } from 'process';
import { app } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

import Window from './layout/window';
import register from './register';

// 环境预处理
if (env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

// 即使在内存中也要尊重应用程序的OSX惯例
// 关闭所有窗口后执行退出
app.on('window-all-closed', () => {
  if (process.platform === 'darwin') return;
  app.quit();
});

let mWindow: Window | null = null;
const start = async () => {
  if (mWindow !== null) return;

  // 显示窗口
  mWindow = new Window();
  await mWindow.ready();
  mWindow.show();

  // 升级检测
  log.transports.file.level = 'info';
  autoUpdater.logger = log;
  autoUpdater.checkForUpdatesAndNotify();
};

// 启动应用程序
(async () => {
  try {
    register();
    await app.whenReady();
    await start();
    app.on('activate', start);
  } catch (e) {
    console.log(e);
  }
})();
