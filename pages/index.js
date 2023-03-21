import Head from "next/head";
import { useState } from "react"
import Image from "next/image"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import styles from "./index.module.css"
import { getOpeningData } from '../utils/api'
import TheoryTab from "../components/TheoryTab/TheroyTab"

export default function Home() {
  const [opening, setOpening] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true)
    const result = await getOpeningData(opening)
    setData(result)
    setIsLoading(false)

    // fetch additional steps
  }

  return (
    <div>
      <Head>
        <title>Chess Fitness</title>
      </Head>

      <main className={styles.main}>
        { !isLoading && !data && <>
          <Image src="/logo.svg" height={200} width={200} style={{ margin: '0 auto 10px' }} />
          <Typography variant="h3" textAlign="center" gutterBottom>Chess Fitness</Typography>

          <form onSubmit={onSubmit} className={styles.form}>
            <TextField fullWidth label="Opening Name" value={opening} onChange={e => setOpening(e.target.value)} />
            <Button type="submit" variant="contained">Start</Button>
          </form>
          <Typography gutterBottom variant="overline">Enter the name of any opening you want to learn</Typography>
        </> }

        { isLoading && <>
          <Image src="/loading.gif" height={400} width={400} style={{ margin: '0 auto' }}  />
        </> }

        { data && <div>
          <TheoryTab data={data} />
        </div>}
      </main>
    </div>
  );
}
