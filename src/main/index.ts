import { ipcMain } from 'electron';
import { app, windows } from './component';

ipcMain.on('ping', () => console.log('pong'));

// 主函数
(async () => {
  await app.whenReady();
  await windows.main.whenReady();
  windows.main.show();
})();
