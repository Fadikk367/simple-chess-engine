import Move from "./Move";
import Piece from "./pieces/Piece";
import Position from "./Position";
import type Board from "./Board";
import { Color, PieceType } from "constants/enums";

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
      } else {
        move.isCapture = true;
      }
    }


    /* It might be indeed done in a more generic way, but we need it only for a pawn and this is the simplest I found */    
    if(piece.type === PieceType.Pawn) {
      /* Check if pawn's diagonal move is leading to capture (only allowed) */
      /* Also check if there is no move backwards (depending on color), because pawn cannot move backwards */
      if((this.isNotStraightMove(move) && !move.isCapture) || (!this.isNotStraightMove(move) && move.isCapture) ||
      ((piece.color === Color.White && move.to.x >= move.from.x) || (piece.color === Color.Black && move.to.x <= move.from.x))) {
        return false;
      }
    }

    return true;
  }

  isWithinBoard(position: Position): boolean {
    return (
      (position.x >= 0 && position.x < this.board.SIZE) &&
      (position.y >= 0 && position.y < this.board.SIZE)
    );
  }

  private isNotStraightMove(move: Move): boolean {
    /* if both cords differ then move is neither horizontal nor vertical */
    return (move.from.x !== move.to.x) && (move.from.y !== move.to.y);
  }
}

export default MoveValidator;
