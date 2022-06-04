import Position from '../Position';

import {PieceType, Color} from '../../constants/enums';
import Move from '../Move';

abstract class Piece {
  color: Color;
  type: PieceType;

  constructor(color: Color, type: PieceType) {
    this.color = color;
    this.type = type;
  }

  abstract getMoves(fromPosition: Position): Move[];
}

export default Piece;
