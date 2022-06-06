import { Color, PieceType, MoveType } from 'constants/enums';
import Position from 'core/Position';
import MoveConstraints from '../MoveConstraints';
import MovePolicy from '../MovePolicy';
import Piece from './Piece';

class Pawn extends Piece {

  afterFirstMove: boolean;

  constructor(color: Color, position: Position) {
    super(color, PieceType.Pawn, [new MovePolicy(MoveType.Vertical, new MoveConstraints({max: 2}))], position);
    this.afterFirstMove = false;
  }

  setMovePolicies(movePolicies: MovePolicy[]) {
      this.movePolicies = movePolicies;
  }
}

export default Pawn;
