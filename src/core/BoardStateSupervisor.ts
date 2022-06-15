import { BoardState, Color, PieceType } from "constants/enums";
import Board from "./Board";
import Move from "./Move";
import MoveGenerator from "./MoveGenerator";
import King from "./pieces/King";
import Piece from "./pieces/Piece";

class BoardStateSupervisor {
    board: Board;
    state: BoardState;
    moveGenerator: MoveGenerator;

    constructor(board: Board, moveGenerator: MoveGenerator) {
        this.board = board;
        this.state = BoardState.Default;
        this.moveGenerator = moveGenerator;
    }

    updateBoard(board: Board): void {
        this.board = board;
    }

    getBoardState(consideredKingColor: Color): BoardState {
        this.updateState(consideredKingColor);
        return this.state;
    }

    private updateState(consideredKingColor: Color): void {
        if(this.meetsCheckConditions(consideredKingColor)) {
            console.log("AHOOOOOOJ PANE KRETO!");
            this.state = BoardState.Check;
        }
    }

    private meetsCheckConditions(consideredKingColor: Color): boolean {
        const king: King = this.findKing(consideredKingColor);
        const enemyPieces: Piece[] = this.getEnemyPieces(consideredKingColor);
        const allEnemyMoves: Move[] = this.getEnemyMoves(enemyPieces);

        console.log(allEnemyMoves);

        for(const enemyMove of allEnemyMoves) {
            console.log(enemyMove.to);
            console.log(king.position);
            if(enemyMove.to.x === king.position.x && enemyMove.to.y === king.position.y && enemyMove.isCapture) {
                return true;
            }
        }

        return false;
    }

    private findKing(color: Color): King {
        const pieces = this.board.pieces;

        for(const piece of pieces) {
            if(piece.color == color && piece.type == PieceType.King) {
                return piece;
            }
        }

        throw new Error("Unexpected situation -> king with given color not found!");
    }

    private getEnemyPieces(consideredKingColor: Color): Piece[] {
        const pieces = this.board.pieces;
        const enemyPieces: Piece[] = []

        for(const piece of pieces) {
            if(piece.color != consideredKingColor) {
                enemyPieces.push(piece);
            }
        }

        return enemyPieces;
    }

    private getEnemyMoves(enemyPieces: Piece[]): Move[] {
        let enemyMoves: Move[] = [];

        for(const enemyPiece of enemyPieces) {
            const moves: Move[] = this.moveGenerator.generate(enemyPiece);
            enemyMoves = enemyMoves.concat(moves);
        }

        return enemyMoves
    }
}

export default BoardStateSupervisor;