import { Color, PieceType, MoveType } from 'constants/enums';
import Position from 'core/Position';
import MovePolicy from '../MovePolicy';
import Piece from './Piece';

class Knight extends Piece {
  constructor(color: Color, position: Position) {
    super(color, PieceType.Knight, [new MovePolicy(MoveType.LMove)], position);
  }
}

export default Knight;
