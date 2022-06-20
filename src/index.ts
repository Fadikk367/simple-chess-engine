import { Color } from './constants/enums';
import Game from './core/Game';
import AiPlayer from './core/players/AiPlayer';
import HumanPlayer from './core/players/HumanPlayer';

const fen = '8/q7/8/8/3k4/8/4Q3/2K5 w - - 0 1';

const playerB = new HumanPlayer(Color.Black);
const playerA = new AiPlayer(Color.White);

const game = new Game({players: [playerA, playerB]});
game.board.initBoard(fen);
game.board.drawBoard();

console.log("Hello there");

// game.minimax();
game.play();