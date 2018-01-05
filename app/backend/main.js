'use strict';

const electron = require('electron');
const Api = require('./api');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow = null;
let api = null;

/**
 * Quit the application if we are not in MacOS and all the windows are closed
 */
app.on('window-all-closed', _ => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', _ => {
    api = new Api(ipcMain);
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(`file://${app.getAppPath()}/../frontend/index.html`);
    mainWindow.on('closed', () => {
        mainWindow = null;
        api = null;
    });
});
