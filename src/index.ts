import Game from './core/Game';

const game = new Game();
game.board.initBoard();
game.board.drawBoard();

console.log("Hello there");

game.minimax();
