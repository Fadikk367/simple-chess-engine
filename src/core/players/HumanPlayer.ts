import { Color, PlayerType } from "constants/enums";
import Player from "./Player";

class HumanPlayer extends Player {
  constructor(color: Color) {
    super(color, PlayerType.Human);
  }
}

export default HumanPlayer;
