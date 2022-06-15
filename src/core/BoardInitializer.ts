import { Color } from "constants/enums";
import Board from "./Board";
import ChessCords from "./ChessCords";
import King from "./pieces/King";
import Bishop from "./pieces/Bishop";
import Knight from "./pieces/Knight";
import Pawn from "./pieces/Pawn";
import Queen from "./pieces/Queen";
import Rook from "./pieces/Rook";
import Position from "./Position";
import { parseFen } from "./parsers/fen";

class BoardInitializer {
  static init(board: Board): void {
    this.initPawns(board);
    this.initKnights(board);
    this.initKings(board);
    this.initQueens(board);
    this.initBishops(board);
    this.initRooks(board);
  }

  static fromFen(fen: string, board: Board): void {
    const pieces = parseFen(fen);

    pieces.forEach((piece) => {
      board.placePiece(piece, piece.position);
    })
  }

  private static initKnights(board: Board): void {
    const whiteKnightFirstPosition = this.chessCordsToPosition(new ChessCords(1, 'b'));
    const whiteKnightSecondPosition = this.chessCordsToPosition(new ChessCords(1, 'g'));
    const blackKnightFirstPosition = this.chessCordsToPosition(new ChessCords(8, 'b'));
    const blackKnightSecondPosition = this.chessCordsToPosition(new ChessCords(8, 'g'));

    board.placePiece(new Knight(Color.White, whiteKnightFirstPosition), whiteKnightFirstPosition);
    board.placePiece(new Knight(Color.White, whiteKnightSecondPosition), whiteKnightSecondPosition);
    board.placePiece(new Knight(Color.Black, blackKnightFirstPosition), blackKnightFirstPosition);
    board.placePiece(new Knight(Color.Black, blackKnightSecondPosition), blackKnightSecondPosition);
  }

  private static initKings(board: Board): void {
    const whiteKingPosition = this.chessCordsToPosition(new ChessCords(1, 'e'));
    const blackKingPosition = this.chessCordsToPosition(new ChessCords(8, 'e'));

    board.placePiece(new King(Color.White, whiteKingPosition), whiteKingPosition);
    board.placePiece(new King(Color.Black, blackKingPosition), blackKingPosition);
  }

  private static initQueens(board: Board): void {
    const whiteQueenPosition: Position = this.chessCordsToPosition(new ChessCords(1, 'd'));
    const blackQueenPosition: Position = this.chessCordsToPosition(new ChessCords(8, 'd'));

    board.placePiece(new Queen(Color.White, whiteQueenPosition), whiteQueenPosition);
    board.placePiece(new Queen(Color.Black, blackQueenPosition), blackQueenPosition);
  }

  private static initPawns(board: Board): void {
    const fileLetters = 'abcdefgh';

    for(let file of fileLetters)
    {
      const whitePawnPosition: Position = this.chessCordsToPosition(new ChessCords(2, file));
      const blackPawnPosition: Position = this.chessCordsToPosition(new ChessCords(7, file));

      board.placePiece(new Pawn(Color.White, whitePawnPosition), whitePawnPosition);
      board.placePiece(new Pawn(Color.Black, blackPawnPosition), blackPawnPosition);
    }
  }

  private static initRooks(board: Board): void {
    const whiteRookFirstPosition: Position = this.chessCordsToPosition(new ChessCords(1, 'a'));
    const whiteRookSecondPosition: Position = this.chessCordsToPosition(new ChessCords(1, 'h'));
    const blackRookFirstPosition: Position = this.chessCordsToPosition(new ChessCords(8, 'a'));
    const blackRookSecondPosition: Position = this.chessCordsToPosition(new ChessCords(8, 'h'));

    board.placePiece(new Rook(Color.White, whiteRookFirstPosition), whiteRookFirstPosition);
    board.placePiece(new Rook(Color.White, whiteRookSecondPosition), whiteRookSecondPosition);
    board.placePiece(new Rook(Color.Black, blackRookFirstPosition), blackRookFirstPosition);
    board.placePiece(new Rook(Color.Black, blackRookSecondPosition), blackRookSecondPosition);
  }

  private static initBishops(board: Board): void {
    const whiteBishopFirstPosition: Position = this.chessCordsToPosition(new ChessCords(1, 'c'));
    const whiteBishopSecondPosition: Position = this.chessCordsToPosition(new ChessCords(1, 'f'));
    const blackBishopFirstPosition: Position = this.chessCordsToPosition(new ChessCords(8, 'c'));
    const blackBishopSecondPosition: Position = this.chessCordsToPosition(new ChessCords(8, 'f'));

    board.placePiece(new Bishop(Color.White, whiteBishopFirstPosition), whiteBishopFirstPosition);
    board.placePiece(new Bishop(Color.White, whiteBishopSecondPosition), whiteBishopSecondPosition);
    board.placePiece(new Bishop(Color.Black, blackBishopFirstPosition), blackBishopFirstPosition);
    board.placePiece(new Bishop(Color.Black, blackBishopSecondPosition), blackBishopSecondPosition);
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

    const position: Position = new Position(8 - cords.rank, 7 - (hASCIIRepresentation - cords.file.charCodeAt(0)));

    return position;
  }
}

export default BoardInitializer;
