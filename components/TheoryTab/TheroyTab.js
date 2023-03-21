import React, { useEffect } from 'react'
import { Chessboard } from "react-chessboard" // https://www.npmjs.com/package/react-chessboard

const TheoryTab = ({ data }) => {
  useEffect(() => {

  }, [data])

  return <div style={{ width: '400px' }}>
    <Chessboard id="BasicBoard" />
  </div>
}

export default TheoryTab
