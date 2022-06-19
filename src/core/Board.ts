import Piece from './pieces/Piece';
import Position from './Position';
import Move from './Move';
import BoardInitializer from './BoardInitializer';
import { pieceToMarker } from 'constants/types';
import { Color, MoveType, PieceType } from 'constants/enums';
import King from './pieces/King';
import MovePolicy from './MovePolicy';
import MoveConstraints from './MoveConstraints';

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

    /* limit move policies to one step forward */
    if(piece.type === PieceType.Pawn) {
      const movePolicies = [new MovePolicy(MoveType.Vertical, new MoveConstraints({max: 1})),
        new MovePolicy(MoveType.Diagonal, new MoveConstraints( {max: 1} ))]
      piece.updatePolicies(movePolicies);
    }
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

  initBoard(fen?: string): void {
    if (fen) {
      try {
        BoardInitializer.fromFen(this, fen);
      } catch (err) {
        console.error((err as Error).message);
        console.log('Using default board initialization...');
        BoardInitializer.init(this);
      }
    } else {
      BoardInitializer.init(this);
    }
  }

  findKing(color: Color): King {
    const king = this.pieces.find(piece => piece.type === PieceType.King && piece.color === color)

    if (!king) {
      throw new Error("Unexpected situation -> king with given color not found!");
    }

    return king;
  }

  getPiecesForColor(color: Color): Piece[] {
    return this.pieces.filter(piece => piece.color === color);
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