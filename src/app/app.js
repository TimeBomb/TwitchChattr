const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const CONFIG = require('../../app.config.js'); // TODO: Change require default dir to root dir so we can avoid '../../'

module.exports = class App {
    constructor(options) {
        options = Object.assign({}, CONFIG.DEFAULT_APP_OPTIONS, options || {});
        
        app.on('ready', function() {
            this.window = new BrowserWindow(options);
            this.window.maximize();
            if (options.url) {
                this.window.loadURL(options.url);
            }
        });
    }
}