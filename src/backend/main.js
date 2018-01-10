'use strict';

const electron = require('electron');
const Services = require('./services');
const Api = require('./api');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow = null;
let api = new Api(ipcMain, new Services());

/**
 * Quit the application if we are not in MacOS and all the windows are closed
 */
app.on('window-all-closed', _ => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', _ => {
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(`file://${app.getAppPath()}/index.html`);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
