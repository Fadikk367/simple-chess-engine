import { Color, PieceType, MoveType } from 'constants/enums';
import Position from 'core/Position';
import MovePolicy from '../MovePolicy';
import Piece from './Piece';

class Rook extends Piece {
  constructor(color: Color, position: Position) {
    super(color, PieceType.Rook, [new MovePolicy(MoveType.Vertical), new MovePolicy(MoveType.Horizontal)], position);
  }
}

export default Rook;
