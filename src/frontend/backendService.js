'use strict';

var electron = window.require('electron');
var ipcRenderer = electron.ipcRenderer;

function backendService(q) {
    self = this;
    self.ipcMain = electron.ipcMain;
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
        ipcRenderer.once('inspect-files-reply', function (event, result) {
            deferred.resolve(result);
        });
        ipcRenderer.send('inspect-files', path, files);
        return deferred.promise;
    }

    /**
     * Private methods
     */
    function ipcRequest(request, argument) {
        var deferred = q.defer();
        ipcRenderer.once(request + '-reply', function (event, result) {
            deferred.resolve(result);
        });
        ipcRenderer.send(request, argument);
        return deferred.promise;
    }
}

backendService.$inject = ['$q'];

module.exports = backendService;