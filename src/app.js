let electron = require('electron');
let BrowserWindow = electron.BrowserWindow;
let app = electron.app;
const CONFIG = require('../app.config.js');

module.exports = class App {
    constructor(options) {
        options = Object.assign({}, CONFIG.DEFAULT_APP_OPTIONS, options || {});
        
        app.on('ready', function() {
            this.window = new BrowserWindow(options);
            if (options.url) {
                this.window.loadURL(options.url);
            }
        });
    }
}