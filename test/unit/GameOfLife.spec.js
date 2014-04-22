chai.Should();

var AliveCell = GameOfLife.AliveCell,
    DeadCell = GameOfLife.DeadCell,
    Grid = GameOfLife.Grid,
    Neighborhood = GameOfLife.Neighborhood,
    stringify = function (grid, columns) {
        var i = 0, line = "", lines = [];
        grid.scan(function (cell) {
            line += cell.isAlive() ? "x" : ".";
            if (++i % columns === 0) {
                lines.push(line);
                line = "";
            }
        });
        return lines;
    };


describe('Live cell', function () {
    it('should stay alive when it has no neighbours alive', function () {
        var cell = new AliveCell();

        cell.generate([new DeadCell()]);

        cell.isAlive().should.be.true;
    });
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
    it("should return an alive cell for resurrected cell coordinates", function () {
        var grid = new Grid(3, 3);

        grid.resurrect({
            row: 2,
            column: 1
        });

        grid.cell({
            row: 2,
            column: 1
        }).isAlive().should.be.true;
    });
    it("should iterate over all cells", function () {
        var grid = new Grid(1, 2),
            cells = [new DeadCell(), new AliveCell()];
        grid.resurrect({
            row: 0,
            column: 1
        });

        var i = 0;
        grid.scan(function (cell) {
            cell.isAlive().should.equal(cells[i++].isAlive());
        });
    });
    it("should return next generation as described by spec", function () {
        var grid = new Grid(4, 8);
        grid.resurrect({
            row: 1,
            column: 4
        });
        grid.resurrect({
            row: 2,
            column: 3
        });
        grid.resurrect({
            row: 2,
            column: 4
        });

        stringify(grid.generate(), 8).should.have.members([
            "........",
            "...xx...",
            "...xx...",
            "........"
        ]);
    });
});

describe("Neighborhood", function () {

    it("should pass 8 dead neighbours to the cell when building next generation", function () {
        var neighborhood = new Neighborhood(new DeadCell({
            row: 1,
            columns: 1
        }), new Grid(3, 3));

        var neighbours = neighborhood.all;

        neighbours.should.have.length(8);
        neighbours.forEach(function (neighbour) {
            neighbour.isAlive().should.be.false;
        });
    });

    it("should pass cells which are direct neighbours to the cell", function () {
        var coordinates = [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 0],
            [1, 2],
            [2, 0],
            [2, 1],
            [2, 2]
        ], neighborhood = new Neighborhood(new DeadCell({
            row: 1,
            column: 1
        }), new Grid(3, 3));

        var neighbours = neighborhood.all;

        var i = 0;
        neighbours.forEach(function (neighbour) {
            neighbour.coordinates.row.should.equals(coordinates[i][0]);
            neighbour.coordinates.column.should.equals(coordinates[i][1]);
            i += 1;
        });
    });
});