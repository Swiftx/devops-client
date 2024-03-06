import { join, resolve } from 'path';
import { app } from 'electron';
import { env } from 'process';

// 资源路径
const RESOURCES_PATH = app.isPackaged
  ? join(process.resourcesPath, 'assets')
  : join(__dirname, '../../../assets');

export default {
  /**
   * 资源路径
   *
   * @param paths
   * @returns
   */
  assetPath: (...paths: string[]): string => {
    return join(RESOURCES_PATH, ...paths);
  },

  /**
   * 预加载脚本路径
   */
  preloadPath: () =>
    app.isPackaged
      ? join(__dirname, '../preload.js')
      : join(__dirname, '../../../.erb/dll/preload.js'),

  /**
   * HTML路径
   *
   * @param name
   * @returns
   */
  htmlPath: (name: string) => {
    if (env.NODE_ENV !== 'development') {
      return `file://${resolve(__dirname, '../../renderer/', name)}`;
    }
    const port = env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = name;
    return url.href;
  },
};
