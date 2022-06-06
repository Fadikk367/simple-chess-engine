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
    const leftMoves = this.generateContinousMoves({piece, horizontal: true, horizontalDirection: -1, constraints});
    const rightMoces = this.generateContinousMoves({piece, horizontal: true, horizontalDirection: 1, constraints});
    return [...leftMoves, ...rightMoces];
  }

  private generateVerticalMoves(piece: Piece, constraints?: MoveConstraints): Move[] {
    const upMoves = this.generateContinousMoves({piece, vertical: true, verticalDirection: -1, constraints});
    const downMoces = this.generateContinousMoves({piece, vertical: true, verticalDirection: 1, constraints});
    return [...upMoves, ...downMoces];
  }

  private generateDiagonalMoves(piece: Piece, constraints?: MoveConstraints): Move[] {
    const upLeftMoves = this.generateContinousMoves({piece, vertical: true, horizontal: true, verticalDirection: -1, horizontalDirection: -1, constraints});
    const upRigtMoves = this.generateContinousMoves({piece, vertical: true, horizontal: true, verticalDirection: 1, horizontalDirection: -1, constraints});
    const downLeftMoves = this.generateContinousMoves({piece, vertical: true, horizontal: true, verticalDirection: -1, horizontalDirection: 1, constraints});
    const downRightMoves = this.generateContinousMoves({piece, vertical: true, horizontal: true, verticalDirection: 1, horizontalDirection: 1, constraints});
    return [...upLeftMoves, ...upRigtMoves, ...downLeftMoves, ...downRightMoves];
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

  private generateContinousMoves({
    piece, 
    vertical = false, 
    horizontal = false,
    horizontalDirection = 1, 
    verticalDirection = 1, 
    constraints
  }: {
    piece: Piece, 
    vertical?: boolean, 
    horizontal?: boolean,
    horizontalDirection?: 1 | -1, 
    verticalDirection?: 1 | -1, 
    constraints?: MoveConstraints
  }): Move[] {
    const continuousMoves: Move[] = [];
    let offset = 1;
  
    while (true) {
      if (constraints?.max && offset > constraints.max) {
        break;
      }
  
      const position = new Position(piece.position.x, piece.position.y);

      if (vertical) {
        position.x += offset * verticalDirection;
      }

      if (horizontal) {
        position.y += offset * horizontalDirection;
      }

      const moveCandidate = new Move(new Position(piece.position.x, piece.position.y), position);
      if (!this.validator.isValidMove(piece, moveCandidate)) {
        break;
      }

      continuousMoves.push(moveCandidate);
      offset++;

      if (moveCandidate.isCapture) {
        break;
      }
    }

    return continuousMoves;
  }
}

export default MoveGenerator;
