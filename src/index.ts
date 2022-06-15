import Game from './core/Game';

const fen = 'r1b1k1nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1';
const fen2 = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

const game = new Game();
game.board.initBoard(fen);
game.board.drawBoard();

console.log("Hello there");

game.minimax();
