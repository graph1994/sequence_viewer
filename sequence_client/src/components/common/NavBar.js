import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import styles from '../../styles/navbar.scss'
import dna from '../../dna.svg'

const NavBar = () => (
  <div className={styles.navBar}>
    <AppBar position="static" color="default">
      <Toolbar>
        <Grid container spacing={0}>
          <Grid item >
            <img alt="DNA Logo" src={dna} className={styles.logo} />
          </Grid>
          <Grid item>
            <Typography variant="title" color="inherit" style={{marginTop: '20px', marginLeft: '10px'}}>
              DNA Sequence Viewer
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </div>
)

export default NavBar