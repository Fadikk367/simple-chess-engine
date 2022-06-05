import Position from './Position';

class Move {
  from: Position;
  to: Position;

  constructor(from: Position,  to: Position) {
    this.from = from;
    this.to = to;
  }
}

export default Move;
