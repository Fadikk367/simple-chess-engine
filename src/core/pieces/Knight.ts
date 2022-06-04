import { Color, PieceType } from '../../constants/enums';
import Board from '../Board';
import Move from '../Move';
import Position from '../Position';
import Piece from './Piece';

class Knight extends Piece {
  constructor(color: Color) {
    super(color, PieceType.Knight);
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
