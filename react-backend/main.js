const electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
        mainWindow = new BrowserWindow({width: 800, height: 600, x: 0, y: 0, kiosk:true, darkTheme: true, webPreferences: {nodeIntegration: false}})

    mainWindow.setTitle('Miri');
    mainWindow.loadURL('http://localhost:3001');
    mainWindow.setBackgroundColor("#000")

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
