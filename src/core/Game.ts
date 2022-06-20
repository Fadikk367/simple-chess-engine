import { Color, GameState, PlayerType } from "constants/enums";
import Board from "./Board";
import GameStateManager from "./GameStateManager";
import Move from "./Move";
import MoveGenerator from "./MoveGenerator";
import King from "./pieces/King";
import Piece from "./pieces/Piece";
import Player from "./players/Player";

const _ = require('lodash');
class Game {
  board: Board;
  moveGenerator: MoveGenerator;
  gameStateManager: GameStateManager;
  playerA: Player;
  playerB: Player;
  activePlayer: Player;
  depth: number;

  constructor({players}: {players: [Player, Player]}) {
    this.board = new Board();
    this.moveGenerator = new MoveGenerator(this.board);
    this.gameStateManager = new GameStateManager(this.moveGenerator);

    this.playerA = players[0];
    this.playerB = players[1];

    this.activePlayer = this.playerA.color === Color.White ? this.playerA : this.playerB;
  
    this.depth = 3;
  }

  get state(): GameState {
    return this.gameStateManager.state;
  }

  play(): void {
    //do {

      console.log(this.activePlayer);
      console.log(this.playerA);
      switch(this.activePlayer.type) {
        case PlayerType.Human: {
          console.log('Wait for input from chessboard gui...');
          break;
        }
        case PlayerType.Ai: {
          const bestResult: {move: Move, value: number} = this.minimax(4);
          console.log(bestResult);
          this.board.movePiece(bestResult.move.from, bestResult.move.to);
          break;
        }
      }
      this.toggleActivePlayer();
    //} while (this.state !== GameState.Checkmate && this.state !== GameState.Stalemate);
  }

  minimax(depth: number): {move: Move, value: number} {
      this.depth = 1;
      const moves = this.moveGenerator.generateForColor(this.activePlayer.color);

      if(this.activePlayer.color === Color.White) {
        /* For white player maximise function */
        return this.max({
          counter: 1,
          board: this.board,
          allowedMoves: moves,
          alfa: -Infinity,
          beta: Infinity
        });
      } else {
        /* For black player minimise function */
        return this.min({
          counter: 1,
          board: this.board,
          allowedMoves: moves,
          alfa: -Infinity,
          beta: Infinity
        });
      }

    // Testing -> as for now we need to pass color of king which will be considered to be under check
    // const king: King = this.board.findKing(Color.Black);

    // console.log(this.gameStateManager.getBoardState(this.board, king));
  
    return {
      move: moves[0],
      value: 0
    }
  }

  private max({counter, board, allowedMoves, alfa, beta}: {counter: number, board: Board, allowedMoves: Move[], alfa: number, beta: number}): {move: Move, value: number} {
    console.log(counter);
    let bestValue: number = -1000;
    let bestMove: Move = allowedMoves[0];

    for(const move of allowedMoves) {
      const localBoard: Board = this.simulateMove(board, move);
      const localMoveGenerator: MoveGenerator = new MoveGenerator(localBoard);
      const localStateManager: GameStateManager = new GameStateManager(localMoveGenerator);
      const blackKing: King = localBoard.findKing(Color.Black);
      const state: GameState = localStateManager.getBoardState(localBoard, blackKing);
      const whiteKingAfterMove: King = localBoard.findKing(Color.White);

      /* Please notice that due to poor implementation this function also updates if king is checked */
      localStateManager.getBoardState(localBoard, whiteKingAfterMove);

      if(whiteKingAfterMove.underCheck) {
        /* Such a move is not allowed - do not consider this move! */
        continue;
      }

      /* Resolve recursion if time to do so */
      if(state === GameState.Checkmate) {
        console.log("MATTT");
        return {
          move: move,
          value: 1000
        }
      } else if(counter / 2 >= this.depth) {
        const currentValue: number = this.calcSum(localBoard);
        /* Update only if move leads to node with better evaluation */
        if(currentValue > bestValue) {
          bestValue = currentValue;
          bestMove = move;
        }
        
      } else {
        const localAllowedMovesForEnemy: Move[] = this.generateAllowedMovesForLocalBoard(localBoard, Color.Black);

        const currentResult: {move: Move, value: number} = this.min({
          counter: counter + 1,
          board: localBoard,
          allowedMoves: localAllowedMovesForEnemy,
          alfa,
          beta});

        alfa = Math.max(alfa, currentResult.value);

        if(beta <= alfa) {
          // break;
        }
  
        /* Update only if move leads to node with better evaluation */
        if(currentResult.value > bestValue) {
          bestValue = currentResult.value;
          bestMove = move;
        }
      }
    }

    return {
      move: bestMove,
      value: bestValue
    }
  }

