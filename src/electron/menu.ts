import { app, BrowserWindow, Menu } from "electron";

import { isDev } from "./utils.js";

export function CreateMenu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: process.platform === "darwin" ? undefined : "App",
        type: "submenu",
        submenu: [
          {
            label: "Quit",
            click: () => app.quit(),
            accelerator: "CommandOrControl+Q",
          },
          {
            label: "DevTools",
            click: () => mainWindow.webContents.openDevTools(),
            visible: isDev(),
            accelerator: "CommandOrControl+D",
          },
        ],
      },
      {
        label: "View",
        type: "submenu",
        submenu: [
          {
            label: "CPU",
            // click: () => ipcWebContentSend('changeView', mainWindow.webContents, 'CPU'),
          },
          {
            label: "RAM",
            // click: () => ipcWebContentSend('changeView', mainWindow.webContents, 'RAM'),
          },
          {
            label: "STORAGE",
            // click: () => ipcWebContentSend('changeView', mainWindow.webContents, 'STORAGE'),
          },
        ],
      },
    ])
  );
}
