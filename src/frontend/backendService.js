'use strict';

function backendService(q) {
    var ipcRenderer;

    if (navigator.userAgent.indexOf('Electron') !== -1) {
        ipcRenderer = require('electron').ipcRenderer;
    } else {
        ipcRenderer = {
            send: function(string, param1, param2) {
    
            },
            on: function(string, cb) {
    
            }
        };
    }
      
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