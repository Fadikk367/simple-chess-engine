import { Color, GameState, PlayerType } from "constants/enums";
import Board from "./Board";
import GameStateManager from "./GameStateManager";
import Move from "./Move";
import MoveGenerator from "./MoveGenerator";
import King from "./pieces/King";
import Player from "./players/Player";

class Game {
  board: Board;
  moveGenerator: MoveGenerator;
  gameStateManager: GameStateManager;
  playerA: Player;
  playerB: Player;
  activePlayer: Player;

  constructor({players}: {players: [Player, Player]}) {
    this.board = new Board();
    this.moveGenerator = new MoveGenerator(this.board);
    this.gameStateManager = new GameStateManager(this.moveGenerator);

    this.playerA = players[0];
    this.playerB = players[1];

    this.activePlayer = this.playerA.color === Color.White ? this.playerA : this.playerB;
  }

  get state(): GameState {
    return this.gameStateManager.state;
  }

  play(): void {
    do {
      switch(this.activePlayer.type) {
        case PlayerType.Human: {
          console.log('Wait for input from chessboard gui...');
          break;
        }
        case PlayerType.Ai: {
          this.max();
          break;
        }
      }
      this.toggleActivePlayer();
    } while (this.state !== GameState.Checkmate && this.state !== GameState.Stalemate);
  }

  max() {

  }

  min() {

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
    const king: King = this.board.findKing(Color.Black);
    
    console.log(this.gameStateManager.getBoardState(this.board, king));
  }

  private toggleActivePlayer(): void {
    this.activePlayer = this.activePlayer === this.playerA ? this.playerB : this.playerA;
  }
}

export default Game;