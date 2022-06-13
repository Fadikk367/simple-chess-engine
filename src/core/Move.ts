import Position from './Position';

class Move {
  from: Position;
  to: Position;
  isCapture: boolean;

  constructor(from: Position,  to: Position) {
    this.from = from;
    this.to = to;
    this.isCapture = false;
  }
}

export default Move;
