import { Color, PlayerType } from "constants/enums";
import Move from "core/Move";

abstract class Player {
  type: PlayerType;
  color: Color;

  constructor(color: Color, type: PlayerType) {
    this.type = type;
    this.color = color;
  }

  abstract nextMove(): Move;
}

export default Player;
