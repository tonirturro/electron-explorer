'use strict';
import angular from "angular";
import "angular-mocks";

describe('Main Controller Test', function() {
    beforeEach(angular.mock.module('frontend'));

    var $scope, controller, backendService, searchService;

    beforeEach(inject(function(_$controller_, _$rootScope_, _backendService_, _searchService_) {
        var $controller = _$controller_;
        var $rootScope = _$rootScope_;
        backendService = _backendService_;
        searchService = _searchService_;
        $scope = $rootScope.$new();
        controller = $controller('MainController', { $scope: $scope });
    }));

    it('Check controller creation', function() {
        expect($scope.filePath).toEqual('searching..');
        expect(angular.isArray($scope.filesInfo)).toBeTruthy();
        expect($scope.filesInfo.length).toBe(0);
    });
});