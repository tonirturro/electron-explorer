const electron = require('electron');
const Services = require('./services');
const { ipcMain: ipc } = electron;

/**
 * Encapsulates the interface between the main and the rendered process
 */
module.exports = class Api {
    constructor() {
        let services = new Services();
        
        ipc.on('request-path', (event, arg) => {
            event.sender.send('request-path-reply', services.getUsersHomeFolder());
        });
        
        ipc.on('request-files', (event, filesPath) => {
            services.getFilesInFolder(filesPath, (err, files) => {
                var result;
                if (err) {
                    result = null;
                } else {
                    result = files;
                }
                event.sender.send('request-files-reply', result)
            });
        });
        
        ipc.on('inspect-files', (event, filesPath, files) => {
            services.inspectAndDescribeFiles(filesPath, files, (err, files) => {
                var result;
                if (err) {
                    result = null;
                } else {
                    result = files;
                }
                event.sender.send('inspect-files-reply', result);
            });
        })
    }
}