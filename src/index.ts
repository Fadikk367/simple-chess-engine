

import { Color } from './constants/enums';
import Game from './core/Game';
import AiPlayer from './core/players/AiPlayer';
import HumanPlayer from './core/players/HumanPlayer';

const fen = '1nb1kbnr/pppppppp/8/4q1r1/8/5N2/PPPPPPPP/RNBQKB1R w KQk - 0 1';

const playerB = new HumanPlayer(Color.Black);
const playerA = new AiPlayer(Color.White);

const game = new Game({players: [playerA, playerB]});
game.play();
game.board.drawBoard();

