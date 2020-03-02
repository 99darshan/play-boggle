require 'test_helper'

class TrieTest < ActiveSupport::TestCase
    test "trie_contains_a_valid_word" do
        trie = Trie.new
        words_to_insert_in_trie = ["ball","baller","nest","nestle","super","superman"]
        words_not_in_trie =["potato","fries","momo","pizza","tea"]
        words_to_insert_in_trie.each do |word|
            trie.insert(word)
        end

        words_to_insert_in_trie.each do |word|
            assert trie.is_valid_word_or_prefix(word)["is_valid_word"]
            assert trie.is_valid_word_or_prefix(word)["is_valid_prefix"]
            assert trie.is_valid_word_or_prefix(word[0...3])["is_valid_prefix"]
            assert_not trie.is_valid_word_or_prefix(word[0...2])["is_valid_word"]
        end

        words_not_in_trie.each do |word|
            assert_not trie.is_valid_word_or_prefix(word)["is_valid_word"]
            assert_not trie.is_valid_word_or_prefix(word)["is_valid_prefix"]
        end
    end
end