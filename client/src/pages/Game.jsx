import React, { useState, useContext, useEffect } from "react";
import Timer from "../components/Timer";
import { BoggleContext } from "../state/boggleContext";
import { Redirect } from "react-router-dom";
import * as routes from "../constants/routeConstants";
import httpService from "../services/httpService";
import "../styles/boggle.scss";
import { IconButton } from "@material-ui/core";
import { CheckCircle, Cancel } from "@material-ui/icons";
import Toast from "../components/Toast";

import {
  FETCH_BOGGLE_ENDPOINT_SUCCESS,
  API_FETCH_START,
  API_FETCH_ERROR,
  ADD_CORRECT_WORDS,
  ADD_INCORRECT_WORDS,
  UPDATE_SCORE
} from "../state/boggleActionTypes";

const INPUT_MODES = {
  textField: "textFieldInputMode",
  boardClick: "boardClickInputMode"
};

export default function Game() {
  const [inputWord, setInputWord] = useState("");
  const [inputMode, setInputMode] = useState(INPUT_MODES.boardClick);
  const [validAdjacentCells, setValidAdjacentcells] = useState([]);
  const [shouldOpenToast, setShouldOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  let { state, dispatch } = useContext(BoggleContext);

  // fetch random boggle board and its solution on game page load
  useEffect(() => {
    dispatch({ type: API_FETCH_START });
    httpService.Get(
      routes.BOGGLE_ENDPOINT,
      dispatch,
      FETCH_BOGGLE_ENDPOINT_SUCCESS,
      API_FETCH_ERROR
    );
  }, []);

  function updateToastState(shouldOpen, message, type) {
    setShouldOpenToast(shouldOpen);
    setToastMessage(message);
    setToastType(type);
  }

  const onWordSubmitted = () => {
    console.log("submitted word " + inputWord);
    // TODO: display toast messages on same correct and word input multiple times
    // TODO: on selection by click display toast when non-adjcent words are selected
    // TODO: based on API fetched vaid string, do check insensative comparison
    if (!inputWord)
      updateToastState(true, `Oops, Empty Input !! 🤦‍♀️ 😩 🤯`, "info");

    let isValidBoggleWord = state.validWords.includes(inputWord);

    if (
      state.correctWords.includes(inputWord) ||
      state.incorrectWords.includes(inputWord)
    ) {
      updateToastState(true, `${inputWord} is already submitted !! 🤦‍♀️ 😩 🤯`);
    }

    if (isValidBoggleWord && !state.correctWords.includes(inputWord)) {
      dispatch({
        type: ADD_CORRECT_WORDS,
        payload: { correctWords: [...state.correctWords, inputWord] }
      });
      dispatch({
        type: UPDATE_SCORE,
        payload: { score: state.score + inputWord.length }
      });
      updateToastState(
        true,
        `Yay, ${inputWord} is correct !! 🦄 🎉 🔥 🥳`,
        "success"
      );
    }
    if (!isValidBoggleWord && !state.incorrectWords.includes(inputWord)) {
      dispatch({
        type: ADD_INCORRECT_WORDS,
        payload: { incorrectWords: [...state.incorrectWords, inputWord] }
      });
      updateToastState(
        true,
        `Oops, ${inputWord} is wrong !! 🤦‍♀️ 😩 🤯 `,
        "error"
      );
    }
    setInputWord("");
    setValidAdjacentcells([]);
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
          currentRow + posIndex[0] < 4 &&
          currentCol + posIndex[1] >= 0 &&
          currentCol + posIndex[1] < 4
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
      <div className="game-wrapper">
        {state.hasGameEnded && <Redirect to={routes.GAME_END} />}
        {state.isFetching ? (
          <p>is fetching data...</p>
        ) : (
          <React.Fragment>
            <div className="timer-score-wrapper">
              <Timer totalTimeInSec={state.totalTimeInSec} />
              <div className="score">
                <span>&#x1F389;</span>
                <h2>score: {state.score}</h2>
              </div>
            </div>
            {/* Board */}
            <div className="boggle-board-wrapper">
              <div className="boggle-board">
                {state.boggleBoard.map((row, rowInd) => {
                  return (
                    <div className="board-row">
                      {row.map((item, colInd) => (
                        <div
                          className="board-cell"
                          onClick={e => onBoggleCellClick(e, rowInd, colInd)}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="user-input-wrapper">
              <div className="user-input">
                <p>{inputWord}</p>
              </div>

              <div className="user-actions">
                <IconButton aria-label="Submit" onClick={onWordSubmitted}>
                  <CheckCircle fontSize="large" color="primary" />
                </IconButton>

                <IconButton
                  aria-label="Submit"
                  onClick={e => {
                    setInputWord("");
                    setValidAdjacentcells([]);
                  }}
                >
                  <Cancel fontSize="large" color="error" />
                </IconButton>
              </div>
            </div>

            {/* Input Field */}
            <div>
              {inputMode === INPUT_MODES.textField && (
                <input
                  type="text"
                  name="inputWord"
                  onChange={e => setInputWord(e.target.value)}
                  value={inputWord}
                />
              )}

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
            </div>
            <Toast
              open={shouldOpenToast}
              message={toastMessage}
              type={toastType}
              onClose={(e, reason) => {
                setShouldOpenToast(false);
                if (reason === "clickaway") return;
              }}
            />
          </React.Fragment>
        )}
      </div>
    </>
  );
}
