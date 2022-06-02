import Piece from './pieces/Piece';
import Position from './Position';

class Move {
  piece: Piece;
  from: Position;
  to: Position;

  constructor( piece: Piece, from: Position,  to: Position) {
    this.piece = piece;
    this.from = from;
    this.to = to;
  }
}

export default Move;
