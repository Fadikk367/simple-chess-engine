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

export const pieceToValue = {
    [PieceType.Pawn]: PieceValue.Pawn,
    [PieceType.Knight]: PieceValue.Knight,
    [PieceType.Queen]: PieceValue.Queen,
    [PieceType.King]: PieceValue.King,
    [PieceType.Bishop]: PieceValue.Bishop,
    [PieceType.Rook]: PieceValue.Rook
}