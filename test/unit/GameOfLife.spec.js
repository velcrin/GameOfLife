chai.Should();

var AliveCell = GameOfLife.AliveCell,
    DeadCell = GameOfLife.DeadCell,
    Grid = GameOfLife.Grid,
    Neighborhood = GameOfLife.Neighborhood;

describe('Live cell', function () {
    it('should die when it has fewer than two live neighbours', function () {
        var cell = new AliveCell();

        cell.generate([new AliveCell()]);

        cell.isAlive().should.be.false;
    });
    it('should stay alive when it has at least two live neighbours', function () {
        var cell = new AliveCell();

        cell.generate([
            new AliveCell(),
            new AliveCell()]);

        cell.isAlive().should.be.true;
    });
    it('should die when it has more than three live neighbours', function () {
        var cell = new AliveCell();

        cell.generate([
            new AliveCell(),
            new AliveCell(),
            new AliveCell(),
            new AliveCell()]);

        cell.isAlive().should.be.false;
    });
    it('should live when it has two living neighbours', function () {
        var cell = new AliveCell();

        cell.generate([
            new AliveCell(),
            new AliveCell()]);

        cell.isAlive().should.be.true;
    });
    it('should live when it has three living neighbours', function () {
        var cell = new AliveCell();

        cell.generate([
            new AliveCell(),
            new AliveCell(),
            new AliveCell()]);

        cell.isAlive().should.be.true;
    });
});
describe('Dead cell', function () {
    it('should live when it has three living neighbours', function () {
        var cell = new DeadCell();

        cell.generate([
            new AliveCell(),
            new AliveCell(),
            new AliveCell()]);

        cell.isAlive().should.be.true;
    });
});

describe('Grid', function () {
    it('should return a dead cell when the coordinates requested are inside the bound', function () {
        var grid = new Grid(3, 4);

        var cell = grid.cell({
            row: 1,
            columns: 2
        });

        cell.isAlive().should.be.false;
    });
    it('should return a dead cell when the coordinates requested are out of bound', function () {
        var grid = new Grid(3, 4);

        var cell = grid.cell({
            row: -1,
            columns: -1
        });

        cell.isAlive().should.be.false;
    });
});

describe("Neighborhood", function () {

    function CellMock(coordinates) {
        return {
            generate: function (neighbours) {
                this.neighbours = neighbours;
            },
            row: coordinates.row,
            column: coordinates.column
        };
    }

    it("should pass 8 dead neighbours to the cell when building next generation", function () {
        var cell = new CellMock({
            row: 1,
            column: 1
        });
        var neighborhood = new Neighborhood(cell, new Grid(3, 3));

        neighborhood.generate();

        cell.neighbours.should.have.length(8);
        cell.neighbours.forEach(function (neighbour) {
            neighbour.isAlive().should.be.false;
        });
    });

    it("should pass 8 dead neighbours to the cell when building next generation", function () {
        var cell = new CellMock({
            row: 1,
            column: 1
        }), neighborhood = new Neighborhood(cell, new Grid(3, 3));

        neighborhood.generate();

        cell.neighbours.should.have.length(8);
        cell.neighbours.forEach(function (neighbour) {
            neighbour.isAlive().should.be.false;
        });
    });

    it("should pass cells which are direct neighbours to the cell", function () {
        var cell = new CellMock({
            row: 1,
            column: 1
        }), neighbours = [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 0],
            [1, 2],
            [2, 0],
            [2, 1],
            [2, 2]
        ], neighborhood = new Neighborhood(cell, new Grid(3, 3));

        neighborhood.generate();

        var i = 0;
        cell.neighbours.forEach(function (neighbour) {
            neighbour.row.should.equals(neighbours[i][0]);
            neighbour.column.should.equals(neighbours[i][1]);
            i += 1;
        });
    });
});