import React, { useEffect, useState } from 'react'
import ChessAnalysisBoard from 'react-chess-analysis-board'

const TheoryTab = ({ data }) => {
  const pgn = `[Event "Chess Fitness"]
    [Site "${data.opening.name}"]
    [Date "${new Date().toISOString().slice(0, 10)}"]
    [EventDate "?"]
    [Round "?"]
    [Result "?"]
    [White "White"]
    [Black "Black"]
    [ECO "${data.opening.eco}"]
    [WhiteElo "?"]
    [BlackElo "?"]
    [PlyCount "?"]

    ${data.pgn}`
    console.log(pgn)
  return <div>
    <ChessAnalysisBoard
      pgnString={pgn}
      getAnalysisPosition={e => console.log(e)}
    />
  </div>
}

export default TheoryTab
