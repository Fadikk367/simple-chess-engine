import { MoveType } from "constants/enums";
import Move from "./Move";
import Piece from "./pieces/Piece";
import Position from "./Position";

class MoveGenerator {
  generate(piece: Piece, position: Position, type: MoveType): Move[] {
    switch(type) {
      case MoveType.Horizontal:
        return this.generateHorizontalMoves(piece, position);
      case MoveType.Vertical:
        return this.generateVerticalMoves(piece, position);
      case MoveType.Diagonal:
        return this.generateDiagonalMoves(piece, position);
      case MoveType.LMove:
        return this.generateLMoves(piece, position);
      default:
        throw new Error(`Unknown move type: ${type}`);
    }
  }

  private generateHorizontalMoves(piece: Piece, poisition: Position): Move[] {
    return [];
  }

  private generateVerticalMoves(piece: Piece, poisition: Position): Move[] {
    return [];
  }

  private generateDiagonalMoves(piece: Piece, poisition: Position): Move[] {
    return [];
  }

  private generateLMoves(piece: Piece, poisition: Position): Move[] {
    return [];
  }
}

export default MoveGenerator;
