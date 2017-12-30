'use strict';

function mainController($scope, backendService)
{
    $scope.filePath = 'searching..';
    $scope.filesInfo = [];
    $scope.changeFolder = changeFolder;
    init();

    /*****************************************
     * Public methods
     ******************************************/
    function changeFolder(fileInfo) {
        if (fileInfo.type === 'folder') {
            loadFolder(fileInfo.path);
        }
    }

    /******************************************
     * Private methods
     ******************************************/
    function init() {
        backendService.requestUserPath().then(function(path) {
            loadFolder(path);
        });    
    }

    function loadFolder(folder) {
        $scope.filePath = folder;
        $scope.filesInfo = [];
        backendService.requestFilesInPath(folder).then(function(files) {
            if (files !== null) {
                backendService.requestFilesInspection(folder, files).then(function(filesInfo) {
                    if (filesInfo !== null) {
                        $scope.filesInfo = filesInfo;
                    } else {
                        console.log('Sorry, we could not display your files');
                    }
                });
            } else {
                console.log('Sorry, we could not load your home foleder');
            }
        }); 
    }
}

module.exports = mainController;