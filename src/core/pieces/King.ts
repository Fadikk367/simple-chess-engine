import { Color, PieceType, MoveType } from 'constants/enums';
import Position from 'core/Position';
import MoveConstraints from 'core/MoveConstraints';
import MovePolicy from 'core/MovePolicy';
import Piece from './Piece';

class King extends Piece {
  underCheck: boolean;

  constructor(color: Color, position: Position) {
    const movePolicies = [
      new MovePolicy(MoveType.Horizontal, new MoveConstraints({ max: 1 })),
      new MovePolicy(MoveType.Vertical, new MoveConstraints({ max: 1 })),
      new MovePolicy(MoveType.Diagonal, new MoveConstraints({ max: 1 })),
    ]

    super(color, PieceType.King, movePolicies, position);
    this.underCheck = false;
  }
}

export default King;
