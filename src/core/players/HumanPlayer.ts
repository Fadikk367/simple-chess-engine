import { Color, PlayerType } from "constants/enums";
import Move from "core/Move";
import Position from "core/Position";
import Player from "./Player";

class HumanPlayer extends Player {
  constructor(color: Color) {
    super(color, PlayerType.Human);
  }

  nextMove(): Move {
    return new Move(new Position(0, 1), new Position(1, 1)) 
  }
}

export default HumanPlayer;
