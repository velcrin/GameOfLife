var GameOfLife = (function () {
    var ALIVE = "alive", DEAD = "dead";

    function Cell(state, coordinates) {

        state = state || DEAD;
        var die = function () {
                state = DEAD;
            }, live = function () {
                state = ALIVE;
            }, stay = function () {
            },
            lifeCycle = [0, die, stay, live, die, die, die, die, die];

        return {
            generate: function (neighbours) {
                var index = 0;
                neighbours.forEach(function (neighbor) {
                    if (neighbor.isAlive()) {
                        index += 1;
                    }
                });
                lifeCycle[index]();
            },
            isAlive: function () {
                return state === ALIVE;
            },
            get row() {
                return coordinates.row;
            },
            get column() {
                return coordinates.column;
            }
        };
    }

    function AliveCell(coordiantes) {
        return new Cell(ALIVE, coordiantes);
    }

    function DeadCell(coordiantes) {
        return new Cell(DEAD, coordiantes);
    }

    function Grid(rows, columns) {

        return {
            cell: function (coordinates) {
                return new DeadCell(coordinates);
            }
        };
    }

    function Neighborhood(cell, grid) {
        var neighbours = [];
        [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1]
        ].forEach(function (coordinates) {
                neighbours.push(grid.cell({
                    row: cell.row + coordinates[0],
                    column: cell.column + coordinates[1]}));
            });
        return {
            generate: function () {
                cell.generate(neighbours);
            }
        }
    }

    return {
        AliveCell: AliveCell,
        DeadCell: DeadCell,
        Grid: Grid,
        Neighborhood: Neighborhood
    };
})();