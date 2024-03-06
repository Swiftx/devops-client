import { BrowserWindow, shell } from 'electron';
import loader from './loader';
import MenuBuilder from './menu';

export default class Window extends BrowserWindow {
  private memuBuilder: MenuBuilder;

  private readyToShow: Promise<void>;

  constructor() {
    // 创建窗口
    super({
      show: false,
      width: 1024,
      height: 728,
      icon: loader.assetPath('icon.png'),
      webPreferences: {
        preload: loader.preloadPath(),
      },
    });

    // 加载页面
    const html = loader.htmlPath('index.html');
    this.loadURL(html);

    // 就绪事件
    this.readyToShow = new Promise((resolve) => {
      this.on('ready-to-show', resolve);
    });

    // 构造菜单
    this.memuBuilder = new MenuBuilder(this);
    this.memuBuilder.buildMenu();

    // Open urls in the user's browser
    this.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });
  }

  /**
   * 等待就绪
   */
  public ready(): Promise<void> {
    return this.readyToShow;
  }
}
