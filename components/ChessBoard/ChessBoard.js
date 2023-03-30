import React, { useState, useEffect } from 'react'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import Button from '@mui/material/Button'
import { Chess } from 'chess.js'
import { Chessboard } from "react-chessboard"
import styles from './Chessboard.module.css'

const game = new Chess()
const history = new Chess()

const ChessBoard = ({ pgn }) => {
  const [move, setMove] = useState(0)

  useEffect(() => {
    history.loadPgn(pgn)
    console.log(game.history())
  })

  const updateMove = update => {
    const newMove = move + update
    if (newMove >= 0 && newMove < (history.history().length + 1)) {
      setMove(newMove)

      if (update > 0) {
        game.move(history.history()[newMove - 1])
      } else {
        game.undo()
      }
    }
  }

  console.log(game.history())

  return <div>
    <div className={styles.boardContainer}>
      <Chessboard
        arePiecesDraggable={false}
        id="BasicBoard"
        position={move === 0 ? 'start' : game.fen()}
      />
    </div>
    <div className={styles.buttonContainer}>
      <Button variant="outlined" fullWidth onClick={() => updateMove(-1)} disabled={move === 0}>
        <SkipPreviousIcon/>
      </Button>
      <Button variant="outlined" fullWidth onClick={() => updateMove(1)} disabled={move === history.history().length}>
        <SkipNextIcon/>
      </Button>
    </div>

    <div>
      <code>{history.pgn({ maxWidth: 5, newline: ' ' })}</code>
    </div>
  </div>
}

export default ChessBoard
