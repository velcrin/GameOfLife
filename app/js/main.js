'use strict';

angular.module('GameOfLife', [
    'ngRoute',
    'GameOfLife.controllers'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: 'partials/grid.html',
            controller: 'GridCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
