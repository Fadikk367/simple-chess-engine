import { Color } from "constants/enums";
import Board from "./Board";
import ChessCords from "./ChessCords";
import Knight from "./pieces/Knight";
import Position from "./Position";

class BoardInitializer {
  static init(board: Board): void {
    this.initKnights(board);
  }

  private static initKnights(board: Board): void {
    const whiteKnightFirstPosition: Position = this.chessCordsToPosition(new ChessCords(1, 'b'));
    const whiteKnightSecondPosition: Position = this.chessCordsToPosition(new ChessCords(1, 'g'));
    const blackKnightFirstPosition: Position = this.chessCordsToPosition(new ChessCords(8, 'b'));
    const blackKnightSecondPosition: Position = this.chessCordsToPosition(new ChessCords(8, 'g'));

    board.placePiece(new Knight(Color.White, whiteKnightFirstPosition), whiteKnightFirstPosition);
    board.placePiece(new Knight(Color.White, whiteKnightSecondPosition), whiteKnightSecondPosition);
    board.placePiece(new Knight(Color.Black, blackKnightFirstPosition), blackKnightFirstPosition);
    board.placePiece(new Knight(Color.Black, blackKnightSecondPosition), blackKnightSecondPosition);
  }

  private static initKings(): void {
    /*const whiteKingPosition: Position = this.chessCordsToPosition(new ChessCords(1, 'e'));
    const blackKingPosition: Position = this.chessCordsToPosition(new ChessCords(8, 'e'));

    this.board[whiteKingPosition.x][whiteKingPosition.y] = */
  }

  private static initQueens(): void {

  }

  private static initPawns(): void {

  }

  private static initRooks(): void {

  }

  private static initBishops(): void {

  }

  private static positionToChessCords(position: Position): ChessCords {
    const hLetter = 'h';
    const hASCIIRepresentation = hLetter.charCodeAt(0);

    const cords: ChessCords = new ChessCords(8 - position.x, String.fromCharCode(hASCIIRepresentation - position.y));

    return cords;
  }

  private static chessCordsToPosition(cords: ChessCords): Position {
    const hLetter = 'h';
    const hASCIIRepresentation = hLetter.charCodeAt(0);

    const position: Position = new Position(8 - cords.rank, hASCIIRepresentation - cords.file.charCodeAt(0));

    return position;
  }
}

export default BoardInitializer;
