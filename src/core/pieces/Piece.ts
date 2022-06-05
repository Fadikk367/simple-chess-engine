import Position from '../Position';

import {PieceType, Color, MoveType} from 'constants/enums';
import Move from '../Move';

abstract class Piece {
  color: Color;
  type: PieceType;
  moveTypes: MoveType[];

  constructor(color: Color, type: PieceType, moveTypes: MoveType[]) {
    this.color = color;
    this.type = type;
    this.moveTypes = moveTypes;
  }

  abstract getMoves(fromPosition: Position): Move[];
}

export default Piece;
