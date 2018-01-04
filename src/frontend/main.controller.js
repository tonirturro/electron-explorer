'use strict';

function mainController(backendService, searchService)
{
    var loadedFilesInfo = []
    var self = this;
    self.filePath = 'searching..';
    self.filesInfo = [];
    self.query = '';
    self.changeFolder = changeFolder;
    self.searchFiles = searchFiles;
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
        if (self.query === '') {
            resetFilter();
        } else {
            searchService.find(self.query).then(filterResults);
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
        self.filePath = folder;
        self.filesInfo = [];
        backendService.requestFilesInPath(folder).then(function(files) {
            if (files !== null) {
                backendService.requestFilesInspection(folder, files).then(function(filesInfo) {
                    if (filesInfo !== null) {
                        loadedFilesInfo = self.filesInfo = filesInfo;
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

        self.filesInfo = newfilesInfo;
    }

    function resetFilter() {
        self.filesInfo = loadedFilesInfo;
    } 
}

mainController.$inject =  ['backendService', 'searchService'];

module.exports = mainController;