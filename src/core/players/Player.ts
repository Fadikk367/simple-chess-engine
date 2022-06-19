import { Color, PlayerType } from "constants/enums";

abstract class Player {
  type: PlayerType;
  color: Color;

  constructor(color: Color, type: PlayerType) {
    this.type = type;
    this.color = color;
  }
}

export default Player;
