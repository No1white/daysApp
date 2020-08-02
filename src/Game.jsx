import React from 'react';

function Squre(props) {
    return (
        <button className={'square'} onClick={props.onClick}>{props.value}</button>
    )
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext:true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X':'O';
        this.setState({squares: squares,xIsNext:!this.state.xIsNext});
    }
    renderSqure(i) {
        return (
            <Squre
            value={this.state.squares[i]}
            onClick={()=>this.handleClick(i)}></Squre>);
    }
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (

            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSqure(0)}
                    {this.renderSqure(1)}
                    {this.renderSqure(2)}
                </div>
                <div className="board-row">
                    {this.renderSqure(3)}
                    {this.renderSqure(4)}
                    {this.renderSqure(5)}
                </div>
                <div className="board-row">
                    {this.renderSqure(6)}
                    {this.renderSqure(7)}
                    {this.renderSqure(8)}
                </div>
            </div>
        )
    }
}
class Game extends  React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board></Board>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        )
    }
}
export  default Game
