import { Color } from './constants/enums';
import Game from './core/Game';
import AiPlayer from './core/players/AiPlayer';
import HumanPlayer from './core/players/HumanPlayer';

const fen = '7k/5Q2/6K1/8/3N4/8/8/5N2 b - - 0 1';

const playerA = new HumanPlayer(Color.White);
const playerB = new AiPlayer(Color.Black);

const game = new Game({players: [playerA, playerB]});
game.board.initBoard(fen);
game.board.drawBoard();

console.log("Hello there");

game.minimax();
