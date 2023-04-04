import React from 'react'
import Image from "next/image"
import Autocomplete from '../Autocomplete/Autocomplete'
import styles from './Navigation.module.css'

const Navigation = ({ onSelect, opening, reset }) => {
  return <nav className={styles.container}>
    <Image src="/logo.svg" height={50} width={50} className={styles.logo} alt="strong chess piece logo" onClick={reset} />
    <Autocomplete onSelect={onSelect} opening={opening} />
  </nav>
}

export default Navigation
