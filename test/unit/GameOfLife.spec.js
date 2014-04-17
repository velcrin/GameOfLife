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
                var liveCellNumber = getNumberOfAlive(neighbours);
                if(liveCellNumber < 2) {
                    state = DEAD;
                }
                if(liveCellNumber > 3) {
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
        AliveCell: AliveCell
    };
})(),
    AliveCell = GameOfLife.AliveCell;

describe('Live cell', function () {
    it('should die when it has fewer than two live neighbours', function () {
        var cell = new AliveCell();

        cell.calculateState([new AliveCell()]);

        cell.isAlive().should.be.false;
    });
    it('should stay alive when it has at least two live neighbours', function () {
        var cell = new AliveCell();

        cell.calculateState([
            new AliveCell(),
            new AliveCell()]);

        cell.isAlive().should.be.true;
    });
    it('should die when it has more than three live neighbours', function () {
        var cell = new AliveCell();

        cell.calculateState([
            new AliveCell(),
            new AliveCell(),
            new AliveCell(),
            new AliveCell()]);

        cell.isAlive().should.be.false;
    });
});