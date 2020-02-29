class BoggleController < ApplicationController
    def index
        dictionary_file_path = File.join(Rails.root, '/app/assets/dictionary-yawl.txt')
        # puts dictionary_file_path
        dictionary_word_list = File.open(dictionary_file_path).readlines
        # puts dictionary_word_list[12]
        @trie = Trie.new
        dictionary_word_list.each do |word|
            @trie.insert(word.strip)
        end

        boggle = Boggle.new(4,4,@trie)
        boggle.solve_board()
        # TODO: get disticnt words from the list of found words
        puts boggle.boggle_words.length
        boggle.boggle_words.each do |bw|
            puts(bw)
        end



        # Quick Verification of Trie Implementation
        # dict_words = ["apple", "banana","grapes"]
        #test_words = ["apple", "banana","aalu", "mula","hawa","what","mui","muist"]
        # dict_words.each do |word|
        #     @trie.insert(word)
        # end
        #test_words.each do |word|
        #    hash = @trie.is_valid_word_or_prefix(word.upcase)
        #    puts(word)
        #    puts(hash)
        #end
        render json:{status:'SUCESS FROM index route'}
    end
end