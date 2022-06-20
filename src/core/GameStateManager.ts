import { Color, GameState } from "constants/enums";
import Board from "./Board";
import Move from "./Move";
import MoveGenerator from "./MoveGenerator";
import King from "./pieces/King";
const _ = require('lodash');

class GameStateManager {
    state: GameState;
    moveGenerator: MoveGenerator;

    constructor(moveGenerator: MoveGenerator) {
        this.moveGenerator = moveGenerator;
        this.state = GameState.Default;
    }

    getBoardState(board: Board, king: King): GameState {
        this.updateState(board, king);
        return this.state;
    }

    private updateState(board: Board, king: King): void {
        /* Color of the enemy of the considered king */
        const enemyColor: Color = king.color === Color.White? Color.Black : Color.White;

        const enemyMoves: Move[] = this.moveGenerator.generateForColor(enemyColor);
        const allowedMoves: Move[] = this.moveGenerator.generateForColor(king.color);

        if(this.isChecked(king, enemyMoves)) {
            king.underCheck = true;
            this.state = GameState.Check;

            /* If we have inability to move, then its a checkmate! */
            if(!this.isAbleToMove(board, king, allowedMoves)) {
                this.state = GameState.Checkmate;
            }
        } else if(!this.isAbleToMove(board, king, allowedMoves)) {
            /* Unable to move but without check -> stalemate ! */
            this.state = GameState.Stalemate;
        } else {
            /* King is not checked - normal state */
            king.underCheck = false;
            this.state = GameState.Default;
        }
    }

    private isChecked(king: King, enemyMoves: Move[]): boolean {
        for(const enemyMove of enemyMoves) {
            if(enemyMove.to.x === king.position.x && enemyMove.to.y === king.position.y && enemyMove.isCapture) {
                return true;
            }
        }

        return false;
    }

    private isAbleToMove(board: Board, king: King, allowedMoves: Move[]): boolean {
        /* Color of the enemy of the considered king */
        const enemyColor: Color = king.color === Color.White? Color.Black : Color.White;

        /* Simulate every allowed move to see if exists legal move */
        for(const move of allowedMoves) {
            /* For puprose of move simulating we take deep copy */
            const tempBoard = _.cloneDeep(board);
            /* Simulate move */
            tempBoard.movePiece(move.from, move.to);
            
            /* But since generator takes reference to board, its rational to have temporary generator for simulation */
            const tempGenerator: MoveGenerator = new MoveGenerator(tempBoard);
            /* Take enemy moves after simulated move */
            const enemyMoves: Move[] = tempGenerator.generateForColor(enemyColor);

            /* If there is no longer check after simulated move then this move is helping to espace from a checkmate */
            if(!this.isChecked(tempBoard.findKing(king.color), enemyMoves)) {
                console.log(move);
                return true;
            }
        }

        /* If no legal move was found then we will have checkmate / stalemate */
        return false;
    }
}

export default GameStateManager;