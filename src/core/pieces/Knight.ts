import { Color, PieceType, MoveType } from 'constants/enums';
import Move from 'core/Move';
import Position from 'core/Position';
import Piece from './Piece';

class Knight extends Piece {
  static knightMoveTypes = [MoveType.LMove]
  constructor(color: Color) {
    super(color, PieceType.Knight, Knight.knightMoveTypes);
  }

  getMoves(fromPosition: Position): Move[] {
    const movesLegalForKnight: Move[] = this.getMovesBasedOnRulesForPiece(fromPosition);

    return movesLegalForKnight;
  }

  private getMovesBasedOnRulesForPiece(fromPosition: Position): Move[] {
    const moves: Move[] = [];

    moves.push(
      new Move(this, fromPosition, new Position(fromPosition.x - 2, fromPosition.y + 1)),
      new Move(this, fromPosition, new Position(fromPosition.x - 2, fromPosition.y - 1)),
      new Move(this, fromPosition, new Position(fromPosition.x + 2, fromPosition.y + 1)),
      new Move(this, fromPosition, new Position(fromPosition.x + 2, fromPosition.y - 1)),
      new Move(this, fromPosition, new Position(fromPosition.x + 1, fromPosition.y - 2)),
      new Move(this, fromPosition, new Position(fromPosition.x - 1, fromPosition.y - 2)),
      new Move(this, fromPosition, new Position(fromPosition.x + 1, fromPosition.y + 2)),
      new Move(this, fromPosition, new Position(fromPosition.x - 1, fromPosition.y + 2))
    );

    return moves;
  }
}

export default Knight;
