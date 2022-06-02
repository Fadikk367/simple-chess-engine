import Piece from './pieces/Piece';
import Position from './Position';
import Move from './Move';

class Board {
  private board: (Piece | undefined)[][];

  constructor() {
    this.board = [[]]
  }

  isFieldOccupied(position: Position): boolean {
    return !!this.board[position.x][position.y]
  }

  getPieceFromField(position: Position): Piece | undefined {
    return this.board[position.x][position.y];
  }

  minimax() {
    this.board.forEach((row, i) => {
      row.forEach((piece, j) => {
        if (!piece) {
          return;
        }

        const currentPosition = new Position(i, j);
        const moves = piece.getMoves(currentPosition);
        const validMovies = moves.filter(this.isValidMove);

        // rekurencyjne wywołania dla poprawnych ruchów
      })
    })
  }

  private isValidMove(move: Move): boolean {
    // 1 czy nie wychodzi poza plansze

    // 2 czy nie jest zajeta przez ten sam kolor

    // 3 czy nie jest zwiazany

    // 4 jesli krolem w szachu to czy z niego wychodzi

    return true;
  }
}

export default Board;
