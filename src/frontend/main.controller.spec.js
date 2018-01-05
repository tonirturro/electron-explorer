'use strict';
import angular from "angular";
import "angular-mocks";

describe('When using the MainControler, it', function() {
    beforeEach(angular.mock.module('frontend'));

    var ctrl, backendService, searchService;

    beforeEach(inject(function(_$controller_, _backendService_, _searchService_) {
        var $controller = _$controller_;
        backendService = _backendService_;
        searchService = _searchService_;
        ctrl = $controller('MainController');
    }));

    it('Should be properly initialized', function() {
        expect(ctrl.filePath).toEqual('searching..');
        expect(angular.isArray(ctrl.filesInfo)).toBeTruthy();
        expect(ctrl.filesInfo.length).toBe(0);
    });

    describe('When using public methods from MainController, it', function() {

        var fileInfo = function(name, path) {
            this.fileName = name;
            this.path = path;
            this.type = 'file';
            return this;
        };
        var expectedFileInfo = [
            new fileInfo('file1', 'path1'),
            new fileInfo('file2', 'path2'),
            new fileInfo('file3', 'path3')
        ];
        var expectedFiles = [ 'file1', 'file2', 'file3' ];
        var expectedFolder = 'newFolder';
        var promiseMock = function(resolvedValue) {
            return { then: function(callback) {callback(resolvedValue)} };
        };

        it ('Should be able to change folder', function() {
            spyOn(backendService,'requestFilesInPath').and.returnValue(promiseMock());

            ctrl.changeFolder( { type: 'folder', path: expectedFolder} );

            expect(ctrl.filePath).toEqual(expectedFolder);
            expect(backendService.requestFilesInPath).toHaveBeenCalledWith(expectedFolder);
        });

        it('Should be able to obtain files in folder', function() {
            spyOn(backendService,'requestFilesInPath').and.returnValue(promiseMock(expectedFiles));
            spyOn(backendService,'requestFilesInspection').and.returnValue(promiseMock());

            ctrl.changeFolder( { type: 'folder', path: expectedFolder} );
            
            expect(backendService.requestFilesInspection).toHaveBeenCalledWith(expectedFolder, expectedFiles);
        });

        it('Should be able to obtaint files info', function() {
            spyOn(backendService, 'requestFilesInPath').and.returnValue(promiseMock(expectedFiles));
            spyOn(backendService, 'requestFilesInspection').and.returnValue(promiseMock(expectedFileInfo));
            spyOn(searchService, 'resetIndex');

            ctrl.changeFolder( { type: 'folder', path: expectedFolder} );

            expect(ctrl.filesInfo).toEqual(expectedFileInfo);
            expect(searchService.resetIndex).toHaveBeenCalledWith(expectedFileInfo);
        })
    });
});