chai.Should();

var AliveCell = GameOfLife.AliveCell,
    DeadCell = GameOfLife.DeadCell;

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
    it('should live when it has two living neighbours', function () {
        var cell = new AliveCell();

        cell.calculateState([
            new AliveCell(),
            new AliveCell()]);

        cell.isAlive().should.be.true;
    });
    it('should live when it has three living neighbours', function () {
        var cell = new AliveCell();

        cell.calculateState([
            new AliveCell(),
            new AliveCell(),
            new AliveCell()]);

        cell.isAlive().should.be.true;
    });
});
describe('Dead cell', function () {
    it('should live when it has three living neighbours', function () {
        var cell = new DeadCell();

        cell.calculateState([
            new AliveCell(),
            new AliveCell(),
            new AliveCell()]);

        cell.isAlive().should.be.true;
    });
});