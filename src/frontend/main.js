import "./css/app.css";
import angular from "angular";
import mainController from "./main.controller";
import backendService from "./backendService";
import { basename } from "path";

/**
 * Boot
 */
angular.module('frontend', [])
    .service('backendService', ['$q', backendService])
    .controller('MainController', ['$scope', 'backendService', mainController]);