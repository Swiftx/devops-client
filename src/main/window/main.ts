import { shell, BrowserWindow } from 'electron';
import { is } from '@electron-toolkit/utils';
import { join } from 'path';

import icon from '../../../resources/icon.png?asset';

const preload = join(__dirname, '../../preload/index.js');
const htmlFile = join(__dirname, '../../renderer/index.html');

export class MainWindow extends BrowserWindow {
  private readyToShow: Promise<void>;

  constructor() {
    super({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true,
      titleBarStyle: 'hidden',
      icon: process.platform === 'linux' ? icon : undefined,
      titleBarOverlay: {
        color: 'rgba(0,0,0,0)',
        height: 35,
        symbolColor: 'white'
      },
      trafficLightPosition: {
        x: 12,
        y: 10
      },
      webPreferences: {
        preload,
        sandbox: false
      }
    });

    this.readyToShow = new Promise((resolve) => {
      this.on('ready-to-show', resolve);
    });

    this.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: 'deny' };
    });

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
      this.loadFile(htmlFile);
    }
  }

  /**
   * 当窗口就绪
   *
   * @returns
   */
  public whenReady(): Promise<void> {
    return this.readyToShow;
  }
}
