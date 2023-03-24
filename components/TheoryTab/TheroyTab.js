import React, { useEffect, useState } from 'react'
import ChessAnalysisBoard from 'react-chess-analysis-board'

const TheoryTab = ({ data }) => {
  return <div style={{ width: '400px' }}>
    <ChessAnalysisBoard
		pgnString={`[Event "Chess Fitness"]
      [Site "Opening Name"]
      [Date "????.??.??"]
      [EventDate "?"]
      [Round "?"]
      [Result "?"]
      [White "White"]
      [Black "Black"]
      [ECO "C52"]
      [WhiteElo "?"]
      [BlackElo "?"]
      [PlyCount "?"]

      ${data.pgn}`}
    />
  </div>
}

export default TheoryTab
