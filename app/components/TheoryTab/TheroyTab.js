import React, { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import Button from '@mui/material/Button'
import Typography from "@mui/material/Typography"
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import ChessBoard from '../ChessBoard/ChessBoard'
import styles from './TheoryTab.module.css'

const CHAPTER_NAMES = ['Introduction', 'Main Lines', 'Punish Mistakes', 'Thanks!']

const TheoryTab = ({ data = {}, isLoading }) => {
  const [chapter, setChapter] = useState({ index: 0, title: CHAPTER_NAMES[0], data: data.introduction })
  const [subChapterIndex, setSubChapterIndex] = useState(0)
  const isIntroLoading = (isLoading && !data.introduction) || (!chapter.data && chapter.index !==3)
  const isChapterLoading = isLoading && !data.chapter1

  useEffect(() => {
    if ((data.introduction && !chapter.data) || (!data.introduction && chapter.data)) {
      setChapter({ index: 0, title: CHAPTER_NAMES[0], data: data.introduction })
    }
  }, [data])

  const nextChapter = () => {
    let newIndex = chapter.index
    let subIndex = subChapterIndex
    if (
      chapter.index > 0 &&
      subIndex < (data[`chapter${chapter.index}`].length - 1)
    ) {
      subIndex++
    } else {
      subIndex = 0
      newIndex++
    }

    console.log(newIndex, subIndex, data[`chapter${newIndex}`])

    setSubChapterIndex(subIndex)
    setChapter({
      index: newIndex,
      title: CHAPTER_NAMES[newIndex],
      data: data[`chapter${newIndex}`] && data[`chapter${newIndex}`][subIndex],
      action: 'next'
    })
  }

  const prevChapter = () => {
    let newIndex = chapter.index
    let subIndex = subChapterIndex
    if (
      chapter.index > 0 &&
      subIndex > 0
    ) {
      subIndex--
    } else {
      newIndex--
      if (newIndex > 0) {
        subIndex = data[`chapter${newIndex}`].length - 1
      }
    }

    setSubChapterIndex(subIndex)
    setChapter({
      index: newIndex,
      title: CHAPTER_NAMES[newIndex],
      data: newIndex === 0
        ? data.introduction
        : data[`chapter${newIndex}`] && data[`chapter${newIndex}`][subIndex],
      action: 'prev'
    })
  }

  const skipChapter = () => chapter.action === 'next'
    ? nextChapter()
    : prevChapter()

  return <div className={styles.container}>
    <ChessBoard pgn={chapter.data ? chapter.data.pgn : data.opening.pgn} skipChapter={skipChapter} />

    { isIntroLoading && <aside className={styles.description}>
      <div className={styles.loading}>
        <Typography gutterBottom variant="h5">Fetching lesson...</Typography>
        <Image src="/loading.gif" height={250} width={250} style={{ margin: '0 auto' }} alt="loading animation" />
        <p>The AI is generating a lesson for the <b>{data.opening.name}</b>. This may take a few moments....</p>
      </div>
    </aside> }
    { !isIntroLoading && <aside className={styles.description}>
      {chapter.index !== 3 && <>
        <div>
          <Typography gutterBottom variant="h5">{chapter.title}</Typography>
          {chapter.data.description.split("\n").map((i,key) => {
              return <p key={key}>{i}</p>;
          })}
        </div>

        <div className={styles.buttonContainer}>
          <Button onClick={prevChapter} disabled={chapter.index === 0}>Previous Chapter</Button>
          <Button variant="contained" onClick={nextChapter} disabled={isChapterLoading}>
            Next Chapter {isChapterLoading && <div><CircularProgress size={20} /></div>}
          </Button>
        </div>
        { isChapterLoading && <Alert severity="info" style={{ marginTop: '2em' }}>More chapters are being generated in the background...</Alert>}
      </> }
      {chapter.index === 3 && <>
        <Typography gutterBottom variant="h5">{chapter.title}</Typography>
        <p>That's it! I hope you enjoyed the lesson.</p>
        <p>More features like practicing the opening against the AI are in the making.</p>
        <p>I'd love to hear your feedback and ideas. You can reach me via <a href="mailto:info@wweb.dev">Email</a>, <a href="https://twitter.com/wweb_dev">Twitter</a> or on <a href="https://github.com/Vincenius/chess-fitness/issues">GitHub</a>.</p>
        <p>P.S. I'm paying for every request to the AI. Any help paying the running costs is greatly appreciated. It helps me to keep this tool available for free 👇</p>

        <Link href='https://ko-fi.com/Y8Y7JYCS3' target='_blank'>
          <img style={{ height: '38px', marginBottom: '1em' }} src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' alt='Buy Me a Coffee at ko-fi.com' />
        </Link>

        <div>
          <Button onClick={prevChapter}>Previous Chapter</Button>
        </div>
      </> }
    </aside> }
  </div>
}

export default TheoryTab
