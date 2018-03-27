const electron = require('electron');
const { app, BrowserWindow } = electron;

var config = {};
// Module to control application life.
// Module to create native browser window.
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
	// Create the browser window.
	if (config.kioskmode) {
		mainWindow = new BrowserWindow({width: 800, height: 600, x: 0, y: 0, kiosk:true, darkTheme: true, webPreferences: {nodeIntegration: false}});
	} else {
		mainWindow = new BrowserWindow({width: 800, height: 600, x: 0, y: 0, fullscreen: true, autoHideMenuBar: true, darkTheme: true, webPreferences: {nodeIntegration: false}});
	}

	// and load the index.html of the app.
	//mainWindow.loadURL('file://' + __dirname + '../../index.html');
	mainWindow.loadURL("http://localhost:3000");
	mainWindow.setBackgroundColor("#000")


	// Open the DevTools if run with "npm start dev"
	if(process.argv[2] == "dev") {
		mainWindow.webContents.openDevTools();
	}

	// Set responders for window events.
	mainWindow.on("closed", function() {
		mainWindow = null;
	});

	if (config.kioskmode) {
		mainWindow.on("blur", function() {
			mainWindow.focus();
		});

		mainWindow.on("leave-full-screen", function() {
			mainWindow.setFullScreen(true);
		});

		mainWindow.on("resize", function() {
			setTimeout(function() {
				mainWindow.reload();
			}, 1000);
		});
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on("ready", function() {
	console.log("Launching application.");
	createWindow();

});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
	createWindow();
});

app.on("activate", function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});
