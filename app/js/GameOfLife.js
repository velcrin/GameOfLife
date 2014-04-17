var GameOfLife = (function () {
    var ALIVE = "alive", DEAD = "dead";

    function Cell(initialState) {
        var state = initialState || DEAD;

        function getNumberOfAlive(neighbours) {
            var nbAliveCells = 0;
            neighbours.forEach(function (neighbor) {
                if (neighbor.isAlive()) {
                    nbAliveCells += 1;
                }
            });
            return nbAliveCells;
        }

        return {
            calculateState: function (neighbours) {
                var liveCellNumber = getNumberOfAlive(neighbours);
                if (liveCellNumber < 2 || liveCellNumber > 3) {
                    state = DEAD;
                }
                if(liveCellNumber === 3) {
                    state = ALIVE;
                }
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

    return {
        AliveCell: AliveCell,
        DeadCell: DeadCell
    };
})();