import Head from "next/head";
import { useState } from "react"
import Image from "next/image"
import Typography from "@mui/material/Typography"
import styles from "./index.module.css"
import { getOpeningData, refreshData } from '../utils/api'
import TheoryTab from "../components/TheoryTab/TheroyTab"
import Autocomplete from '../components/Autocomplete/Autocomplete'
import Navigation from '../components/Navigation/Navigation'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()

  const reloadData = (generationId, opening) => {
    setTimeout(async () => {
      const result = await refreshData(generationId)

      if (result.introduction && (!data || !data.introduction)) {
        setData({ opening, ...result })
        setIsLoading(true)
      }
      if (result.chapter1) {
        setData({ opening, ...result })
        setIsLoading(false)
      }
      if (!result.chapter1) {
        reloadData(result.generation_id, opening)
      }
    }, 4000);
  }

  const onSubmit = async opening => {
    setData(null)
    if (opening && opening.name) {
      setData({ opening })
      setIsLoading(true)

      const result = await getOpeningData(opening)

      setData({ opening, ...result })

      if (!result.chapter1) {
        reloadData(result.generation_id, opening)
      } else {
        setIsLoading(false)
      }
    }
  }

  return (
    <div>
      <Head>
        <title>Chess Fitness | Train Chess Openings with your own AI Coach</title>
        <link rel="icon" href="logo.svg" />
      </Head>

      <main className={styles.main}>
        { !isLoading && !data && <>
          <Image src="/logo.svg" height={150} width={150} className={styles.logo} alt="strong chess piece logo" />
          <Typography variant="h3" component="h1" textAlign="center" className={styles.headline}>Chess Fitness</Typography>
          <Typography variant="subtitle1" component="h2" textAlign="center" gutterBottom className={styles.subheading}>Train Chess Openings with your own AI Coach</Typography>

          <form className={styles.form}>
            <Autocomplete onSelect={val => onSubmit(val)} />
            <Typography gutterBottom variant="overline">Enter the name of any opening you want to learn</Typography>
          </form>
        </> }

        { (data || isLoading) && <div>
          <Navigation onSelect={val => onSubmit(val)} opening={data.opening} reset={() => setData(null)}/>
          <TheoryTab data={data} isLoading={isLoading} />
        </div>}
      </main>
    </div>
  );
}
