import { ipcMain } from 'electron';
import { example } from './ipc/example';

export default () => {
  ipcMain.on('ipc-example', example);
};
