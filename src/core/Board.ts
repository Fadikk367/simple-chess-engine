import Piece from './pieces/Piece';
import Position from './Position';
import Move from './Move';
import { Color } from '../constants/enums';
import Knight from './pieces/Knight';
import ChessCords from './ChessCords';

class Board {
  private board: (Piece | undefined)[][];
  private SIZE: number;

  constructor() {
    this.board = [[]];
    this.SIZE = 8;
  }

  isFieldOccupied(position: Position): boolean {
    return !!this.board[position.x][position.y]
  }

  getPieceFromField(position: Position): Piece | undefined {
    return this.board[position.x][position.y];
  }

  minimax() {
    this.board.forEach((row, i) => {
      row.forEach((piece, j) => {
        if (!piece) {
          return;
        }

        const currentPosition = new Position(i, j);
        const moves = piece.getMoves(currentPosition);
        const validMoves = moves.filter(this.isValidMove);

        // rekurencyjne wywołania dla poprawnych ruchów
      })
    })
  }

  drawBoard(): void {
    for(let row = 0; row < this.SIZE; ++row) {
      let rowString: string = "|";

      for(let col = 0; col < this.SIZE; ++col) {
        const position: Position = new Position(row, col);

        if(this.isFieldOccupied(position)) {
          const piece: Piece | undefined = this.getPieceFromField(position);
          const pieceMarker = this.getPieceMarker(piece);

          rowString += pieceMarker;
        }
        else {
          rowString += " ";
        }
      }

      rowString += "|";
      console.log(rowString);
    }
  }

  initBoard(): void {
    this.initKnights();
  }

  private initKnights(): void {
    const whiteKnightFirstPosition: Position = this.chessCordsToPosition(new ChessCords(1, 'b'));
    const whiteKnightSecondPosition: Position = this.chessCordsToPosition(new ChessCords(1, 'g'));
    const blackKnightFirstPosition: Position = this.chessCordsToPosition(new ChessCords(8, 'b'));
    const blackKnightSecondPosition: Position = this.chessCordsToPosition(new ChessCords(8, 'g'));

    this.board[whiteKnightFirstPosition.x][whiteKnightFirstPosition.y] = new Knight(Color.White);
    this.board[whiteKnightSecondPosition.x][whiteKnightSecondPosition.y] = new Knight(Color.White);
    this.board[blackKnightFirstPosition.x][blackKnightFirstPosition.y] = new Knight(Color.Black);
    this.board[blackKnightSecondPosition.x][blackKnightSecondPosition.y] = new Knight(Color.Black); 
  }

  private initKings(): void {
    /*const whiteKingPosition: Position = this.chessCordsToPosition(new ChessCords(1, 'e'));
    const blackKingPosition: Position = this.chessCordsToPosition(new ChessCords(8, 'e'));

    this.board[whiteKingPosition.x][whiteKingPosition.y] = */
  }

  private initQueens(): void {

  }

  private initPawns(): void {

  }

  private initRooks(): void {

  }

  private initBishops(): void {

  }

  private positionToChessCords(position: Position): ChessCords {
    const hLetter = 'h';
    const hASCIIRepresentation = hLetter.charCodeAt(0);

    const cords: ChessCords = new ChessCords(this.SIZE - position.x, String.fromCharCode(hASCIIRepresentation - position.y));

    return cords;
  }

  private chessCordsToPosition(cords: ChessCords): Position {
    const hLetter = 'h';
    const hASCIIRepresentation = hLetter.charCodeAt(0);

    const position: Position = new Position(this.SIZE - cords.rank, hASCIIRepresentation - cords.file.charCodeAt(0));

    return position;
  }

  private getPieceMarker(piece: Piece): string {
    let marker: string = piece.type.toString().charAt(0);

    if(piece.color != Color.White) {
      marker = marker.toLowerCase();
    }

    return marker;
  }

  private isValidMove(move: Move): boolean {
    // 1 czy nie wychodzi poza plansze

    // 2 czy nie jest zajeta przez ten sam kolor

    // 3 czy nie jest zwiazany

    // 4 jesli krolem w szachu to czy z niego wychodzi

    return true;
  }
}

export default Board;
