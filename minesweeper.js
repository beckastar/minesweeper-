$(document).ready(function () {
    'use strict';

    var n = 8;
    //create grid
    (function () {
        var id_index=[];
        for (var i=0; i < n; i++){
            for (var j=0; j < n; j++){
                id_index.push([i,j]);
            }
        }
        for (i=0; i < n; i++){
            // var y_id = (parseInt(i))
            // y_array.push(y_id)
            $(".grid").append("<tr class='gridrow' id='row"+(i+1)+"'></tr>");
        }
        //use jquery .each or js forEach

        for (i=0;i < n;i++){
            //var x_id = "x:"+(parseInt(i))
            //link id to variable
            var square_coords = id_index.shift();
            $(".gridrow").append("<td class='unclicked' id='column"+(i+1)+"'></td>");
        }
    })();

    var gen_rows = function(x){
        var row = [];
        for (var i=0; i<x; i++){
            var o = {};
            o.is_visible = "false";
            o.category = "empty";
            o.number = 0;
            o.x_coord=i;
            o.y_coord=0;

            row.push(o);
        }
        return row;
    };

    var init_board = function(x){
        var container = [];
        //var row = gen_rows();
        for (var i=0; i < x; i++){
            var row = gen_rows(n);
            container.push(row);
        }
        return container;
    };

    var seed_bomb= function(){
        var seed_bomb_index = Math.floor(Math.random() * 7);
        return seed_bomb_index;
    };

    var gen_bomb_coordinates=function(){
        var x = seed_bomb();
        var y = seed_bomb();
        return [x,y];
    };

    var get_bomb_coordinates = function(){
        var bomb_coordinates = [];
        var num_bombs = 3;
        var new_bomb;
        while (bomb_coordinates.length <= num_bombs){
            new_bomb = gen_bomb_coordinates();
            if (jQuery.inArray(new_bomb, bomb_coordinates) === -1){
                bomb_coordinates.push(new_bomb);
            }
        }
        return bomb_coordinates;
    };

    var gen_board_array = function(){
        var board = init_board(n);
        var bomb_coordinates = get_bomb_coordinates();
        var l = bomb_coordinates.length;
        var current;
        var x;
        var y;
        for (var i=0; i<l; i++){
            current = bomb_coordinates.pop();
            x = current[0];
            y = current[1];
            board[x][y].category = "bomb";
            if(x > 0 && y<(n-1) && board[x-1][y+1].category !== "bomb"){
                board[x-1][y+1].number++;
                board[x-1][y+1].category ="number";
            }
            if (x>0 && y>0 && board[x-1][y-1].category !=="bomb"){
                board[x-1][y-1].number++;
                board[x-1][y-1].category ="number";
            }
            if (y>0 && x<(n-1) && board[x+1][y-1].category !="bomb"){
                board[x+1][y-1].number++;
                board[x+1][y-1].category ="number";
            }
            if (x<n && y<n && board[x+1][y+1].category !="bomb"){
                board[x+1][y+1].number++;
                board[x+1][y+1].category ="number";
            }
            if (x<n && board[x+1][y].category !="bomb"){
                board[x+1][y].number++;
                board[x+1][y].category ="number";
            }
            if (y<(n-1) && board[x][y+1].category !="bomb"){
                board[x][y+1].number++;
                board[x][y+1].category ="number";
            }
            if (y>0 && board[x][y-1].category !="bomb"){
                board[x][y-1].number++;
                board[x][y-1].category ="number";
            }
            if (x>0 && board[x-1][y].category !="bomb"){
                board[x-1][y].number++;
                board[x-1][y].category ="number";
            }
        }
        return board;
    };



    var get_neighbors = function(x, y) {
        var positions = [];
        var surrounding_empty_squares = [];
        if (x>0){
            positions.push([(x-1),y]);
            if(y<(n-1)){
                positions.push([(x-1),(y+1)]);
            }
            if (y>0){
            positions.push([(x-1),(y-1)]);
            }
        }
        if (y>0){
            positions.push([x,(y-1)]);
            if (x<(n-1)){
                positions.push([(x+1),(y-1)]);
            }
        }
        if (x<(n-1)){
            positions.push([(x+1),y]);
            if (y<(n-1)){
                positions.push([(x+1),(y+1)]);
            }
        }
        if ((n-1)>y){
            positions.push([x,(y+1)]);
        }
        for(var i=0;i < positions.length; i++){
            if(board[positions[i][0]][positions[i][1]].category =="empty" ||board[positions[i][0]][positions[i][1]].category =="number"){
                board[positions[i][0]][positions[i][1]].is_visible=true;
                surrounding_empty_squares.push(positions[i]);
            }
        }
        return surrounding_empty_squares;
    };

        //not called yet
    var cascade_reveal = function(x,y,neighbors){
        var extend_clicked_block = [];
        for(var i=0; i<neighbors.length; i++){
            var current_x = neighbors[i][0];
            var current_y = neighbors[i][1];
            if (current_x >0){
                if (!board[current_x-1][current_y].is_visible){
                    console.log(neighbors[current_x-1][current_y]);
                    extend_clicked_block.push([(current_x-1), current_y]);
                    }

                else if(current_y <(n-1) && !board[current_x-1][current_y+1].is_visible){
                    extend_clicked_block.push([(current_x -1),(current_y+1)]);
                    }
                else if (current_y >0 && !board[(current_x-1)][(current_y-1)].is_visible){
                    extend_clicked_block.push([(current_x-1),(current_y-1)]);
                    }
                }
            }
            for (i=0; i<extend_clicked_block.length; i++){
            }
        return extend_clicked_block;
    };


    var array_of_boards = [];
    if(array_of_boards.length<1){
        array_of_boards.push(gen_board_array());
    }
    var board = array_of_boards[0];

    $( "*", document.body ).click(function( event ) {
        event.stopPropagation();
        var offset = $( this ).position();
        var board_x = $(this).parent().children().index($(this));
        var board_y = $(this).parent().parent().children().index($(this).parent());

        $( "#result" ).text( this.tagName +
            " coords ( " + offset.left + ", " + offset.top + " )" + "Row: "+ board_y + "Col: "+ board_x);
        $('.square').addClass('square');
    //works
        if(board[board_x][board_y].category =="bomb"){
          $(this).text("X");
        }
    //works
        if(board[board_x][board_y].category =="number"){
            $(this).text(board[board_x][board_y].number);
            $(this).css("color","red");
        }
    //only display single empty cell - crashing
        if(board[board_x][board_y].category =="empty"){
            $(this).text(board[board_x][board_y].category );
            var clicked_neighbors = get_neighbors(board_x,board_y);
            for(var i=0; i < clicked_neighbors.length; i++){
                    var grid_x_position = clicked_neighbors[i][1];
                    var grid_y_position = clicked_neighbors[i][0];
                if (board[grid_y_position][grid_x_position].category =="empty"){
                    console.log($("#row"+(grid_x_position+1)+ " > #column"+(grid_y_position+1)));
                    $("#row"+(grid_x_position+1)+ " > #column"+(grid_y_position+1)).text(board[grid_y_position][grid_x_position].category );
                        //cascade_reveal(grid_x_position, grid_y_position, clicked_neighbors)
                }
                if (board[grid_y_position][grid_x_position].category =="number"){
                    $("#row"+(grid_x_position+1)+ " > #column"+(grid_y_position+1)).text(board[grid_y_position][grid_x_position].number).css("color","red");
                }
            }
        }
    });
});
