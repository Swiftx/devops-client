import { IpcMainEvent } from 'electron';
import log from 'electron-log';

export const example: (event: IpcMainEvent, ...args: any[]) => void = async (
  event,
  arg,
) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  log.warn(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
};
