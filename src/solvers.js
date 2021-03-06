/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var board = new Board({n: n});
  var rookCounts = 0;
  
  // console.log(board.togglePiece(1,1));
  // console.log()
  // var rows = board.rows();
  for(let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      board.togglePiece(i, j);
      rookCounts++;
      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
        board.togglePiece(i, j);
        rookCounts--;
      }
    }
  }
  // console.log(board.rows())
  
  if(rookCounts === n) {
    solution = board.rows();
  }
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  
  var recursion = function(row, board) {
    if (row === n) {
      solutionCount++;
      return;
    }
    
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      
      if (!(board.hasRowConflictAt(row) || board.hasColConflictAt(i))) {
        recursion(row + 1, board);
      }
      
      board.togglePiece(row, i);  
    }
  }
  
  recursion(0, board);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme
  var board = new Board({n: n});
  
  if (n === 2) {
    return solution = new Board({n: 2}).rows(); 
  }
  
  if (n === 3) {
    return solution = new Board({n: 3}).rows(); 
  }
  
  // debugger;
  var recursion = function(row, board) {
    if (row === n) {
      if (solution.length === 0) {
        for(let j = 0; j < n; j ++) {
          solution.push(board.rows()[j].slice()); 
        }
      }
      return;
    }
    
    
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      
      if (!board.hasAnyQueenConflictsOn(row, i)) {
        recursion(row + 1, board);
      }
      
      board.togglePiece(row, i);  
    }
  }
  
  recursion(0, board);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  
  var recursion = function(row, board) {
    if (row === n) {
      solutionCount++;
      return;
    }
    
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      
      if (!board.hasAnyQueenConflictsOn(row, i)) {
        recursion(row + 1, board);
      }
      
      board.togglePiece(row, i);  
    }
  }
  
  recursion(0, board);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
