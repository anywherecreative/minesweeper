
var NUM_MINES = 20;
var BOARD_SIZE =  9*9;
var BOARD_WIDTH = 9;
var board = [];
var mineChance = Math.floor(NUM_MINES/BOARD_SIZE*100);
var checkSpace = [];
var totalMines = 0;

$(document).ready(function() {
    for(var a = 0;a < BOARD_SIZE;a++) {
        var row = Math.ceil(a/BOARD_WIDTH)-1;
        var col =  (a%BOARD_WIDTH);
        if(col == 0) {
            row++;
        }
        if(board[row] == null) {
            board[row] = [];
        }
        // var extra =
        if(getRand(0,100) < mineChance && totalMines < NUM_MINES) {
            board[row][col] = "M";
            totalMines++;
            //add markers

            //add markers above

            //check if we are on the top row
            if(row > 0) {
                //check if we are on the first column
                if(col > 0) {
                    //add 1 to the top left
                    if(board[row-1][col-1] != "M") {
                        if(board[row-1][col-1] = null) {
                            board[row-1][col-1]++;
                        }
                        else {
                            board[row-1][col-1] = 1;
                        }
                    }
                    //add 1 to the top center
                    if(board[row-1][col] != "M") {
                        if(board[row-1][col] != null) {
                            board[row - 1][col]++
                        }
                        else {
                            board[row - 1][col] = 1;
                        }
                    }
                }
                //check if we are on the last column
                if(col < (BOARD_WIDTH -1)) {
                    //add 1 to the top right
                    if(board[row-1][col+1] != "M") {
                        if(board[row-1][col+1] != null) {
                            board[row-1][col+1]++
                        }
                        else {
                            board[row-1][col+1] = 1;
                        }
                    }
                }
            }

            //add markers to current row

            //check if we are on the first column
            if(col > 0) {
                //add marker to left of current square
                if (board[row][col - 1] != "M") {
                    if(board[row][col - 1] != null) {
                        board[row][col - 1]++;
                    }
                    else {
                        board[row][col - 1] = 1;
                    }
                }
            }

            //check if we are on the last column
            if(col < (BOARD_WIDTH -1)) {
                //add 1 to the top right
                if(board[row][col+1] != "M") {
                    if(board[row][col+1] != null) {
                        board[row][col+1]++;
                    }
                    else {
                        board[row][col+1] = 1;
                    }
                }
            }

            //add markers to the the row below

            if(row < Math.ceil(BOARD_SIZE/BOARD_WIDTH)) {
                if(board[row+1] == null) {
                    board[row+1] = [];
                }
                //check if we are on the first column
                if(col > 0) {
                    //add 1 to the bottom left
                    if(board[row+1][col-1] != "M") {
                        if(board[row+1][col-1] != null) {
                            board[row+1][col-1]++;
                        }
                        else {
                            board[row+1][col-1] = 1;
                        }
                    }
                    //add 1 to the bottom center
                    if(board[row+1][col] != "M") {
                        if(board[row+1][col] != null) {
                            board[row+1][col]++;
                        }
                        else {
                            board[row+1][col] = 1;
                        }
                    }
                }
                //check if we are on the last column
                if(col < (BOARD_WIDTH -1)) {
                    //add 1 to the bottom right
                    if(board[row+1][col+1] != "M") {
                        if(board[row+1][col+1] != null) {
                            board[row+1][col+1]++;
                        }
                        else {
                            board[row+1][col+1] = 1;
                        }
                    }
                }
            }
        }
        else {
            if(board[row][col] == null) {
                board[row][col] = 0;
            }
        }
    }

    for(var a = 0;a < BOARD_SIZE;a++) {
        var row = Math.ceil(a / BOARD_WIDTH) - 1;
        var col = (a % BOARD_WIDTH);
        if (col == 0) {
            row++;
        }
        $('#board').append('<button data-row="' + row + '" data-col="' + col +'">' + row + "/" + col + "<br />" + board[row][col] + '</button>');
    }

    $('#board BUTTON').click(function() {
        var square = board[$(this).data('row')][$(this).data('col')];
        if(square == "M") {
            alert('you lose!');
        }
        if(square > 0) {
            $(this).text(square);
            $(this).attr('disabled','disabled');
            $(this).addClass('marker-'+square)
        }

        if(square == 0) {
            checkSpace = [];
            checkSpace.push([$(this).data('row'),$(this).data('col')]);
            console.log(checkSpace);
            for(var a = 0; a <= checkSpace.length;a++) {
                if($('[data-row=' + checkSpace[a][0] + '][data-col=' + checkSpace[a][1] + ']').attr('disabled') != 'disabled') {
                    $('[data-row=' + checkSpace[a][0] + '][data-col=' + checkSpace[a][1] + ']').attr('disabled','disabled');
                    //check top
                    if(checkSpace[a][0] > 0) {
                        if(board[checkSpace[a][0]-1][checkSpace[a][1]] == 0) {
                            checkSpace.push([checkSpace[a][0]-1,checkSpace[a][1]]);
                        }
                    }
                    //check bottom
                    if(checkSpace[a][0] < Math.ceil(BOARD_SIZE/BOARD_WIDTH)) {
                        if(board[checkSpace[a][0]+1][checkSpace[a][1]] == 0) {
                            checkSpace.push([checkSpace[a][0]+1,checkSpace[a][1]]);
                        }
                    }
                    //check left
                    if(checkSpace[a][1] > 0) {
                        if(board[checkSpace[a][0]][checkSpace[a][1]-1] == 0) {
                            checkSpace.push([checkSpace[a][0],checkSpace[a][1]-1]);
                        }
                    }
                    //check right
                    if(checkSpace[a][1] < (BOARD_WIDTH-1)) {
                        if(board[checkSpace[a][0]][checkSpace[a][1]+1] == 0) {
                            checkSpace.push([checkSpace[a][0],checkSpace[a][1]+1]);
                        }
                    }
                }
            }
        }

    })

});



function getRand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}