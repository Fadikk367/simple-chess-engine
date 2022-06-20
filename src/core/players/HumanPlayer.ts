import { Color, PlayerType } from "constants/enums";
import Move from "../Move";
import Player from "./Player";

class HumanPlayer extends Player {
  private boardElement;
  private sub?: (e: unknown) => void = undefined;

  constructor(color: Color) {
    super(color, PlayerType.Human);

    this.boardElement = document.querySelector('chess-board')!;
    this.boardElement.addEventListener('drop', this.handleDropPiece);
  }

  onNextMove(cb: (e: any) => void): void {
    this.sub = cb;
  }

  handleDropPiece = (e: any): void => {
    if (!this.sub) return;

    const {source, target} = e.detail;

    this.sub(Move.fromChessCords({from: source, to: target}));

    this.sub = undefined;
  }
}

export default HumanPlayer;
