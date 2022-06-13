import { Color, PieceType, MoveType } from 'constants/enums';
import Position from 'core/Position';
import MovePolicy from '../MovePolicy';
import Piece from './Piece';

class Queen extends Piece {
  constructor(color: Color, position: Position) {
    super(color, PieceType.Queen, [new MovePolicy(MoveType.Vertical), new MovePolicy(MoveType.Horizontal), new MovePolicy(MoveType.Diagonal)], position);
  }
}

export default Queen;
