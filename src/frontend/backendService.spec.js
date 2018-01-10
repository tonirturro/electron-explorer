'use strict';

import angular from "angular";
import "angular-mocks";

describe('When using the backend serrvice, it', function() {
    beforeEach(angular.mock.module('frontend'));

    var $rootScope, backendService, ipcMain;

    beforeEach(inject(function(_$rootScope_, _backendService_) {
        $rootScope = _$rootScope_;
        backendService = _backendService_;
        ipcMain = backendService.ipcMain;
    }));

    it('Should be defined', function() {
        expect(backendService).toBeDefined();
    });

    describe('When requesting user path, it', function() {

        it('Should return the expected result', function(done) {
            var RequestUserPathApi = 'request-path';
            var ExpectedResult = 'userPath';

            ipcMain.once(RequestUserPathApi, function(event, arg) {
                expect(arg).toBeNull();
                event.sender.send(RequestUserPathApi + '-reply', ExpectedResult);
            })

            backendService.requestUserPath().then(function(result) {
                expect(result).toEqual(ExpectedResult);
                done();
            });

            $rootScope.$apply();
        })
    });

    describe('When requesting files in path, it', function() {

        it('Should return the expected result', function(done) {
            var RequestFilesInPathApi = 'request-files';
            var ExpectedPath = 'userPath';
            var ExpectedResult = ['file1', 'file2', 'file2'];

            ipcMain.once(RequestFilesInPathApi, function(event, arg) {
                expect(arg).toEqual(ExpectedPath);
                event.sender.send(RequestFilesInPathApi + '-reply', ExpectedResult);
            })

            backendService.requestFilesInPath(ExpectedPath).then(function(result) {
                expect(result).toEqual(ExpectedResult);
                done();
            });

            $rootScope.$apply();
        })
    });

    describe('When requesting files inspection, it', function() {

        it('Should return the expected result', function(done) {
            var RequestInspectFilesInPathApi = 'inspect-files';
            var ExpectedPath = 'userPath';
            var ExpectedFiles = ['file1', 'file2', 'file2'];
            var ExpectedResult = [
                { fileInfo:1 }, 
                { fileInfo:2 }, 
                { fileInfo:3 }
            ];

            ipcMain.once(RequestInspectFilesInPathApi, function(event, arg1, arg2) {
                expect(arg1).toEqual(ExpectedPath);
                expect(arg2).toEqual(ExpectedFiles);
                event.sender.send(RequestInspectFilesInPathApi + '-reply', ExpectedResult);
            })

            backendService.requestFilesInspection(ExpectedPath, ExpectedFiles).then(function(result) {
                expect(result).toEqual(ExpectedResult);
                done();
            });

            $rootScope.$apply();
        })
    });
});