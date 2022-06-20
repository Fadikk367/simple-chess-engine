import { Color, PlayerType } from "constants/enums";
import Player from "./Player";

class AiPlayer extends Player {
  constructor(color: Color) {
    super(color, PlayerType.Ai);
  }
}

export default AiPlayer;
