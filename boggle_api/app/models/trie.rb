# Node class represents each individual node in a Trie 
# child_nodes property represents all children of a particular node, it a hash of {char, Node}
# if a node is a leaf, then the bool isValidWord is set to true to represent a valid english word
class Node
    attr_accessor :child_nodes, :is_valid_word, :is_valid_prefix
    def initialize() 
        @child_nodes = Hash.new
    end
end

# Creates a Trie Data Structure from a list of words
class Trie
    attr_accessor :root
    def initialize()
        @root = Node.new
    end

    # Inserts a word into a trie
    def insert(word)
        # puts('inserting word: ' + word)
        # intial child nodes are the child nodes of root
        children = @root.child_nodes
        word.split('').each_with_index do |letter, index|
            if children.key?(letter)
                # if the character already exists as the children, get that node and assign its childNodes to the children variable for the next iteration
                node = children[letter]
                children = node.child_nodes
            else 
                # if the character doesn't exist as a childNode of the current node, 
                # add the character as a childNode of the current node, and assign its childNodes to the children variable for the next iteration                  
                node = Node.new 
                children[letter] = node
                children = node.child_nodes
            end
            #puts('index is: ' + index.to_s + ' letter is: ' + letter.to_s + ' word length is ' + (word.length-1).to_s)
             if index == word.length - 1 
                # puts("#{word} setting is valid to true #{index} == #{word.length-1}")
                # last character of the currently inserting word is a leaf and sets the flag for valid word to true
                node.is_valid_word = true
            end
        end
    end

    # Checks if a given word is present in a trie and is marked as a valid word
    # If it is not a valid word but has a path, it is a valid prefix,
    # Returns a hash of "is_valid_word" => bool, "is_valid_prefix"=> bool}
    def is_valid_word_or_prefix(word)
        children = @root.child_nodes
        node = nil
        word.split('').each do |letter|
            if children.key?(letter)
                # if the childNodes of root contains the character, get that node
                # the subsequent character should be checked against the childNodes of the found Node
                node = children[letter]
                children = node.child_nodes
            else
                # if any of the characters are not found as a childNodes of the current Node, it is not a valid word and not a valid prefix
                return {"is_valid_word" => false, "is_valid_prefix"=> false}
            end
        end
        # once iterating over the word is completed, check if the latest node has a valid word flag set to true
        # if the node object is null which shouldn't be the case though, both are false
        if node
            return {"is_valid_word" => node.is_valid_word, "is_valid_prefix" => true}
        else 
            return {"is_valid_word" => false, "is_valid_prefix" => false}     
        end
    end

end