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
            calculateState: function (neighbours) {
                var alive = 0;
                neighbours.forEach(function (neighbor) {
                    if (neighbor.isAlive()) {
                        alive += 1;
                    }
                });
                cycle[alive]();
            },
            isAlive: function () {
                return state === ALIVE;
            }
        };
    }

    function AliveCell() {
        return new Cell(ALIVE);
    }

    function DeadCell() {
        return new Cell(DEAD);
    }

    function Grid() {

    }

    return {
        AliveCell: AliveCell,
        DeadCell: DeadCell
    };
})();