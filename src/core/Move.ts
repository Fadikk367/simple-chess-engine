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

  toChessCords(): string {
    const from = `${Move.indexToCharCode(this.from.y)}${7 - this.from.x + 1}`;
    const to = `${Move.indexToCharCode(this.to.y)}${7 - this.to.x + 1}`;
  
    return `${from}-${to}`;
  }

  static fromChessCords({from, to}: {from: string; to: string}): Move {
    const [fromY, fromX] = from.split('');
    const [toY, toX] = to.split('');

    const fromPos = new Position(7 - parseInt(fromX) + 1, Move.indexFromCharCode(fromY));
    const toPos = new Position(7 - parseInt(toX) + 1, Move.indexFromCharCode(toY));
    return new Move(fromPos, toPos);
  }

  private static indexFromCharCode(c: string): number {
    return c.charCodeAt(0) - 97;
  }

  private static indexToCharCode(i: number): string {
    return String.fromCharCode(i + 97);
  }
}

export default Move;
