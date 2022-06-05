import { MoveType } from "constants/enums";
import Board from "./Board";
import Move from "./Move";
import MoveConstraints from "./MoveConstraints";
import MoveValidator from "./MoveValidator";
import Piece from "./pieces/Piece";
import Position from "./Position";

class MoveGenerator {
  board: Board;
  validator: MoveValidator;

  constructor(board: Board) {
    this.board = board;
    this.validator = new MoveValidator(board);
  }

  generate(piece: Piece): Move[] {
    return piece.movePolicies.map(movePolicy => {
      switch(movePolicy.type) {
        case MoveType.Horizontal:
          return this.generateHorizontalMoves(piece, movePolicy.constraints);
        case MoveType.Vertical:
          return this.generateVerticalMoves(piece, movePolicy.constraints);
        case MoveType.Diagonal:
          return this.generateDiagonalMoves(piece, movePolicy.constraints);
        case MoveType.LMove:
          return this.generateLMoves(piece);
        default:
          throw new Error(`Unknown move type: ${movePolicy.type}`);
      }
    }).flat();
  }

  private generateHorizontalMoves(piece: Piece, constraints?: MoveConstraints): Move[] {
    return [];
  }

  private generateVerticalMoves(piece: Piece, constraints?: MoveConstraints): Move[] {
    return [];
  }

  private generateDiagonalMoves(piece: Piece, constraints?: MoveConstraints): Move[] {
    return [];
  }

  private generateLMoves(piece: Piece): Move[] {
    const movesCandidates = [
      new Move(piece.position, new Position(piece.position.x - 2, piece.position.y + 1)),
      new Move(piece.position, new Position(piece.position.x - 2, piece.position.y - 1)),
      new Move(piece.position, new Position(piece.position.x + 2, piece.position.y + 1)),
      new Move(piece.position, new Position(piece.position.x + 2, piece.position.y - 1)),
      new Move(piece.position, new Position(piece.position.x + 1, piece.position.y - 2)),
      new Move(piece.position, new Position(piece.position.x - 1, piece.position.y - 2)),
      new Move(piece.position, new Position(piece.position.x + 1, piece.position.y + 2)),
      new Move(piece.position, new Position(piece.position.x - 1, piece.position.y + 2))
    ];

    return movesCandidates.filter((move) => this.validator.isValidMove(piece, move));
  }
}

export default MoveGenerator;
