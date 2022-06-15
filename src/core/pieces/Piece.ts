import Position from 'core/Position';

import {PieceType, Color, PieceValue} from 'constants/enums';
import MovePolicy from 'core/MovePolicy';
import { pieceToValue } from 'constants/types';

abstract class Piece {
  color: Color;
  type: PieceType;
  movePolicies: MovePolicy[];
  position: Position;
  value: PieceValue;

  constructor(color: Color, type: PieceType, movePolicies: MovePolicy[], position: Position) {
    this.color = color;
    this.type = type;
    this.movePolicies = movePolicies;
    this.position = position;
    this.value = pieceToValue[this.type];
  }
}

export default Piece;
