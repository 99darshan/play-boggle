import React, { useState } from "react";

const board = [
  ["a", "b", "c"],
  ["m", "n", "p"],
  ["x", "y", "z"]
];

const validWordsInBoggle = [
  "apple",
  "banana",
  "ninja",
  "test",
  "valid",
  "words"
];

export default function Home() {
  const [inputWord, setInputWord] = useState("initial");
  const [correctWords, setCorrectWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);

  const onWordSubmitted = () => {
    console.log("submitted word " + inputWord);
    // TODO: display toast messages on same correct and word input multiple times
    // TODO: on selection by click display toast when non-adjcent words are selected
    // TODO: based on API fetched vaid string, do check insensative comparison
    let isValidBoggleWord = validWordsInBoggle.includes(inputWord);

    if (isValidBoggleWord && !correctWords.includes(inputWord)) {
      setCorrectWords([...correctWords, inputWord]);
    }
    if (!isValidBoggleWord && !incorrectWords.includes(inputWord)) {
      setIncorrectWords([...incorrectWords, inputWord]);
    }
    setInputWord("");
  };

  return (
    <>
      <h2>Boggle</h2>
      {/* Board */}
      <div style={styles.boggleBoardContainer}>
        <div style={styles.boggleBoard}>
          {board.map(row => {
            return (
              <div style={styles.bbRow}>
                {row.map(item => (
                  <div style={styles.bbCell}>{item}</div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      {/* Input Field */}
      <div style={styles.bbInputField}>
        <input
          type="text"
          name="inputWord"
          onChange={e => setInputWord(e.target.value)}
          value={inputWord}
        />
        <p>Input Word: {inputWord}</p>
        <button onClick={e => setInputWord("")}>Reset</button>
        <button onClick={onWordSubmitted}>Submit Word</button>
        <div>
          <p>Correct Words List: </p>
          {correctWords.map(word => (
            <p>{word}</p>
          ))}
        </div>
        <div>
          <p>Incorrect Words List: </p>
          {incorrectWords.map(word => (
            <p>{word}</p>
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {
  boggleBoardContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: "100vw",
    background: "green"
  },
  boggleBoard: {
    width: "80vw",
    background: "red"
  },
  bbRow: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  bbCell: {
    border: "1px solid white",
    padding: "8px",
    margin: "4px"
  },
  bbInputField: {
    marginTop: "20px"
  }
};
