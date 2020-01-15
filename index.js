const electron = require('electron')
const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')


// Behalten Sie eine globale Referenz auf das Fensterobjekt.
// Wenn Sie dies nicht tun, wird das Fenster automatisch geschlossen,
// sobald das Objekt dem JavaScript-Garbagekollektor übergeben wird.

let wins;

function startUp() {
    if (process.argv.length > 0) {
        if (process.argv[0] == "/p") {
            createPreviewWindows();
            return;
        }
        else if (process.argv[0] == "/c") {
            alert("This screensaver has no options that you can set");
            return;
        }
    }
    createWindows();
}

function createWindows() {
    wins = [];

    electron.screen.getAllDisplays().forEach(display => {
        let win = new BrowserWindow({
            x: display.bounds.x,
            y: display.bounds.y,
            fullscreen: true,
            transparent: false,
            frame: false,
            backgroundColor: '#121212',
            webPreferences: {
                nodeIntegration: true
            }
        });

        win.loadFile('index.html');

        win.on('closed', () => {
            wins = null
        });

        wins.push(win);
    });
}

function createPreviewWindows() {
    return;
    wins = [];

    electron.screen.getAllDisplays().forEach(display => {
        let win = new BrowserWindow({
            x: display.bounds.x,
            y: display.bounds.y,
            fullscreen: true,
            transparent: false,
            frame: false,
            backgroundColor: '#121212',
            webPreferences: {
                nodeIntegration: true
            }
        });

        win.loadFile('index.html');

        win.on('closed', () => {
            wins = null
        });

        wins.push(win);
    });
}

app.on('ready', startUp);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (wins === null) {
        startUp()
    }
});

ipcMain.on('close-me', (evt, arg) => {
    app.quit()
});
