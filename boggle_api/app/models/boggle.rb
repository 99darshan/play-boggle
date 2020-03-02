class Boggle
    attr_accessor :rows, :columns, :board, :boggle_words, :trie 

    # Creates a Boggle Object
    # generates the random boggle board using the input size and assigns to the property board
    def initialize(r, c, trie)
        @rows = r
        @columns = c 
        @trie = trie 
        @boggle_words = Array.new
        @board = Array.new(@rows)
        # Generate random board during Boggle intialization 
        for i in 0...@rows do 
            @board[i] = Array.new(@columns)
            for j in 0...@columns do
                # find a random char, convert to array, sample takes one out element data type is array, [0] index gives the desired string representation, else it would return ["a"] instead of "a"
                @board[i][j] = ('A'..'Z').to_a.sample(1)[0]
            end
        end
        puts('board: '+ @board.to_s)
    end

    # loops through each particular cell of the Board and calls fucntion to pefrom DFS on each cell
    def solve_board()
        for i in 0...@rows do
            for j in 0...@columns do 
                dfs_boggle_board_cell(i, j, @board[i][j], [[i,j]])
            end
        end 
    end

    # Recursive DFS algorithm to traverse through all valid paths from a given cell and find the valid words by searching the trie data structure which is passed in during boggle object creation
    def dfs_boggle_board_cell(row_index, col_index, current_building_word, used_cells)
        word_or_prefix_hash = @trie.is_valid_word_or_prefix(current_building_word) 
        #puts word_or_prefix_hash
        #puts current_building_word + " ====== " + word_or_prefix_hash["is_valid_word"].to_s
        if word_or_prefix_hash["is_valid_word"] && current_building_word.length >= 3
            @boggle_words.push(current_building_word)
        end
        if word_or_prefix_hash["is_valid_prefix"] == false && current_building_word.length >= 3
            # puts 'return for not valid prefix'
            return;
        end
        valid_neighbors = get_valid_neighbours(row_index, col_index)

        valid_neighbors.each do |n|
            new_row_index = n[0]
            new_col_index = n[1]
            updated_current_building_word = current_building_word + @board[new_row_index][ new_col_index]
            if used_cells.none?n
                #puts updated_current_building_word
                used_cells.push([new_row_index, new_col_index])
                dfs_boggle_board_cell(new_row_index, new_col_index, updated_current_building_word, used_cells)
                # remove the cell from used so that it could be reached from another path
                # eg.[a,b,c,
                #     d,e,f,
                #    g,h,i] 
                #    traversing from a to b to d, usedCell will hold the location of d, if there are no valid paths from d, remove it from 
                # the usedCell, so it could be reached from another path e.g. e to b to e to d
                used_cells.delete([new_row_index,new_col_index])
            end
        end
    end

    # get valid neighbor row and column index for a given row and column index
    # (0,0) is a set as initial reference points and sets all possible neighbors in eight directions
    def get_valid_neighbours(row_index, col_index)
        # possible coordinate of neighbors relative to (0,0) starting point
        all_neighbors = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]
        valid_neighbors = Array.new 
        all_neighbors.each do |n|
            if row_index + n[0] >= 0 && row_index+n[0] < @rows && col_index+n[1] >= 0 && col_index+n[1] < @columns 
                # add the valid coordinate to get the neighbors correct row and column index
                valid_neighbors.push([row_index+n[0], col_index+n[1]])
            end
        end
        return valid_neighbors
    end
end