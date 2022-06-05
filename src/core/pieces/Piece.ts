import Position from 'core/Position';

import {PieceType, Color} from 'constants/enums';
import MovePolicy from 'core/MovePolicy';

abstract class Piece {
  color: Color;
  type: PieceType;
  movePolicies: MovePolicy[];
  position: Position;

  constructor(color: Color, type: PieceType, movePolicies: MovePolicy[], position: Position) {
    this.color = color;
    this.type = type;
    this.movePolicies = movePolicies;
    this.position = position;
  }
}

export default Piece;