  private min({counter, board, allowedMoves, alfa, beta}: {counter: number, board: Board, allowedMoves: Move[], alfa: number, beta: number}): {move: Move, value: number}  {
        console.log(counter);
        /* By default some random, definitely not minimal value */
        let bestValue: number = 1000;
        /* First move assigned as best (at beginning) */
        let bestMove: Move = allowedMoves[0];
        
        /* Lets iterate through allowed moves */
        for(const move of allowedMoves) {
          /* Simulate move and get modified board for further actions */
          const localBoard: Board = this.simulateMove(board, move);
          /* Lets also have dedicated generators / state managers for new board */
          const localMoveGenerator: MoveGenerator = new MoveGenerator(localBoard);
          const localStateManager: GameStateManager = new GameStateManager(localMoveGenerator);
          /* Find enemy's king to look if there is no checkmate - in that case white is enemy of minimising function */
          const king: King = localBoard.findKing(Color.White);
          const state = localStateManager.getBoardState(localBoard, king);

          board.drawBoard();
          const blackKingAfterMove: King = localBoard.findKing(Color.Black);

          /* Please notice that due to poor implementation this function also updates if king is checked */
          localStateManager.getBoardState(localBoard, blackKingAfterMove);

          if(blackKingAfterMove.underCheck) {
            /* Such a move is not allowed - do not consider this move! */
            
            continue;
          }
    
          /* Resolve recursion if time to do so. */
          if(state === GameState.Checkmate) {
            return {
              move: move,
              value: -1000
            }
          } else if(counter / 2 >= this.depth) {
            /* if we reached max depth, there is still need to check all moves, but without recursive invocations.*/
            const currentValue: number = this.calcSum(localBoard);
            /* Update only if move leads to node with better evaluation */
            if(currentValue < bestValue) {
              bestValue = currentValue;
              bestMove = move;
            }
            
          } else {
            /* This is the case when we have to do recursive invocation */
            /* Thus lets generate allowed moves from modified board for the enemy */
            const localAllowedMovesForEnemy: Move[] = this.generateAllowedMovesForLocalBoard(localBoard, Color.White);
    
            /* Search for best move enemy can play */
            const currentResult: {move: Move, value: number} = this.max({
              counter: counter + 1,
              board: localBoard,
              allowedMoves: localAllowedMovesForEnemy,
              alfa,
              beta});

              beta = Math.min(beta, currentResult.value);

              if(beta <= alfa) {
                // break;
              }
      
            /* And update own best move, but only if it leads to node where enemy cant play something better than before. */
            if(currentResult.value < bestValue) {
              bestValue = currentResult.value;
              bestMove = currentResult.move;
            }
          }
        }
    
        return {
          move: bestMove,
          value: bestValue
        }
  }

  private simulateMove(board: Board, move: Move): Board {
    /* For puprose of move simulating we take deep copy */
    const tempBoard = _.cloneDeep(board);
    /* Simulate move */
    tempBoard.movePiece(move.from, move.to);
  
    return tempBoard;
  }

  private generateAllowedMovesForLocalBoard(board: Board, color: Color): Move[] {
    const localGenerator: MoveGenerator = new MoveGenerator(board);
    const allowedMoves: Move[] = localGenerator.generateForColor(color);

    return allowedMoves;
  }

  private calcSum(board: Board): number {
    const pieces: Piece[] = board.pieces;
    let sum: number = 0;

    for(const piece of pieces) {
      if(piece.color === Color.White) {
        sum += piece.value;
      } else {
        sum -= piece.value;
      }
    }

    return sum;
  }

  private toggleActivePlayer(): void {
    this.activePlayer = this.activePlayer === this.playerA ? this.playerB : this.playerA;
  }
}

export default Game;