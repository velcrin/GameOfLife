chai.Should();

var AliveCell = GameOfLife.AliveCell,
    DeadCell = GameOfLife.DeadCell,
    Grid = GameOfLife.Grid;

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
    it('should have the right number of rows', function () {
        var grid = new Grid(3, 4);

        grid.cells.should.have.length(3);
    });
    it('should have the right number of columns', function () {
        var grid = new Grid(3, 4);

        grid.print();

        grid.cells[0].should.have.length(4);
    });
});