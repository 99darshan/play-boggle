import React, { useState } from "react";
import Timer from "../components/Timer";

const board = [
  ["a", "a", "a"],
  ["m", "n", "m"],
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

export default function Game() {
  const [inputWord, setInputWord] = useState("");
  const [correctWords, setCorrectWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [inputMode, setInputMode] = useState(INPUT_MODES.boardClick);
  const [validAdjacentCells, setValidAdjacentcells] = useState([]);
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

  function onBoggleCellClick(e, currentRow, currentCol) {
    console.log(
      "r: " +
        currentRow +
        "& col: " +
        currentCol +
        "-" +
        typeof currentRow +
        typeof currentCol
    );
    // TODO: if the clicked word is adjacent word, else display a toast message
    console.log("cell clikced: " + e.target.textContent);
    //console.table(validAdjacentCells);
    //setInputWord(inputWord + e.target.textContent);
    let isCurrentRowColPresentInValidAdjCells = validAdjacentCells.some(cor => {
      return currentRow === cor[0] && currentCol === cor[1];
    });
    if (
      validAdjacentCells.length === 0 ||
      isCurrentRowColPresentInValidAdjCells
    ) {
      console.log("valid index");
      setInputWord(inputWord + e.target.textContent);
      let possibleAdjCellIndices = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1]
      ];
      let validAdjCells = [];
      // TODO: maybe if the current selected itself is not a valid adj cell, the possible adj cell should not be reset??
      possibleAdjCellIndices.forEach(posIndex => {
        if (
          currentRow + posIndex[0] >= 0 &&
          currentRow + posIndex[0] < 3 &&
          currentCol + posIndex[1] >= 0 &&
          currentCol + posIndex[1] < 3
        )
          validAdjCells.push([
            currentRow + posIndex[0],
            currentCol + posIndex[1]
          ]);
      });
      setValidAdjacentcells([...validAdjCells]);
      //console.table(validAdjacentCells);
    }
    if (
      validAdjacentCells.length > 0 &&
      !isCurrentRowColPresentInValidAdjCells
    ) {
      console.log("invalid adjacent cell");
      alert("invalid adjacent cell clicked!!"); // TODO: replace with a toast message
    }
  }

  return (
    <>
      <h2>Boggle</h2>
      <Timer totalTimeInSec={180} />
      {/* Board */}
      <div style={styles.boggleBoardContainer}>
        <div style={styles.boggleBoard}>
          {board.map((row, rowInd) => {
            return (
              <div style={styles.bbRow}>
                {row.map((item, colInd) => (
                  <div
                    style={styles.bbCell}
                    onClick={e => onBoggleCellClick(e, rowInd, colInd)}
                  >
                    {/* <p>row: {rowInd}</p>
                    <p>column: {colInd}</p> */}
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
        <button
          onClick={e => {
            setInputWord("");
            setValidAdjacentcells([]);
          }}
        >
          Reset
        </button>
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
