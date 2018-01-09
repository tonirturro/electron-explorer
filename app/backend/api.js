

/**
 * Encapsulates the interface between the main and the rendered process
 */
module.exports = class Api {
    constructor(ipc, services) {
        var self = this;
        self.ipc = ipc;
        self.services = services; 
        
        self.ipc.on('request-path', (event, arg) => {
            event.sender.send('request-path-reply', self.services.getUsersHomeFolder());
        });
        
        self.ipc.on('request-files', (event, filesPath) => {
            self.services.getFilesInFolder(filesPath, (err, files) => {
                var result;
                if (err) {
                    result = null;
                } else {
                    result = files;
                }
                event.sender.send('request-files-reply', result)
            });
        });
        
        self.ipc.on('inspect-files', (event, filesPath, files) => {
            self.services.inspectAndDescribeFiles(filesPath, files, (err, files) => {
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