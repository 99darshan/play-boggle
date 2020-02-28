class Node
    attr_accssor :child_nodes, :is_valid_word, :is_valid_prefix
end

class Trie
    def initialize()
        @root = Node.child_nodes
    end

    def insert(word)
        children = @root.child_nodes
        node = nil
        word.each do |letter, index|
            if children.key?(letter)
                node = children[letter]
                children = node.child_nodes
            else 
                node = Node.new 
                children[letter] = node
                children = node.child_nodes
            end
            if index == word.length - 1 
                node.is_valid_word = true
            end
        end
    end

    def is_valid_word_or_prefix(word)
        children = @root.child_nodes
        node = nil
        word.each do |letter, index|
            if children.key?(letter)
                node = children[letter]
                children = node.child_nodes
            else
                return {"is_valid_word" = false}
            end
        end

        if node == nil 
            return {"is_valid_word" = false, "is_valid_prefix": false}
            
        else 
            return {"is_valid_word" = node.is_valid_word, "is_valid_prefix": true}
        end
    end

end