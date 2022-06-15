import { markerToPiece, PieceMarker } from 'constants/types';
import Piece from '../pieces/Piece';
import PieceFactory from '../pieces/PieceFactory';
import Position from '../Position';

export function isPieceMarker(character: string): character is PieceMarker {
  return Boolean(markerToPiece[character as PieceMarker]);
}

export function parseFen(fen: string): Piece[] {
  const rows = fen.split('/');
  const pieces: Piece[] = [];

  rows.forEach((row, i) => {
    let offsetInRow = 0;

    [...row].forEach((field, j) => {
      const offset = parseInt(field, 10);
  
      if (!isNaN(offset)) {
        offsetInRow += offset;
      } else if (isPieceMarker(field)) {
        const [pieceType, color] = markerToPiece[field];
        pieces.push(PieceFactory.createPiece(pieceType, color, new Position(i, offsetInRow)));
    
        offsetInRow++;
      }
    });

    console.log({row: i, offsetInRow});
  });

  return pieces;
}
