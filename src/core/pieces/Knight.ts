import { Color, PieceType } from '../../constants/enums';
import Move from '../Move';
import Position from '../Position';
import Piece from './Piece';

class Knight extends Piece {
  constructor(color: Color) {
    super(color, PieceType.Knight);
  }

  getMoves(fromPosition: Position): Move[] {
    return []
  }
}

export default Knight;
