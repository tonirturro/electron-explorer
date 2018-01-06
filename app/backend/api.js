const Services = require('./services');

/**
 * Encapsulates the interface between the main and the rendered process
 */
module.exports = class Api {
    constructor(ipc) {
        this.ipc = ipc;
        this.services = new Services(); 
        
        this.ipc.on('request-path', (event, arg) => {
            event.sender.send('request-path-reply', this.services.getUsersHomeFolder());
        });
        
        this.ipc.on('request-files', (event, filesPath) => {
            this.services.getFilesInFolder(filesPath, (err, files) => {
                var result;
                if (err) {
                    result = null;
                } else {
                    result = files;
                }
                event.sender.send('request-files-reply', result)
            });
        });
        
        this.ipc.on('inspect-files', (event, filesPath, files) => {
            this.services.inspectAndDescribeFiles(filesPath, files, (err, files) => {
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