import { app, BrowserWindow } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { windows } from './windows';

// 为 Window 系统设置用户模式ID
electronApp.setAppUserModelId('com.electron');

// 支持F12开启调试模式
app.on('browser-window-created', (_, window) => {
  optimizer.watchWindowShortcuts(window);
});

// 关闭全部窗口时退出应用
app.on('window-all-closed', () => {
  if (process.platform === 'darwin') return;
  app.quit();
});

// Mac从启动栏再次唤醒时
app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length) return;
  const window = windows.main;
  await window.whenReady();
  window.show();
});

// 暴露APP
export { app };
