class Boggle
    attr_accessor :rows :columns :board :boggle_words :trie 

    def initialize(r, c, trie)
        @rows = r
        @columns = c 
        @trie = trie 
        @boggle_words = Array.new
        @board = Array.new(@rows){Array.new(@columns)}
        # Generate random board during Boggle intialization 
        for i in 0..@rows do 
            for j in 0..@columns do
                @board[i,j] = ('a'..'z').to_a.sample(1)
            end
        end
    end

    def solve_board()
        for i in 0..@rows do
            for j in 0..@columns do 
                dfs_boggle_board_cell(i, j, @board[i,j], [[i,j]])
            end
        end 
    end

    def dfs_boggle_board_cell(row_index, col_index, current_building_word, used_cells)
        word_or_prefix_hash = @trie.is_valid_word_or_prefix(current_building_word.upcase) 
        if word_or_prefix_hash["is_valid_word"] && current_building_word >= 3
            @boggle_words.push(current_building_word)
        if !word_or_prefix_hash["is_valid_prefix"] && current_building_word >= 3
            return;
        
        valid_neighbors = get_valid_neighbours(row_index, col_index)

        valid_neighbors.each do |n, index|
            new_row_index = n[0]
            new_col_index = n[1]
            updated_current_building_word = current_building_word + @board[new_row_index, new_col_index]
            if used_cells.include? n == false
                used_cells.push(n)
                dfs_boggle_board_cell(new_row_index, new_col_index, updated_current_building_word, used_cells)
                used_cells.delete([new_row_index, new_col_index])
            end
        end
    end

    def get_valid_neighbours(row_index, col_index)
        all_neighbors = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]
        valid_neighbors = Array.new 
        all_neighbors.each do |n, index|
            if row_index + n[0] >= 0 && row_index+n[1] < @rows && col_index+n[1] >= 0 && col_index+n[1] < @columns 
                valid_neighbors.push(n)
            end
        end
        return valid_neighbors
    end
end