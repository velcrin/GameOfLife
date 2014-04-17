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
            // there is a maximum of 8 neighbours
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
            }
        };
    }

    function Grid(rows, columns) {

        function buildRow(row, size) {
            for(var i = 0; i < size; i++) {
                row.push(new DeadCell());
            }
        }
        function buildCells(rows, columns) {
            var cells = [];
            for(var i = 0; i < rows; i++) {
                var row = [];
                buildRow(row, columns);
                cells.push(row);
            }
            return cells;
        }
        var cells = buildCells(rows, columns);
        return {
            get cells() {
                return cells;
            }
        };
    }

    return {
        AliveCell: function() {
            return new Cell(ALIVE);
        },
        DeadCell: function() {
            return new Cell(DEAD);
        },
        Grid: Grid
    };
})();