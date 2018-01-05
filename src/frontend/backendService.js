'use strict';

var ipcRenderer = window.require('electron').ipcRenderer;

function backendService(q) {      
    self = this;
    self.requestUserPath = requestUserPath;
    self.requestFilesInPath = requestFilesInPath;
    self.requestFilesInspection = requestFilesInspection;

    /**
     * Public methods
     */

    function requestUserPath() {
       return ipcRequest('request-path', null);
    }

    function requestFilesInPath(path) {
       return ipcRequest('request-files', path);
    }

    function requestFilesInspection(path, files) {
        var deferred = q.defer();
        ipcRenderer.send('inspect-files', path, files);
        ipcRenderer.on('inspect-files-reply', function(event, result) {
             deferred.resolve(result);
        });
        return deferred.promise;    
    }

    /**
     * Private methods
     */
    function ipcRequest(request, argument) {
        var deferred = q.defer();
        ipcRenderer.send(request, argument);
        ipcRenderer.on(request + '-reply', function(event, result) {
             deferred.resolve(result);
        });
        return deferred.promise; 
    }
}

backendService.$inject = ['$q'];

module.exports = backendService;