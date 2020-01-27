import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GoTrue from 'gotrue-js'
import Fab from '@material-ui/core/Fab'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import FormatQuote from '@material-ui/icons/FormatQuote'

const auth = new GoTrue({
  APIUrl: 'https://william.cool/.netlify/identity',
})

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}))

export default function Thoughts() {
  const classes = useStyles()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currentUser = auth.currentUser()
    console.log({ currentUser })
    setUser(currentUser)
  }, [])

  const logout = () => {
    user.logout()
    setUser(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Thoughts
          </Typography>
          {user !== null ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Typography variant="h6">Login</Typography>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        {user !== null ? <ThoughtForm /> : <LoginForm setUser={setUser} />}
      </Container>
    </div>
  )
}

const LoginForm = ({ setUser }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const login = event => {
    event.preventDefault()

    auth
      .login(values.email, values.password, true)
      .then(user => {
        console.log('Success! Response: ', { user })
        setUser(user)
      })
      .catch(error => console.log('Failed :( ', { error }))
  }

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={login}>
        <TextField
          label="E-mail"
          type="text"
          fullWidth
          margin="normal"
          value={values.email}
          onChange={handleChange('email')}
        />
        <TextField
          label="password"
          type="password"
          fullWidth
          margin="normal"
          value={values.password}
          onChange={handleChange('password')}
        />
        <Grid container justify="flex-end">
          <Box marginTop={2}>
            <Button type="submit" variant="contained" onClick={login}>
              Submit
            </Button>
          </Box>
        </Grid>
      </form>
    </div>
  )
}

const ThoughtForm = () => {
  const [value, setValue] = useState('')

  const handleChange = event => {
    setValue(event.target.value)
  }

  const createThought = () => {
    console.log({ value })
    fetch('/.netlify/functions/thoughts', {
      body: value,
      method: 'POST',
    })
      .then(response => {
        setValue('')
        return response.json()
      })
      .then(json => {
        console.log(json)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          label="What is your thought?"
          fullWidth
          margin="normal"
          multiline
          rows="4"
          value={value}
          onChange={handleChange}
        />
      </Grid>
      <Grid container justify="flex-end">
        <Fab variant="extended" onClick={createThought}>
          Create <FormatQuote />
        </Fab>
      </Grid>
    </Grid>
  )
}
