const electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700
    });

    mainWindow.setTitle('Miri');
    mainWindow.loadURL('http://localhost:3001');
    mainWindow.setBackgroundColor("#000")

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
