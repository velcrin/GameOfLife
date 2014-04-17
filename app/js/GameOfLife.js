/* global GameOfLife */

var GameOfLife = (function () {
    var ALIVE = "alive", DEAD = "dead";

    function Cell(initialState) {

        var state = initialState || DEAD,
            die = function () {
                state = DEAD;
            }, live = function () {
                state = ALIVE;
            }, stay = function () {
            },
            cycle = [0, die, stay, live, die, die, die, die, die];

        return {
            generate: function (neighbours) {
                var index = 0;
                neighbours.forEach(function (neighbor) {
                    if (neighbor.isAlive()) {
                        index += 1;
                    }
                });
                cycle[index]();
            },
            isAlive: function () {
                return state === ALIVE;
            },
            get state() {
                return state;
            }
        };
    }

    function Grid(rows, columns) {

        function buildRow(row, size) {
            for (var i = 0; i < size; i++) {
                row.push(new DeadCell());
            }
        }

        function buildCells(rows, columns) {
            var cells = [];
            for (var i = 0; i < rows; i++) {
                var row = [];
                buildRow(row, columns);
                cells.push(row);
            }
            return cells;
        }

        function stringify(row, size) {
            var text = "";
            for (var i = 0; i < size; i++) {
                text += row[i].state + " ";
            }
            return text.trim();
        }

        var cells = buildCells(rows, columns);
        return {
            get cells() {
                return cells;
            },
            print: function () {
                for (var i = 0; i < rows; i++) {
                    console.log(stringify(cells[i], columns));
                }
            }
        };
    }

    return {
        AliveCell: function () {
            return new Cell(ALIVE);
        },
        DeadCell: function () {
            return new Cell(DEAD);
        },
        Grid: Grid
    };
})();