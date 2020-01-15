const { ipcRenderer } = require('electron');
function quit() {
    ipcRenderer.send('close-me')
}