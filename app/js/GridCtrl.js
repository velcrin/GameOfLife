'use strict';

angular.module('GameOfLife.controllers', [])
    .controller('GridCtrl', ['$scope', function ($scope) {
        var scope = $scope,
            grid = new GameOfLife.Grid(16, 16);
        function reload() {
            scope.rows = grid.rows;
        }
        scope.onGenerateClick = function() {
            grid = grid.generate();
            reload();
        };
        scope.onCellClick = function(cell) {
            grid.resurrect(cell.coordinates);
            reload();
        };
        reload();
    }]);
