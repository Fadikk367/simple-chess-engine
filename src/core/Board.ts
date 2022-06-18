import Piece from './pieces/Piece';
import Position from './Position';
import Move from './Move';
import BoardInitializer from './BoardInitializer';
import { pieceToMarker } from 'constants/types';
import { Color, PieceType } from 'constants/enums';
import King from './pieces/King';

class Board {
  SIZE: number;

  private board: (Piece | undefined)[][];

  constructor() {
    this.SIZE = 8;
    this.board = new Array(this.SIZE);
    
    for(let i = 0; i < this.SIZE; ++i) {
      this.board[i] = new Array(this.SIZE);
    }
  }

  get pieces(): Piece[] {
    return this.board.map((row) => {
      return row.filter((piece) => !!piece) as Piece[];
    }).flat();
  }

  placePiece(piece: Piece, position: Position): void {
    this.board[position.x][position.y] = piece;
  }

  isFieldOccupied(position: Position): boolean {
    return !!this.board[position.x][position.y]
  }

  getPieceFromField(position: Position): Piece | undefined {
    return this.board[position.x][position.y];
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
    BoardInitializer.init(this);
  }

  findKing(color: Color): King {
    const pieces = this.pieces;

    for(const piece of pieces) {
        if(piece.color == color && piece.type == PieceType.King) {
            return piece;
        }
    }

    throw new Error("Unexpected situation -> king with given color not found!");
  }

  getPiecesForColor(color: Color): Piece[] {
    const pieces = this.pieces;
    const colorPieces: Piece[] = []

    for(const piece of pieces) {
        if(piece.color === color) {
            colorPieces.push(piece);
        }
    }

    return colorPieces;
  }

  private getPieceMarker(piece: Piece): string {
    return pieceToMarker[piece.color][piece.type];
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