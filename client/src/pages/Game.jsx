import React, { useState, useContext, useEffect } from "react";
import Timer from "../components/Timer";
import Error from "../components/Error";
import { BoggleContext } from "../state/boggleContext";
import { Redirect, useHistory } from "react-router-dom";
import * as routes from "../constants/routeConstants";
import httpService from "../services/httpService";
import "../styles/boggle.scss";
import { Fab } from "@material-ui/core";
import { CheckCircle, Cancel, Home } from "@material-ui/icons";
import Toast from "../components/Toast";
import Loader from "../components/Loader";

import {
  FETCH_BOGGLE_ENDPOINT_SUCCESS,
  API_FETCH_START,
  API_FETCH_ERROR,
  ADD_CORRECT_WORDS,
  ADD_INCORRECT_WORDS,
  UPDATE_SCORE
} from "../state/boggleActionTypes";

export default function Game() {
  const [inputWord, setInputWord] = useState("");
  const [validAdjacentCells, setValidAdjacentcells] = useState([]);
  // stores the cells [row,col] that make up the current input word
  const [usedCellsByCurrentWord, setUsedCellsByCurrentWord] = useState([]);
  const [shouldOpenToast, setShouldOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  let { state, dispatch } = useContext(BoggleContext);
  const history = useHistory();

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
    //console.log("submitted word " + inputWord);

    // reset cells used by current word
    setUsedCellsByCurrentWord([]);

    if (!inputWord) {
      updateToastState(true, `Oops, Empty Input !! 🤦‍♀️ 😩 🤯`, "info");
      return;
    }

    let isValidBoggleWord = state.validWords.includes(inputWord);

    if (
      state.correctWords.includes(inputWord)
      // || state.incorrectWords.includes(inputWord)
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
    if (
      !isValidBoggleWord
      //&& !state.incorrectWords.includes(inputWord)
    ) {
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
    // console.log(
    //   "r: " +
    //     currentRow +
    //     "& col: " +
    //     currentCol +
    //     "-" +
    //     typeof currentRow +
    //     typeof currentCol
    // );
    // if any toast is yet to auto disapper, hide them if user clicks on a cell for new input
    setShouldOpenToast(false);
    //console.table(usedCellsByCurrentWord);

    let isCurrentCellAlreadySelected = usedCellsByCurrentWord.some(
      c => currentRow === c[0] && currentCol === c[1]
    );

    if (isCurrentCellAlreadySelected) {
      updateToastState(true, `Cell Already Selected !! 🤦‍♀️ 😩 🤯`, "info");
      return;
    }

    //console.log("cell clikced: " + e.target.textContent);
    //console.table(validAdjacentCells);
    //setInputWord(inputWord + e.target.textContent);
    let isCurrentRowColPresentInValidAdjCells = validAdjacentCells.some(cor => {
      return currentRow === cor[0] && currentCol === cor[1];
    });

    if (
      // checking for 0 handles the intial state,for first click validAjacentCells will be empty
      validAdjacentCells.length === 0 ||
      isCurrentRowColPresentInValidAdjCells
    ) {
      //console.log("valid index");
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
      // add to the cells used in building the current word
      setUsedCellsByCurrentWord([
        ...usedCellsByCurrentWord,
        [currentRow, currentCol]
      ]);
    }
    if (
      validAdjacentCells.length > 0 &&
      !isCurrentRowColPresentInValidAdjCells
    ) {
      //console.log("invalid adjacent cell");
      updateToastState(true, `Invalid Adjacent Letter !! 🤦‍♀️ 😩 🤯`, "info");
    }
  }
  //console.log(state.hasError);
  //console.log(state.error);
  return (
    <>
      <div className="game-wrapper">
        {state.hasGameEnded && <Redirect to={routes.GAME_END} />}
        {state.isFetching ? (
          <Loader cssClass="loader" />
        ) : (
          <React.Fragment>
            <div className="fixed-button">
              <Fab
                className="fixed-btn-fab"
                aria-label="Home"
                onClick={() => {
                  history.push(routes.HOME);
                }}
                size="small"
              >
                <Home />
              </Fab>
            </div>
            <h1>BOGGLE</h1>
            {state.hasError && <Error message="Oopsy Daisy! Unknow Error..." />}
            {!state.hasError && (
              <div className="timer-score-wrapper">
                <Timer
                  totalTimeInSec={state.totalTimeInSec}
                  wrapperCssClass="timer"
                />
                <div className="score">
                  <span role="img" aria-label="score">
                    🏆
                  </span>
                  <span>&#9; {state.score}</span>
                  {/* <EmojiEvents /> */}
                </div>
              </div>
            )}
            {/* Board */}
            {!state.hasError && (
              <div className="boggle-board-wrapper">
                <div className="boggle-board">
                  {state.boggleBoard.map((row, rowInd) => {
                    return (
                      <div className="board-row">
                        {row.map((item, colInd) => (
                          <div
                            className={`board-cell ${
                              usedCellsByCurrentWord.some(
                                c => rowInd === c[0] && colInd === c[1]
                              )
                                ? "board-cell-used"
                                : ""
                            }`}
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
            )}
            {!state.hasError && (
              <div className="user-input-wrapper">
                <div className="user-input">
                  {!inputWord ? (
                    <p>
                      {" "}
                      <span role="img" aria-label="input">
                        🔤
                      </span>
                      <span role="img" aria-label="computer-mouse">
                        🖱️
                      </span>
                      <span role="img" aria-label="up-hand">
                        👆
                      </span>
                    </p>
                  ) : (
                    <p>{inputWord}</p>
                  )}
                </div>

                <div className="user-actions">
                  <Fab
                    className="fab-submit"
                    aria-label="Submit"
                    onClick={onWordSubmitted}
                    variant="extended"
                    size="medium"
                  >
                    <CheckCircle />
                    Submit
                  </Fab>

                  <Fab
                    className="fab-reset"
                    aria-label="Reset"
                    onClick={e => {
                      setInputWord("");
                      setValidAdjacentcells([]);
                      setUsedCellsByCurrentWord([]);
                    }}
                    size="medium"
                    variant="extended"
                  >
                    <Cancel />
                    Cancel
                  </Fab>
                </div>
              </div>
            )}
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
