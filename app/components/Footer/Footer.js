import React from 'react'
import Typography from "@mui/material/Typography"
import styles from './Footer.module.css'

const Footer = () => {
  return <footer className={styles.footer}>
    <Typography variant="subtitle1" color="text.secondary" align="center" className={styles.topText}>
      Made by <a href="https://vincentwill.com">Vincent</a>. Chess Fitness is free and <a href="https://github.com/vincenius/chess-fitness">open-source</a>!
    </Typography>
    <Typography variant="subtitle1" color="text.secondary" align="center">
      We're still in beta. If you encounter any issues feel free to report them via <a href="mailto:info@wweb.dev">Email</a> or <a href="https://github.com/Vincenius/chess-fitness/issues">GitHub</a>.
    </Typography>
  </footer>
}

export default Footer
