import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Typography from "@mui/material/Typography"
import ChessBoard from '../ChessBoard/ChessBoard'
import styles from './TheoryTab.module.css'

const TheoryTab = ({ data }) => {
  const [pgnData, setPgnData] = useState(data.opening.pgn)
  useEffect(() => {
    window.scrollTo(0, 0)
    setPgnData(data.opening.pgn + ' 1-0') // tiny hack to force re-render of board
  }, [])

  const pgn = `${pgnData}`

  return <div className={styles.container}>
    <ChessBoard pgn={pgn} />

    <aside className={styles.description}>
      <div>
        <Typography gutterBottom variant="h5">Introduction</Typography>
        {data.chapter1.description.split("\n").map((i,key) => {
            return <p key={key}>{i}</p>;
        })}
      </div>

      <div className={styles.buttonContainer}>
        <Button>Analyse on Lichess</Button>
        <Button variant="contained">Next Chapter</Button>
      </div>
    </aside>
  </div>
}

export default TheoryTab
