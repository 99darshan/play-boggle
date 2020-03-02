require 'test_helper'

class BoggleTest < ActiveSupport::TestCase
    test "should_generate_boggle_board_of_given_size" do
        boggle = Boggle.new(4,4,Trie.new)
        assert boggle.board.length == 4
        assert boggle.board[0].length == 4        
    end

    test "boggle_board_does_not_contain_numbers" do
        boggle = Boggle.new(5,5,Trie.new)
        assert boggle.board.length == 5
        assert boggle.board[1].length == 5

        for i in 0...5 do 
            for j in 0...5 do
              assert ('A'..'Z').to_a.include? boggle.board[i][j] 
              assert_not ('0'..'10').to_a.include? boggle.board[i][j]
            end
        end
        
    end

    test "validate_solving_boggle_board" do 
        # create a trie and insert all dictionary words
        dictionary_file_path = File.join(Rails.root, '/app/assets/dictionary-yawl.txt')
         dictionary_word_list = File.open(dictionary_file_path).readlines
         trie = Trie.new
        dictionary_word_list.each do |word|
            trie.insert(word.strip)
        end

        boggle = Boggle.new(4,4,trie)

        # manually set the board 
        # over writes the randomly generated board property
        # dictionary words are uppercase so the board letter should also be uppercase
        boggle.board = [['A','M','P','D'],['R','T','D','W'],['V','B','E','R'],['W','T','S','A']]
        # valid words are obtained by solving above board from external online tool
        valid_words = ["mater","tears","teras","wets","wrest","wears","sea","marted","mated","mates","ramp","drew","bears","arsed","ate","beard","dears","debt","reb","ret","sae","tam","tea","wrasted","steard","arbs","ardebs"]
        
        boggle.solve_board()
        solved_words = boggle.boggle_words

        # puts solved_words.length
        # puts boggle.boggle_words.length
        # solved_words.each do |word|
        #     puts word
        # end

        valid_words.each do |word| 

            assert (solved_words.include? word.upcase), word
        end
    end
end