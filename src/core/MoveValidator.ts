import Move from "./Move";
import Piece from "./pieces/Piece";
import Position from "./Position";
import type Board from "./Board";

class MoveValidator {
  board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  isValidMove(piece: Piece, move: Move): boolean {
    if (!this.isWithinBoard(move.to)) {
      return false;
    }

    const obstaclePiece = this.board.getPieceFromField(move.to);
    if (obstaclePiece) {
      if (obstaclePiece.color === piece.color) {
        return false;
      }
    }

    return true;
  }

  private isWithinBoard(position: Position): boolean {
    return (
      (position.x >= 0 && position.x < this.board.SIZE) &&
      (position.y >= 0 && position.y < this.board.SIZE)
    );
  }
}

export default MoveValidator;
