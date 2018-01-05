'use strict';

import angular from "angular";
import "angular-mocks";
var ipcMock = window.require('electron').ipcMock;

describe('When using the backend serrvice, it', function() {
    beforeEach(angular.mock.module('frontend'));

    var $rootScope, backendService;

    beforeEach(inject(function(_$rootScope_, _backendService_) {
        $rootScope = _$rootScope_;
        backendService = _backendService_;
    }));

    it('Should be defined', function() {
        expect(backendService).toBeDefined();
    });

    describe('When requesting user path, it', function() {
        var RequestUserPathApi = 'request-path';

        it('Should send the right Api', function() {
            backendService.requestUserPath();
            expect(ipcMock.lastIpcRendererSendParams.api).toEqual(RequestUserPathApi);
            expect(ipcMock.lastIpcRendererSendParams.param1).toBeNull();
            expect(ipcMock.lastIpcRendererSendParams.param2).toBeNull();;
        });

        it('Should receive the right reply', function() {
            backendService.requestUserPath();
            expect(ipcMock.lastIpcRendererOnParams.reply).toEqual(RequestUserPathApi + '-reply');
        });

        it('Should return the expected result', function(done) {
            var ExpectedResult = 'userPath';
            ipcMock.lastIpcRendererOnParams.expectedResult = ExpectedResult;

            backendService.requestUserPath().then(function(result) {
                expect(result).toEqual(ExpectedResult);
                done();
            });

            $rootScope.$apply();
        })
    });

    describe('When requesting files in path, it', function() {
        var RequestFilesInPathApi = 'request-files';
        var ExpectedPath = 'userPath';

        it('Should send the right Api', function() {
            backendService.requestFilesInPath(ExpectedPath);
            expect(ipcMock.lastIpcRendererSendParams.api).toEqual(RequestFilesInPathApi);
            expect(ipcMock.lastIpcRendererSendParams.param1).toEqual(ExpectedPath);
            expect(ipcMock.lastIpcRendererSendParams.param2).toBeNull();;
        });

        it('Should receive the right reply', function() {
            backendService.requestFilesInPath(ExpectedPath);
            expect(ipcMock.lastIpcRendererOnParams.reply).toEqual(RequestFilesInPathApi + '-reply');
        });

        it('Should return the expected result', function(done) {
            var ExpectedResult = ['file1', 'file2', 'file2'];
            ipcMock.lastIpcRendererOnParams.expectedResult = ExpectedResult;

            backendService.requestFilesInPath(ExpectedPath).then(function(result) {
                expect(result).toEqual(ExpectedResult);
                done();
            });

            $rootScope.$apply();
        })
    });

    describe('When requesting files inspection, it', function() {
        var RequestInspectFilesInPathApi = 'inspect-files';
        var ExpectedPath = 'userPath';
        var ExpectedFiles = ['file1', 'file2', 'file2'];

        it('Should send the right Api', function() {
            backendService.requestFilesInspection(ExpectedPath, ExpectedFiles);
            expect(ipcMock.lastIpcRendererSendParams.api).toEqual(RequestInspectFilesInPathApi);
            expect(ipcMock.lastIpcRendererSendParams.param1).toEqual(ExpectedPath);
            expect(ipcMock.lastIpcRendererSendParams.param2).toEqual(ExpectedFiles);;
        });

        it('Should receive the right reply', function() {
            backendService.requestFilesInspection(ExpectedPath, ExpectedFiles);
            expect(ipcMock.lastIpcRendererOnParams.reply).toEqual(RequestInspectFilesInPathApi + '-reply');
        });

        it('Should return the expected result', function(done) {
            var ExpectedResult = [
                { fileInfo:1 }, 
                { fileInfo:2 }, 
                { fileInfo:3 }
            ];
            ipcMock.lastIpcRendererOnParams.expectedResult = ExpectedResult;

            backendService.requestFilesInspection(ExpectedPath, ExpectedFiles).then(function(result) {
                expect(result).toEqual(ExpectedResult);
                done();
            });

            $rootScope.$apply();
        })
    });
});