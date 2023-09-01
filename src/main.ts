

import { app, BrowserWindow, ipcMain } from "electron";
import isDev from "electron-is-dev";
import Store from "electron-persist-secure/lib/store";
import "./app/ipc/main";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
import { PosPrinter, PosPrintData, PosPrintOptions } from "electron-pos-printer";
import * as path from "path";
import { useLogger } from './render/helpers/logs';
import settings from "./render/helpers/config";
const updateElectronApp = require('update-electron-app');
const { log } = useLogger()

const option = require('update-electron-app')({
  repo: 'https://github.com/Orlandb31/fluyapp-kiosk-electron.git',
  updateInterval: '5 minutes',

})

if (require("electron-squirrel-startup")) {
  app.quit();
}
//if (process.env.NODE_ENV === 'production') { updateElectronApp(option); }
updateElectronApp(option);
// Make sure to call this ONCE.
const createStores = (): void => {
  new Store({
    configName: "config", // The stores name
  });
};

let contents: any;


const createWindow = (): void => {
  console.log(process.env.BITBUCKET_USERNAME);
  console.log(process.env.BITBUCKET_PASSWORD);
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webSecurity: true,
      nodeIntegration: true,
      contextIsolation: true,


    },
    alwaysOnTop: true, // enable always on top to prevent other windows from appearing above it
    kiosk: true // enable kiosk mode, makes it full screen and what not
    // to disable the top bar / frame completely uncomment the next line -
    // if you do this you will have to set up a css class to allow certain parts of your app to be "draggable"

    // frame: false
  });

  const patchCSP = () => {
    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            [
              "default-src 'self' 'unsafe-inline' http: https: data:",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' data:",
              "media-src 'self' file:",
            ].join("; "),
          ],
        },
      });
    });
  };

  patchCSP()

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools if in dev.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.setMenu(null)

  contents = mainWindow.webContents;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createStores();
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('log', async (event, data) => {

  log(data)

})


ipcMain.on('readconfig', async (event, data) => {
  let config = settings
  event.sender.send('sendconfig', config)
})


ipcMain.on('print', async (event, arg) => {

  const data = JSON.parse(arg);


  try {

    const printers = await contents.getPrintersAsync();

    console.log('printers', printers)

    const options: any = {
      preview: false,               //  width of content body
      margin: 'auto',            // margin of content body
      copies: 1,                    // Number of copies to print
      printerName: 'printer1',        // printerName: string, check with webContent.getPrinters()
      timeOutPerLine: 1000,
      pageSize: '80mm',
      silent: true
    }



    await PosPrinter.print(data, options)



  } catch (e) {

    console.log(e)

  }

})


process.on('uncaughtException', function (error) {
  console.log(error);
  app.quit()
})
