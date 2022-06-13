import { Color, PieceType } from "./enums";

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