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
            lifeCycle = [stay, die, stay, live, die, die, die, die, die];

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
            get coordinates() {
                return coordinates;
            },
            get state() {
                return state;
            }
        };
    }

    function AliveCell(coordiantes) {
        return new Cell(ALIVE, coordiantes);
    }

    function DeadCell(coordiantes) {
        return new Cell(DEAD, coordiantes);
    }

    function Grid(rows, columns, alive) {
        alive = alive || [];

        function isAlive(coordinates) {
            return alive.some(function (cell) {
                return cell.row === coordinates.row && cell.column === coordinates.column;
            });
        }

        function cell(coordinates) {
            if (isAlive(coordinates) === true) {
                return new AliveCell(coordinates);
            }
            return new DeadCell(coordinates);
        }

        function scan(closure) {
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < columns; j++) {
                    closure(cell({
                        row: i,
                        column: j
                    }));
                }
            }
        }

        function generate() {
            var generation = [],
                grid = this;
            scan(function (cell) {
                cell.generate(new Neighborhood(cell, grid).all);
                if(cell.isAlive()) {
                    generation.push(cell.coordinates);
                }
            });
            return new Grid(rows, columns, generation);
        }

        return {
            scan: scan,
            cell: cell,
            resurrect: function (coordinates) {
                alive.push(coordinates);
            },
            generate: generate,
            row: function(index) {
                var cells = [];
                for (var i = 0; i < columns; i++) {
                    cells.push(cell({
                        row: index,
                        column: i
                    }));
                }
                return cells;
            },
            get rows() {
                var cells = [];
                for (var i = 0; i < rows; i++) {
                    cells.push(this.row(i));
                }
                return cells;
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
                    row: cell.coordinates.row + coordinates[0],
                    column: cell.coordinates.column + coordinates[1]}));
            });
        return {
            get all() {
                return neighbours;
            }
        };
    }

    return {
        AliveCell: AliveCell,
        DeadCell: DeadCell,
        Grid: Grid,
        Neighborhood: Neighborhood
    };
})();