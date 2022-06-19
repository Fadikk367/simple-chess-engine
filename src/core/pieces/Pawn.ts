import { Color, PieceType, MoveType } from 'constants/enums';
import Position from 'core/Position';
import MoveConstraints from '../MoveConstraints';
import MovePolicy from '../MovePolicy';
import Piece from './Piece';

class Pawn extends Piece {

  afterFirstMove: boolean;

  constructor(color: Color, position: Position) {
    const movePolicies = [new MovePolicy(MoveType.Vertical, new MoveConstraints({max: 2})),
                          new MovePolicy(MoveType.Diagonal, new MoveConstraints( {max: 1} ))];

    super(color, PieceType.Pawn, movePolicies, position);
    this.afterFirstMove = false;

    if((position.x !== 6 && color === Color.White) || (position.y !== 1 && color === Color.Black)) {
      const newMovePolicies = [new MovePolicy(MoveType.Vertical, new MoveConstraints({max: 1})),
        new MovePolicy(MoveType.Diagonal, new MoveConstraints( {max: 1} ))];
      this.updatePolicies(newMovePolicies)
      this.afterFirstMove = true;
    }
  }
}

export default Pawn;
