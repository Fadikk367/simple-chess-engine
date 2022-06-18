import { GameState } from "constants/enums";
import Board from "./Board";
import Move from "./Move";
import MoveGenerator from "./MoveGenerator";
import King from "./pieces/King";

class GameStateManager {
    board: Board;
    state: GameState;
    moveGenerator: MoveGenerator;

    constructor(board: Board, moveGenerator: MoveGenerator) {
        this.board = board;
        this.state = GameState.Default;
        this.moveGenerator = moveGenerator;
    }

    getBoardState(king: King, enemyMoves: Move[]): GameState {
        this.updateState(king, enemyMoves);
        return this.state;
    }

    private updateState(king: King, enemyMoves: Move[]): void {
        if(this.isChecked(king, enemyMoves)) {
            this.state = GameState.Check;
        }
    }

    private isChecked(king: King, enemyMoves: Move[]): boolean {
        console.log(enemyMoves);

        for(const enemyMove of enemyMoves) {
            console.log(enemyMove.to);
            console.log(king.position);
            if(enemyMove.to.x === king.position.x && enemyMove.to.y === king.position.y && enemyMove.isCapture) {
                return true;
            }
        }

        return false;
    }
}

export default GameStateManager;