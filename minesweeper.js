$(document).ready(function(){  
		var n = 8;
		//create grid 
		var id_index=[]
		for (var i=0; i<n; i++){
			for (j=0; j<n; j++){
				id_index.push([i,j])
			}
		} 
		for (var i=0; i<n; i++){
			// var y_id = (parseInt(i))
			// y_array.push(y_id)
			$(".grid").append("<tr class='gridrow' id=row"+(i+1)+"></tr>")
		} 

		for (i=0;i<n;i++){
				//var x_id = "x:"+(parseInt(i))
				//link id to variable
				var square_coords = id_index.shift()
				$(".gridrow").append("<td class='square' id=column"+(i+1)+"></td>")
		} 

		var gen_rows = function(x){ 
			var row = []
			for (i=0; i<x; i++){
				var o = {}
				o.is_visible = "false";
				o.category = "empty"; 
				o.number = 0;
				o.x_coord=i;
				o.y_coord=0;

				row.push(o)
			} 
			return row
		}  
		var init_board = function(x){
			var container = [];
			var row = gen_rows()
			for (var i=0; i<x; i++){
				var row = gen_rows(n)
				container.push(row)  
			}
			return container
				}  
		var seed_bomb= function(){
			var seed_bomb_index = Math.floor(Math.random() * 7)
			return seed_bomb_index
		}
		var gen_bomb_coordinates=function(){ 
		 		var x = seed_bomb();
		 		var y = seed_bomb();  
		 		return [x,y]
		} 
		//below function: check to make sure that no two bomb coordinates
		var get_bomb_coordinates = function(){
			var bomb_coordinates = [];
			var num_bombs = 3
			while (bomb_coordinates.length<=num_bombs){
				var new_bomb = gen_bomb_coordinates()
    			if (jQuery.inArray(new_bomb, bomb_coordinates) == -1){
					bomb_coordinates.push(new_bomb)  
				}
			}  
				return bomb_coordinates
		}
		var gen_board_array = function(){
			var board = init_board(n) 
			var bomb_coordinates = get_bomb_coordinates()  
			var l = bomb_coordinates.length 			
			for (i=0; i<l; i++){
				var current = bomb_coordinates.pop()  
				var x = current[0];  
				var y = current[1];  
				board[x][y]["category"] = "bomb" 
					if (x>0){
						if (board[x-1][y]["category"]!="bomb"){
							board[x-1][y]["category"]="number"
							board[x-1][y]["number"]++
						}
						if(y>(n-1) && board[x-1][y+1]["category"]!="bomb"){
							board[x-1][y+1]["number"]++
							board[x-1][y+1]["category"]="number"
						}
						if (y>0 && board[x-1][y-1]["category"]!="bomb"){  
							board[x-1][y-1]["number"]++
							board[x-1][y-1]["category"]="number"
						}
					}
					else if (y>0){  
						if (board[x][y-1]["category"]!="bomb"){
							board[x][y-1]["category"]="number"
							board[x][y-1]["number"]++
						} 
						if (x<(n-1) && board[x+1][y-1]["category"]!="bomb"){  
							 board[x+1][y-1]["category"]="number"
							 board[x+1][y-1]["number"]++
						}
					}  
					else if (x<(n-1) && board[x+1][y]["category"]!="bomb"){ 
						board[x+1][y]["category"]="number"
						board[x+1][y]["number"]++
						if (y<(n-1) && board[x+1][y+1]["category"]!="bomb"){
							board[x+1][y+1]["category"]="number"
							board[x+1][y+1]["number"]++   
						}
					else if ((n-1)>y && board[x][y+1]["category"]!="bomb"){  
							board[x][y+1]["category"]="number"
							board[x][y+1]["number"]++
						}
					}
					else if(x > 0 && y<(n-1) && board[x-1][y+1]["category"]!="bomb"){
						board[x-1][y+1]["category"]="number"
					 	board[x-1][y+1]["number"]++
					 }
				}
			return board
		}
		var get_surrounding_squares = function(x,y){
			var surrounding = [[(x-1),y], [(x+1),y],[(x-1),(y+1)],[(x+1),(y+1)],[(x+1),(y-1)],[x,(y+1)],[x,(y-1)],[(x-1),(y-1)]]
			return surrounding
		}


	
		//not active yet - tests to see if neighbors are in range. 
		// var test_possible_neighbors =function(x,y,n){
		// 	var bordering_squares = []
		// 	var n_left = [(x-1), y]
		// 	var n_right =[(x+1),y]
		// 	var n_top = [x, y-1]
		// 	var n_bottom = [x, y+1]
		// 	var n_up_right = [(x+1),(y+1)]
		// 	var n_up_left = [(x-1),(y-1)]
		// 	var n_down_left = [(x-1), (y+1)]
		// 	var n_down_right = [(x+1),(y+1)]
		// 	var all_surrounding = [n_bottom, n_top, n_left, n_right, n_up_left, n_up_right, n_down_right, n_down_left]
		// 	for (var i=0; i<all_surrounding.length; i++){
		// 		var x_neighbor = all_surrounding[i[0]]
		// 	}
		// 	return bordering_squares
		// }

	

		var get_neighbors = function(x, y) { 
			console.log(board[3][1])
			console.log("x,y"+ x+","+y) 
			//change surrounding name to "surrounding_squares"
			var surrounding = [[(x-1),y], [(x+1),y],[(x-1),(y+1)],[(x+1),(y+1)],[(x+1),(y-1)],[x,(y+1)],[x,(y-1)],[(x-1),(y-1)]]
			var positions = []
			//change position name - currently unclear
			var surrounding= []
				//hit edge cases first 
					//middle squares: works, but then it continues to call the rest of the if statements. 
					if(0<y<(n-1) && 0<x<(n-1)){
						for(var i=0; i<surrounding.length; i++){
							positions.push(surrounding[i])
						}

					}
					//top left corner
					else if (y<1 && x<1){
						console.log(x==0+","+y==0)
						console.log([x,(y+1)])
						positions.push([x,(y+1)],[(x+1),y],[(x+1),y+1])
						console.log(positions)
					}
					//top right corner
					else if (y==0 && 0<x<(n-1)){
						positions.push([x,(y+1)], [(x+1),y], [(x+1),y+1], [(x-1),(y+1)])
					}
					//bottom left corner
					else if (x==0 && 0<y<(n-1)){
						positions.push([(x+1),y],[(x+1),(y+1)],[(x+1),(y-1)],[x,(y+1)],[x,(y-1)])
					}
					//bottom right corner
					else if (x==n-1 && y==(n-1)){ 
						positions.push([x,(y-1)],[(x-1),(y-1)],[(x-1),y])
					}	
					//all bottom row xpt corner
					else if (y==n-1 && x<(n-1)){ 
						positions.push([x,(y-1)],[(x-1),(y-1)],[(x-1),y],[x+1, y-1],[x+1,y])
					}
					//all top row
					else if (y==0 && x<(n-1)){ 
						positions.push([x,(y+1)],[(x-1),(y+1)],[(x-1),y],[x+1, y+1],[x+1,y])
					}
					//all left col
					else if (x==0 && y<(n-1)){ 
						positions.push([x,(y+1)],[x,(y-1)],[(x+1),y],[(x+1),(y+1)],[(x+1), (y-1)])
					}
					//all right col 
					else if (0<y<(n-1) && x==(n-1)){ 
						positions.push([x,(y+1)],[x,(y-1)],[(x-1),y],[(x-1),( y+1)],[(x-1),y])
					}
					for(var i=0; i<positions.length; i++){  
							if(board[positions[i][0]][positions[i][1]]["is_visible"]==false){
								console.log(board[positions[i][0]][positions[i][1]]["is_visible"])
								board[positions[i][0]][positions[i][1]]["is_visible"]=true
								surrounding_empty_squares.push(positions[i])  
							}	
						}
					return positions
			}

			//not called yet
			var cascade_reveal = function(x,y,neighbors){
				var extend_clicked_block = []
				console.log(neighbors)
				for(var i=0; i<neighbors.length; i++){
					var current_x = neighbors[i][0]
					var current_y = neighbors[i][1] 
					if (current_x >0){
						if (board[current_x-1][current_y]["is_visible"]==false){
							console.log(neighbors[current_x-1][current_y])
							extend_clicked_block.push([(current_x-1), current_y])
							console.log("first if statement")
							}

						else if(current_y <(n-1) && board[current_x-1][current_y+1]["is_visible"]==false){
							extend_clicked_block.push([(current_x -1),(current_y+1)])
							console.log("second if statement") 
							}
						else if (current_y >0 && board[(current_x-1)][(current_y-1)]["is_visible"]==false){ 
							extend_clicked_block.push([(current_x-1),(current_y-1)]) 
							console.log("third if statement")
							}  
						}
					}
					for (var i=0; i<extend_clicked_block.length; i++){ 
						console.log(extend_clicked_block)
					}
				return extend_clicked_block
			}


		var array_of_boards = []
  		if(array_of_boards.length<1){
  			array_of_boards.push(gen_board_array()) 
  		}
		var board = array_of_boards[0]


		// event listener to get coordinates
  		$( "*", document.body ).click(function( event ) {
			event.stopPropagation();
			var offset = $( this ).position(); 
			var board_x = $(this).parent().children().index($(this));
  			var board_y = $(this).parent().parent().children().index($(this).parent()); 

			$( "#result" ).text( this.tagName +
			    " coords ( " + offset.left + ", " + offset.top + " )" + "Row: "+ board_y + "Col: "+ board_x);
	    //works
			if(board[board_x][board_y]["category"]=="bomb"){ 
			  $(this).text("X"); 
			}
		//works
			if(board[board_x][board_y]["category"]=="number"){
			  	$(this).text(board[board_x][board_y]["number"]);
			  	$(this).css("color","red");
			} 
		//only display single empty cell - crashing 
			if(board[board_x][board_y]["category"]=="empty"){   
				$(this).text(board[board_x][board_y]["category"])
			    var clicked_neighbors = get_neighbors(board_x,board_y) 
			    for(i=0; i<clicked_neighbors.length; i++){ 
			    		var grid_x_position = clicked_neighbors[i][1];  
			  			var grid_y_position = clicked_neighbors[i][0];  
			  		if (board[grid_y_position][grid_x_position]["category"]=="empty"){
			  			$("#row"+(grid_x_position+1)+ "> #column"+(grid_y_position+1)).text(board[grid_y_position][grid_x_position]["category"]);
			  				//cascade_reveal(grid_x_position, grid_y_position, clicked_neighbors)
			  		}
			  		if (board[grid_y_position][grid_x_position]["category"]=="number"){
			  			$("#row"+(grid_x_position+1)+ "> #column"+(grid_y_position+1)).text(board[grid_y_position][grid_x_position]["number"]).css("color","red"); 
					}
				}
			}
	});
}); 