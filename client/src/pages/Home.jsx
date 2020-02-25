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

const INPUT_MODES = {
  textField: "textFieldInputMode",
  boardClick: "boardClickInputMode"
};

export default function Home() {
  const [inputWord, setInputWord] = useState("");
  const [correctWords, setCorrectWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [inputMode, setInputMode] = useState(INPUT_MODES.boardClick);

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

  const onBoggleCellClick = e => {
    // TODO: if the clicked word is adjacent word, else display a toast message
    console.log("cell clikced: " + e.target.textContent);
    setInputWord(inputWord + e.target.textContent);
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
                  <div style={styles.bbCell} onClick={onBoggleCellClick}>
                    {item}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      {/* Input Field */}
      <div style={styles.bbInputField}>
        {inputMode === INPUT_MODES.textField && (
          <input
            type="text"
            name="inputWord"
            onChange={e => setInputWord(e.target.value)}
            value={inputWord}
          />
        )}

        <p>Input Word: {inputWord}</p>
        <button onClick={e => setInputWord("")}>Reset</button>
        <button onClick={onWordSubmitted}>Submit Word</button>
        <button
          onClick={() =>
            setInputMode(
              inputMode === INPUT_MODES.textField
                ? INPUT_MODES.boardClick
                : INPUT_MODES.textField
            )
          }
        >
          {inputMode === INPUT_MODES.textField
            ? "Switch to Board Click Mode"
            : "Switch to Text Field Mode"}
        </button>
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
