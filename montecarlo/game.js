// game object, each cell = a room

// r: number of rows
// c: number of columns
// m: number of monsters
// t: number of treasures
// k: number of keys

var Game = function(r, c, m, t, k) {
  // import utility functions
  var utils = Util();

  // default conditions
  var DEFAULT_ROWS = 6;
  var DEFAULT_COLS = 5;
  var DEFAULT_MONS = 16;
  var DEFAULT_TRES = 6;
  var DEFAULT_KEYS = 2;

  // health variables
  var TOTAL_HP = 10;
  var MONS_DMG = 2;
  var TRES_HP = 2;

  // player variables
  var player_loc = [0, 0];
  var player_hp = TOTAL_HP;
  var player_key = false;
  var player_visited = [[0,0]];
  var player_turn = 0;
  var player_win = false;

  // validate inputs
  var rows = (r && typeof r === 'number' && r > 0) ? r : DEFAULT_ROWS;
  var cols = (c && typeof c === 'number' && c > 0) ? c : DEFAULT_COLS;
  var mons = (m && typeof m === 'number' && m > 0) ? m : DEFAULT_MONS;
  var tres = (t && typeof t === 'number' && t > 0) ? t : DEFAULT_TRES;
  var keys = (k && typeof k === 'number' && k > 0) ? k : DEFAULT_KEYS;

  // generate board, with the following preconditions:
  // player starts at 0,0
  // exit is at c-1, r-1

  // 0: empty
  // 1: treasure
  // 2: monster
  // 4: key

  // create empty grid
  var grid = [];
  var zero_col = [];
  utils.from_to(0, rows - 1, function() {
    zero_col.push(0);
  });
  utils.from_to(0, cols - 1, function() {
    grid.push(zero_col.slice());
  });

  // place objects
  var locs = [];
  var col, row;

  // place treasures
  while (locs.length < tres) {
    col = Math.floor(Math.random() * cols);
    row = Math.floor(Math.random() * rows);
    if (grid[col][row] <= 1 && !utils.contains(locs, [col, row]) && !(col === 0 && row === 0) && !(col === cols - 1 && row === rows - 1)) {
      grid[col][row] += 1;
      locs.push([col, row]);
    }
  }

  // place monsters
  locs = [];
  while (locs.length < mons) {
    col = Math.floor(Math.random() * cols);
    row = Math.floor(Math.random() * rows);
    if (grid[col][row] <= 2 && !utils.contains(locs, [col, row]) && !(col === 0 && row === 0) && !(col === cols - 1 && row === rows - 1)) {
      grid[col][row] += 2;
      locs.push([col, row]);
    }
  }

  // place keys
  locs = [];
  while (locs.length < keys) {
    col = Math.floor(Math.random() * cols);
    row = Math.floor(Math.random() * rows);
    if (grid[col][row] <= 4 && !utils.contains(locs, [col, row]) && !(col === 0 && row === 0) && !(col === cols - 1 && row === rows - 1)) {
      grid[col][row] += 4;
      locs.push([col, row]);
    }
  }

  // place player and exit
  grid[0][0] = '*';
  exit_loc = [cols - 1, rows - 1];
  grid[cols - 1][rows - 1] = 'X';

  var self = {
    board: function() {
      return grid;
    },

    neighbors: function(x, y) {
      var neighborhood = [];
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        utils.from_to_2d(Math.max(0, x - 1), Math.min(x + 1, cols - 1), Math.max(0, y - 1), Math.min(y + 1, rows - 1), function(c) {
          if ((c[0] !== x || c[1] !== y) && !(c[0] !== x && c[1] !== y)) neighborhood.push(c); // exclude self and diagonals
        });
      }
      return neighborhood;
    },

    turns: function() {
      return player_turn;
    },

    hp: function() {
      return player_hp;
    },

    win: function() {
      return player_win;
    },

    step: function() {
      // console.log('turns');
      player_turn += 1;
      grid[player_loc[0]][player_loc[1]] = 0;
      neighbors = self.neighbors(player_loc[0], player_loc[1]);
      destination = neighbors[Math.floor(Math.random() * neighbors.length)];
      player_loc = [destination[0], destination[1]];
      grid[exit_loc[0]][exit_loc[1]] = 'X';
      player_visited.push([destination[0], destination[1]]);
      if (grid[destination[0]][destination[1]] === 'X') {
        if (player_key) {
          player_win = true;
          // console.log('player wins!');
          // console.log('hp: ' + player_hp);
          // console.log('---');
          return false;
        }
      }
      else {
        if (grid[destination[0]][destination[1]] >= 4) {
          grid[destination[0]][destination[1]] -= 4;
          player_key = true;
        }
        if (grid[destination[0]][destination[1]] >= 2) {
          grid[destination[0]][destination[1]] -= 2;
          player_hp -= MONS_DMG;
          if (player_hp <= 0) {
            // console.log('player dies!');
            // console.log('hp: ' + player_hp);
            // console.log('---');
            return false;
          }
        }
        if (grid[destination[0]][destination[1]] >= 1) {
          grid[destination[0]][destination[1]] -= 1;
          player_hp += TRES_HP;
        }
        player_hp = Math.min(TOTAL_HP, player_hp);
      }
      if (player_turn > 1000) {
        // console.log('infinite loop!');
        // console.log('hp: ' + player_hp);
        // console.log('key: ' + player_key);
        // console.log('---');
        return false;
      }
      grid[player_loc[0]][player_loc[1]] = '*';
      // console.log('[ TURN ' + player_turn + ' ]');
      // console.log('HP: ' + player_hp);
      // console.log('Key? ' + player_key);
      // console.log(grid);
      return true;
    }
  };

  return self;
};