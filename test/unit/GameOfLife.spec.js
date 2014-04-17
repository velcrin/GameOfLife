chai.Should();

var GameOfLife = (function() {
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
                if(getNumberOfAlive(neighbours) < 2) {
                    state = DEAD;
                }
            },
            isAlive: function() {
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

describe('Live cell', function () {
    it('should die when it has fewer than two live neighbours', function () {
        var cell = new GameOfLife.AliveCell();

        cell.calculateState([new GameOfLife.AliveCell()]);

        cell.isAlive().should.be.false;
    });
    it('should stay alive when it has at least two live neighbours', function () {
        var cell = new GameOfLife.AliveCell();

        cell.calculateState([new GameOfLife.AliveCell(), new GameOfLife.AliveCell()]);

        cell.isAlive().should.be.true;
    });
});