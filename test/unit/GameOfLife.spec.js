var ALIVE = "alive", DEAD = "dead";

function Cell(initialState) {
    var state = initialState || DEAD;
    return {
        setNeighbours: function (neighbours) {
            var nbAliveCells = 0;
            neighbours.forEach(function(neighbor) {
                if(neighbor.state === ALIVE) {
                    nbAliveCells += 1;
                }
            });
            if(nbAliveCells < 2) {
                state = DEAD;
            }
        },
        get state() {
            return state;
        }
    };
}

describe('Live cell', function () {
    it('should die when it has fewer than two live neighbours', function () {
        var cell = new Cell(ALIVE);

        cell.setNeighbours([new Cell(ALIVE)]);

        expect(cell.state).toBe(DEAD);
    });
});