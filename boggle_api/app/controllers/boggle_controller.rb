class BoggleController < ApplicationController
    def index
        @trie = Trie.new
        dict_words = ["apple", "banana","grapes"]
        test_words = ["apple", "banana","aalu", "mula"]
        dict_words.each do |word|
            @trie.insert(word)
        end
        test_words.each do |word|
            puts @trie.is_valid_word_or_prefix(word)["is_valid_word"]
        end
        render json:{status:'SUCESS FROM index route'}
    end
end