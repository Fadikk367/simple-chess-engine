import { Color, PlayerType } from "constants/enums";
import Player from "./Player";

class AiPlayer extends Player {
  constructor(color: Color) {
    super(color, PlayerType.Human);
  }
}

export default AiPlayer;
