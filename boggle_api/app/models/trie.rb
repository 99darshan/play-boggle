class Node
    attr_accessor :child_nodes, :is_valid_word, :is_valid_prefix
    def initialize() 
        @child_nodes = Hash.new
    end
end

class Trie
    attr_accessor :root
    def initialize()
        @root = Node.new
    end

    def insert(word)
        puts('inserting word: ' + word)
        children = @root.child_nodes
        node = nil
        word.split('').each_with_index do |letter, index|
            if children.key?(letter)
                node = children[letter]
                children = node.child_nodes
            else 
                node = Node.new 
                children[letter] = node
                children = node.child_nodes
            end
            #puts('index is: ' + index.to_s + ' letter is: ' + letter.to_s + ' word length is ' + (word.length-1).to_s)
            if index == word.length - 1 
                #puts('setting is valid to true')
                node.is_valid_word = true
            end
        end
    end

    def is_valid_word_or_prefix(word)
        children = @root.child_nodes
        node = nil
        word.split('').each do |letter|
            if children.key?(letter)
                node = children[letter]
                children = node.child_nodes
            else
                return {"is_valid_word" => false}
            end
        end

        if node == nil 
            return {"is_valid_word" => false, "is_valid_prefix" => false}
            
        else 
            #puts('is valid..')
            return {"is_valid_word" => node.is_valid_word, "is_valid_prefix" => true}
        end
    end

end