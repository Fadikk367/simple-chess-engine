import { Color } from './constants/enums';
import Game from './core/Game';
import AiPlayer from './core/players/AiPlayer';
import HumanPlayer from './core/players/HumanPlayer';

const fen = 'r1b1k1nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1';
const fen2 = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

const playerA = new HumanPlayer(Color.White);
const playerB = new AiPlayer(Color.Black);

const game = new Game({players: [playerA, playerB]});
game.board.initBoard(fen);
game.board.drawBoard();

console.log("Hello there");

game.minimax();
