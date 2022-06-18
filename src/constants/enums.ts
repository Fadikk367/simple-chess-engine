export enum PieceType {
  Knight = 'KNIGHT',
  Rook = 'ROOK',
  Queen = 'QUEEN',
  King = 'KING',
  Bishop = 'BISHOP',
  Pawn = 'Pawn'
}

export enum Color {
  White = 'WHITE',
  Black = 'BLACK',
}

export enum MoveType {
  Horizontal = 'HORIZONTAL',
  Vertical = 'VERTICAL',
  Diagonal = 'DIAGONAL',
  LMove = 'L_MOVE',
}

export enum PieceValue {
  Pawn = 1,
  Bishop = 3,
  Knight = 3,
  King = 4,
  Rook = 5,
  Queen = 9
}

export enum GameState {
  Check = 'CHECK',
  Checkmate = 'CHECKMATE',
  Stalemate = 'STALEMATE',
  Default = 'DEFAULT'
}
