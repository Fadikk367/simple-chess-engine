import Board from "./Board";
import MoveGenerator from "./MoveGenerator";
import MoveValidator from "./MoveValidator";

class Game {
  board: Board;
  moveGenerator: MoveGenerator;

  constructor() {
    this.board = new Board();
    this.moveGenerator = new MoveGenerator(this.board);
  }

  minimax() {
    this.board.pieces.forEach(piece => {
      if (!piece) {
        return;
      }

      const moves = this.moveGenerator.generate(piece);
      console.log({piece, moves});
    });
  }
}

export default Game;