chai.Should();

var stringify = function (grid, columns) {
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

    beforeEach(module('GameOfLife.services'));

    it('should stay alive when it has no neighbours alive', inject(function (GameOfLife) {
        var cell = new GameOfLife.AliveCell();

        cell.generate([new GameOfLife.DeadCell()]);

        cell.isAlive().should.be.false;
    }));
    it('should die when it has fewer than two live neighbours', inject(function (GameOfLife) {
        var cell = new GameOfLife.AliveCell();

        cell.generate([new GameOfLife.AliveCell()]);

        cell.isAlive().should.be.false;
    }));
    it('should stay alive when it has at least two live neighbours', inject(function (GameOfLife) {
        var cell = new GameOfLife.AliveCell();

        cell.generate([
            new GameOfLife.AliveCell(),
            new GameOfLife.AliveCell()]);

        cell.isAlive().should.be.true;
    }));
    it('should die when it has more than three live neighbours', inject(function (GameOfLife) {
        var cell = new GameOfLife.AliveCell();

        cell.generate([
            new GameOfLife.AliveCell(),
            new GameOfLife.AliveCell(),
            new GameOfLife.AliveCell(),
            new GameOfLife.AliveCell()]);

        cell.isAlive().should.be.false;
    }));
    it('should live when it has two living neighbours', inject(function (GameOfLife) {
        var cell = new GameOfLife.AliveCell();

        cell.generate([
            new GameOfLife.AliveCell(),
            new GameOfLife.AliveCell()]);

        cell.isAlive().should.be.true;
    }));
    it('should live when it has three living neighbours', inject(function (GameOfLife) {
        var cell = new GameOfLife.AliveCell();

        cell.generate([
            new GameOfLife.AliveCell(),
            new GameOfLife.AliveCell(),
            new GameOfLife.AliveCell()]);

        cell.isAlive().should.be.true;
    }));
});
describe('Dead cell', function () {

    beforeEach(module('GameOfLife.services'));

    it('should live when it has three living neighbours', inject(function (GameOfLife) {
        var cell = new GameOfLife.DeadCell();

        cell.generate([
            new GameOfLife.AliveCell(),
            new GameOfLife.AliveCell(),
            new GameOfLife.AliveCell()]);

        cell.isAlive().should.be.true;
    }));
});

describe('Grid', function () {

    beforeEach(module('GameOfLife.services'));

    it('should return a dead cell when the coordinates requested are inside the bound', inject(function (GameOfLife) {
        var grid = new GameOfLife.Grid(3, 4);

        var cell = grid.cell({
            row: 1,
            columns: 2
        });

        cell.isAlive().should.be.false;
    }));
    it('should return a dead cell when the coordinates requested are out of bound', inject(function (GameOfLife) {
        var grid = new GameOfLife.Grid(3, 4);

        var cell = grid.cell({
            row: -1,
            columns: -1
        });

        cell.isAlive().should.be.false;
    }));
    it("should return an alive cell for resurrected cell coordinates", inject(function (GameOfLife) {
        var grid = new GameOfLife.Grid(3, 3);

        grid.resurrect({
            row: 2,
            column: 1
        });

        grid.cell({
            row: 2,
            column: 1
        }).isAlive().should.be.true;
    }));
    it("should iterate over all cells", inject(function (GameOfLife) {
        var grid = new GameOfLife.Grid(1, 2),
            cells = [new GameOfLife.DeadCell(), new GameOfLife.AliveCell()];
        grid.resurrect({
            row: 0,
            column: 1
        });

        var i = 0;
        grid.scan(function (cell) {
            cell.isAlive().should.equal(cells[i++].isAlive());
        });
    }));
    it("should return next generation as described by spec", inject(function (GameOfLife) {
        var grid = new GameOfLife.Grid(4, 8);
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
    }));
});

describe("Neighborhood", function () {

    beforeEach(module('GameOfLife.services'));

    it("should pass 8 dead neighbours to the cell when building next generation", inject(function (GameOfLife) {
        var neighborhood = new GameOfLife.Neighborhood(new GameOfLife.DeadCell({
            row: 1,
            columns: 1
        }), new GameOfLife.Grid(3, 3));

        var neighbours = neighborhood.all;

        neighbours.should.have.length(8);
        neighbours.forEach(function (neighbour) {
            neighbour.isAlive().should.be.false;
        });
    }));

    it("should pass cells which are direct neighbours to the cell", inject(function (GameOfLife) {
        var coordinates = [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 0],
            [1, 2],
            [2, 0],
            [2, 1],
            [2, 2]
        ], neighborhood = new GameOfLife.Neighborhood(new GameOfLife.DeadCell({
            row: 1,
            column: 1
        }), new GameOfLife.Grid(3, 3));

        var neighbours = neighborhood.all;

        var i = 0;
        neighbours.forEach(function (neighbour) {
            neighbour.coordinates.row.should.equals(coordinates[i][0]);
            neighbour.coordinates.column.should.equals(coordinates[i][1]);
            i += 1;
        });
    }));
});