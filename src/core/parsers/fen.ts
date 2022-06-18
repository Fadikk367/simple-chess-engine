import { markerToPiece, PieceMarker } from 'constants/types';
import Piece from 'core/pieces/Piece';
import PieceFactory from 'core/pieces/PieceFactory';
import Position from 'core/Position';
import { Color } from 'constants/enums';

import { GameStateSnapshot } from './types';

function isPieceMarker(character: string): character is PieceMarker {
  return Boolean(markerToPiece[character as PieceMarker]);
}

function getActiveColorFromFen(fenColorIndicator: string): Color {
  switch(fenColorIndicator) {
    case 'w': return Color.White;
    case 'b': return Color.Black;
    default: return Color.White;
  }
}

export function parseFenString(fen: string): GameStateSnapshot {
  const [board, activeColorMarker] = fen.split(' ');
  const rows = board.split('/');
  const pieces: Piece[] = [];

  if (rows.length !== 8) {
    throw new Error(`Invalid number of rows in FEN string: ${fen}`);
  }

  rows.forEach((row, i) => {
    let offsetInRow = 0;

    [...row].forEach((field) => {
      if (isPieceMarker(field)) {
        const [pieceType, color] = markerToPiece[field];
        pieces.push(PieceFactory.createPiece(pieceType, color, new Position(i, offsetInRow)));
    
        offsetInRow++;
      } else {
        const offset = parseInt(field, 10);
        if (!isNaN(offset)) {
          offsetInRow += offset;
        }
      }
    });

    if (offsetInRow !== 8) {
      throw new Error(`Invalid row ${i} in FEN string: ${row}`);
    }

    console.log({row: i, offsetInRow});
  });

  return {pieces, activeColor: getActiveColorFromFen(activeColorMarker)};
}
