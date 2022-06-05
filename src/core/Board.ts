import Piece from './pieces/Piece';
import Position from './Position';
import Move from './Move';
import Knight from './pieces/Knight';
import ChessCords from './ChessCords';
import { MoveType, Color } from 'constants/enums';

class Board {
  private SIZE: number;
  private board: (Piece | undefined)[][];

  constructor() {
    this.SIZE = 8;
    this.board = new Array(this.SIZE);
    
    for(let i = 0; i < this.SIZE; ++i) {
      this.board[i] = new Array(this.SIZE);
    }
    
    /* this.board.forEach((_, i) => {
      this.board[i] = new Array(this.SIZE);
    }); */

    console.log(this.board);
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

  movePiece(from: Position, to: Position): void {
    const piece = this.getPieceFromField(from);
    
    if(!piece) return;

    this.board[to.x][to.y] = piece;
    this.board[from.x][from.y] = undefined; 
  }

  drawBoard(): void {
    for(let row = 0; row < this.SIZE; ++row) {
      let rowString: string = (this.SIZE - row) + "|";

      for(let col = 0; col < this.SIZE; ++col) {
        const position: Position = new Position(row, col);

        const piece = this.getPieceFromField(position);

        if(piece) {
          const pieceMarker = this.getPieceMarker(piece);
          rowString += pieceMarker;
        } else {
          rowString += ".";
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

    const moves = this.board[whiteKnightFirstPosition.x][whiteKnightFirstPosition.y]?.getMoves(whiteKnightFirstPosition);

    console.log(whiteKnightFirstPosition);
    console.log({moves});
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

  private generateMoves(piece: Piece, position: Position, type: MoveType): Move[] {
    switch(type) {
      case MoveType.Horizontal:
        return MoveGenerator.generateHorizontalMoves(piece, position);
      case MoveType.Vertical:
        return MoveGenerator.generateVerticalMoves(piece, position);
      case MoveType.Diagonal:
        return MoveGenerator.generateDiagonalMoves(piece, position);
      case MoveType.LMove:
        return MoveGenerator.generateLMoves(piece, position);
      
    }
  }
}

export default Board;

class MoveGenerator {
  static generateHorizontalMoves(piece: Piece, poisition: Position): Move[] {

  }

  static generateVerticalMoves(piece: Piece, poisition: Position): Move[] {
    
  }

  static generateDiagonalMoves(piece: Piece, poisition: Position): Move[] {
    
  }

  static generateLMoves(piece: Piece, poisition: Position): Move[] {
    
  }
}

class MoveValidator {
  board: Board;
  isWithinBoard(position: Position): boolean {

  }

  isCapture
}
