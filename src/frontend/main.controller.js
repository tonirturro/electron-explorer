'use strict';

function mainController(scope, backendService, searchService)
{
    var loadedFilesInfo = []
    scope.filePath = 'searching..';
    scope.filesInfo = [];
    scope.query = '';
    scope.changeFolder = changeFolder;
    scope.searchFiles = searchFiles;
    init();

    /*****************************************
     * Public methods
     ******************************************/
    function changeFolder(fileInfo) {
        if (fileInfo.type === 'folder') {
            loadFolder(fileInfo.path);
        }
    }

    function searchFiles()
    {
        if (scope.query === '') {
            resetFilter();
        } else {
            searchService.find(scope.query).then(filterResults);
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
        scope.filePath = folder;
        scope.filesInfo = [];
        backendService.requestFilesInPath(folder).then(function(files) {
            if (files !== null) {
                backendService.requestFilesInspection(folder, files).then(function(filesInfo) {
                    if (filesInfo !== null) {
                        loadedFilesInfo = scope.filesInfo = filesInfo;
                        searchService.resetIndex(loadedFilesInfo);
                    } else {
                        console.log('Sorry, we could not display your files');
                    }
                });
            } else {
                console.log('Sorry, we could not load your home foleder');
            }
        }); 
    }

   function filterResults(results) {
        var newfilesInfo = [];
        var validFilePaths = results.map(function(result) {
            return result.ref;
        });

        angular.forEach(loadedFilesInfo, function(fileInfo) {
            if (validFilePaths.indexOf(fileInfo.path) !== -1) {
                newfilesInfo.push(fileInfo);
            }
        });

        scope.filesInfo = newfilesInfo;
    }

    function resetFilter() {
        scope.filesInfo = loadedFilesInfo;
    } 
}

mainController.$inject =  ['$scope', 'backendService', 'searchService'];

module.exports = mainController;