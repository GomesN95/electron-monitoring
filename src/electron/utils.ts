import { ipcMain, WebContents } from "electron";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function ipcMainHandle<key extends keyof EventPayloadMapping>(
  key: key,
  handler: () => EventPayloadMapping[key]
) {
  ipcMain.handle(key, () => handler());
}

export function ipcWebContentSend<key extends keyof EventPayloadMapping>(
  key: key,
  webContents: WebContents,
  payload: EventPayloadMapping[key]
) {
  webContents.send(key, payload);
}
