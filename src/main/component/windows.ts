import { MainWindow } from '../window';

// 窗口数据
const data: {
  main?: MainWindow;
} = {};

export const windows: {
  main: MainWindow;
} = {
  get main() {
    if (data.main) return data.main;
    data.main = new MainWindow();
    data.main.on('closed', () => delete data.main);
    return data.main;
  }
};
