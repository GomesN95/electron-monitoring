import { ipcMain, WebContents, WebFrameMain } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function ipcMainHandle<key extends keyof EventPayloadMapping>(
  key: key,
  handler: () => EventPayloadMapping[key]
) {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame!);
    return handler()});
}

export function ipcWebContentSend<key extends keyof EventPayloadMapping>(
  key: key,
  webContents: WebContents,
  payload: EventPayloadMapping[key]
) {
  webContents.send(key, payload);
}

export function validateEventFrame(frame: WebFrameMain) {
  if (isDev() && new URL(frame.url).host === 'localhost:5123') {
    return;
  }
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error('Malicious event');
  }
}