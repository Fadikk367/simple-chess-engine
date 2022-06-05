import { MoveType } from "src/constants/enums";
import MoveConstraints from "./MoveConstraints";


class MovePolicy {
  type: MoveType;
  constraints?: MoveConstraints;

  constructor(type: MoveType, constraints?: MoveConstraints) {
    this.type = type;
    this.constraints = constraints
  }
}

export default MovePolicy;
