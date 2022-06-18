import { Color, MoveType, PieceType } from "constants/enums";
import MoveConstraints from "../MoveConstraints";
import MovePolicy from "../MovePolicy";
import Position from "../Position";
import Bishop from "./Bishop";
import King from "./King";
import Knight from "./Knight";
import Pawn from "./Pawn";
import Piece from "./Piece";
import Queen from "./Queen";
import Rook from "./Rook";

class PieceFactory {
  public static createPiece(type: PieceType, color: Color, position: Position): Piece {
    switch(type) {
      case PieceType.Pawn:
        const pawn = new Pawn(color, position);
        if((position.x !== 6 && color === Color.White) || (position.y !== 1 && color === Color.Black)) {
          const movePolicies = [new MovePolicy(MoveType.Vertical, new MoveConstraints({max: 1})),
            new MovePolicy(MoveType.Diagonal, new MoveConstraints( {max: 1} ))];
          pawn.updatePolicies(movePolicies)
          pawn.afterFirstMove = true;
        }
        return pawn
      case PieceType.Knight:
        return new Knight(color, position);
      case PieceType.Queen:
        return new Queen(color, position);
      case PieceType.King:
        return new King(color, position);
      case PieceType.Bishop:
        return new Bishop(color, position);
      case PieceType.Rook:
        return new Rook(color, position);
      default:
        throw new Error(`Invalid piece type: ${type}`)
    }
  }
}

export default PieceFactory;
