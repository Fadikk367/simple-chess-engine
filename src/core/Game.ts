import { Color } from "constants/enums";
import Board from "./Board";
import BoardStateSupervisor from "./BoardStateSupervisor";
import MoveGenerator from "./MoveGenerator";

class Game {
  board: Board;
  moveGenerator: MoveGenerator;
  boardStateSupervisor: BoardStateSupervisor;

  constructor() {
    this.board = new Board();
    this.moveGenerator = new MoveGenerator(this.board);
    this.boardStateSupervisor = new BoardStateSupervisor(this.board, this.moveGenerator);
  }

  minimax() {
    this.board.pieces.forEach(piece => {
      if (!piece) {
        return;
      }

      const moves = this.moveGenerator.generate(piece);
      console.log({piece, moves});
    });

    this.boardStateSupervisor.updateBoard(this.board);
    console.log(this.boardStateSupervisor.getBoardState(Color.White));
  }
}

export default Game;