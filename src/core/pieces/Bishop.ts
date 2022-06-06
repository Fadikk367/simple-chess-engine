import { Color, PieceType, MoveType } from 'constants/enums';
import Position from 'core/Position';
import MovePolicy from '../MovePolicy';
import Piece from './Piece';

class Bishop extends Piece {
  constructor(color: Color, position: Position) {
    super(color, PieceType.Bishop, [new MovePolicy(MoveType.Diagonal)], position);
  }
}

export default Bishop;
