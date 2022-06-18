import { Color } from "constants/enums";
import Piece from "core/pieces/Piece";

export interface GameStateSnapshot {
  pieces: Piece[];
  activeColor: Color;
}
