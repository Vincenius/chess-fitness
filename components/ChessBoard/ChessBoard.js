import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import Button from '@mui/material/Button'
import { Chess } from 'chess.js'
import { Chessboard } from "react-chessboard"
import styles from './Chessboard.module.css'

const game = new Chess()
const history = new Chess()

const ChessBoard = ({ pgn, skipChapter }) => {
  const [move, setMove] = useState(0)
  const [historyMoves, setHistoryMoves] = useState([])

  useEffect(() => {
    try {
      history.loadPgn(pgn)
      setMove(0)
      setHistoryMoves(history.history())
      game.reset()
    } catch (error) {
      console.log('ERR', error)
      skipChapter()
    }
  }, [pgn])

  const updateMove = update => {
    const newMove = move + update
    if (newMove >= 0 && newMove < (historyMoves.length + 1)) {
      setMove(newMove)

      if (update > 0) {
        game.move(historyMoves[newMove - 1])
      } else {
        game.undo()
      }
    }
  }

  return <div>
    <div className={styles.boardContainer}>
      <Chessboard
        id="BasicBoard"
        arePiecesDraggable={false}
        position={move === 0 ? 'start' : game.fen()}
      />
    </div>
    <div className={styles.buttonContainer}>
      <Button variant="outlined" fullWidth onClick={() => updateMove(-1)} disabled={move === 0}>
        <SkipPreviousIcon/>
      </Button>
      <Button variant="outlined" fullWidth onClick={() => updateMove(1)} disabled={move === historyMoves.length}>
        <SkipNextIcon />
      </Button>
    </div>

    <div>
      <code>{history.pgn({ maxWidth: 5, newline: ' ' })}</code>
      <p>
        Analyse position on
        &nbsp;<Link href={`https://lichess.org/analysis/${game.fen().replaceAll(' ', '_')}`} target="_blank">Lichess</Link> |
        &nbsp;<Link href={`https://chess.com/analysis?fen=${game.fen().replaceAll(' ', '+')}`} target="_blank">Chess.com</Link></p>
    </div>
  </div>
}

export default ChessBoard
