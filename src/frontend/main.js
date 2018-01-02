import "./css/app.css";
import angular from "angular";
import mainController from "./main.controller";
import backendService from "./backendService";
import searchService from "./searchService";
import { basename } from "path";

/**
 * Boot
 */
angular.module('frontend', [])
    .service('backendService', backendService)
    .service('searchService', searchService)
    .controller('MainController', mainController);