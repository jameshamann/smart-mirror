const electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
        mainWindow = new BrowserWindow({width: 300, height: 800, x: 0, y: 0, kiosk:true, darkTheme: true, webPreferences: {nodeIntegration: true}})

    mainWindow.setTitle('Miri');
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.setBackgroundColor("#000")

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
