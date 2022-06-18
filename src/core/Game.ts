import { Color } from "constants/enums";
import Board from "./Board";
import GameStateManager from "./GameStateManager";
import Move from "./Move";
import MoveGenerator from "./MoveGenerator";
import King from "./pieces/King";

class Game {
  board: Board;
  moveGenerator: MoveGenerator;
  gameStateManager: GameStateManager;

  constructor() {
    this.board = new Board();
    this.moveGenerator = new MoveGenerator(this.board);
    this.gameStateManager = new GameStateManager(this.board, this.moveGenerator);
  }

  minimax() {
    this.board.pieces.forEach(piece => {
      if (!piece) {
        return;
      }

      const moves = this.moveGenerator.generate(piece);
      console.log({piece, moves});
    });

    // Testing -> as for now we need to pass color of king which will be considered to be under check
    const king: King = this.board.findKing(Color.White);
    const enemyMoves: Move[] = this.moveGenerator.generateForColor(Color.Black);
    console.log(this.gameStateManager.getBoardState(king, enemyMoves));
  }
}

export default Game;