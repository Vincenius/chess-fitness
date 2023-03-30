import Head from "next/head";
import { useState } from "react"
import Image from "next/image"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import styles from "./index.module.css"
import { getOpeningData } from '../utils/api'
import TheoryTab from "../components/TheoryTab/TheroyTab"
import Autocomplete from '../components/Autocomplete/Autocomplete'

export default function Home() {
  const [opening, setOpening] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()

  const onSubmit = async opening => {
    if (opening && opening.name) {
      setData(null)
      setIsLoading(true)
      const result = await getOpeningData(opening) // todo also pass pgn
      setData({ opening, ...result })
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Head>
        <title>Chess Fitness</title>
        <link rel="icon" href="logo.svg" />
      </Head>

      <main className={styles.main}>
        { !isLoading && !data && <>
          <Image src="/logo.svg" height={200} width={200} style={{ margin: '0 auto 10px' }} alt="strong chess piece logo"/>
          <Typography variant="h3" textAlign="center" gutterBottom>Chess Fitness</Typography>
        </> }
        <form className={styles.form}>
          <Autocomplete onSelect={val => onSubmit(val)} />
        </form>
        { !isLoading && !data && <Typography gutterBottom variant="overline">Enter the name of any opening you want to learn</Typography> }

        { isLoading && <>
          <Image src="/loading.gif" height={400} width={400} style={{ margin: '0 auto' }} alt="loading animation" />
        </> }

        { data && <div>
          <TheoryTab data={data} />
        </div>}
      </main>
    </div>
  );
}
