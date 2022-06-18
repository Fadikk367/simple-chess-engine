import { Color, PieceType, PieceValue } from "./enums";

export const pieceToMarker = {
    [Color.White]: {
        [PieceType.Pawn]: 'P',    
        [PieceType.Knight]: 'N',
        [PieceType.Queen]: 'Q',
        [PieceType.King]: 'K',
        [PieceType.Bishop]: 'B',
        [PieceType.Rook]: 'R',
      },
    [Color.Black]: {
        [PieceType.Pawn]: 'p',
        [PieceType.Knight]: 'n',
        [PieceType.Queen]: 'q',
        [PieceType.King]: 'k',
        [PieceType.Bishop]: 'b',
        [PieceType.Rook]: 'r',
    }
} as const;

export const markerToPiece = {
    'P': [PieceType.Pawn, Color.White],
    'N': [PieceType.Knight, Color.White],
    'Q': [PieceType.Queen, Color.White],
    'K': [PieceType.King, Color.White],
    'B': [PieceType.Bishop, Color.White],
    'R': [PieceType.Rook, Color.White],
    'p': [PieceType.Pawn, Color.Black],
    'n': [PieceType.Knight, Color.Black],
    'q': [PieceType.Queen, Color.Black],
    'k': [PieceType.King, Color.Black],
    'b': [PieceType.Bishop, Color.Black],
    'r': [PieceType.Rook, Color.Black],
  } as const;

export type PieceMarker = keyof typeof markerToPiece;

export const pieceToValue = {
    [PieceType.Pawn]: PieceValue.Pawn,
    [PieceType.Knight]: PieceValue.Knight,
    [PieceType.Queen]: PieceValue.Queen,
    [PieceType.King]: PieceValue.King,
    [PieceType.Bishop]: PieceValue.Bishop,
    [PieceType.Rook]: PieceValue.Rook
} as const;
