import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GoTrue from 'gotrue-js'
import Fab from '@material-ui/core/Fab'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import FormatQuote from '@material-ui/icons/FormatQuote'
import CircularProgress from '@material-ui/core/CircularProgress'

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
  thought: {
    fontSize: '36px',
    lineHeight: '36px',
  },
  offset: theme.mixins.toolbar,
}))

export default function Thoughts() {
  const classes = useStyles()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currentUser = auth.currentUser()
    setUser(currentUser)
  }, [])

  const logout = () => {
    user.logout()
    setUser(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
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
      <div className={classes.offset} />
      <Container maxWidth="sm">
        {user !== null ? <ThoughtForm /> : <LoginForm setUser={setUser} />}
      </Container>
    </div>
  )
}

const LoginForm = ({ setUser }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const login = event => {
    event.preventDefault()

    setLoading(true)
    auth
      .login(values.email, values.password, true)
      .then(user => {
        console.log('Success! Response: ', { user })
        setUser(user)
        // setLoading(false) // don't do this, because component gets unmounted
      })
      .catch(error => {
        console.log('Failed :( ', { error })
        setErrorMessage(error.message)
        setLoading(false)
      })
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
          disabled={loading}
          autoFocus={true}
          inputProps={{
            autoCapitalize: 'none',
          }}
          onChange={handleChange('email')}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={values.password}
          disabled={loading}
          inputProps={{
            autoCapitalize: 'none',
          }}
          onChange={handleChange('password')}
        />
        <Box marginTop={2}>
          <Grid container justify="space-between">
            <Grid item>
              <FormLabel hidden={errorMessage === null} error>
                {errorMessage}
              </FormLabel>
            </Grid>
            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              onClick={login}
            >
              {loading ? <CircularProgress /> : 'Submit'}
            </Button>
          </Grid>
        </Box>
      </form>
    </div>
  )
}

const ThoughtForm = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')

  const handleChange = event => {
    setValue(event.target.value)
  }

  const createThought = () => {
    setLoading(true)
    fetch('/.netlify/functions/thoughts', {
      body: value,
      method: 'POST',
    })
      .then(response => {
        setValue('')
        setLoading(false)
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
          rows="6"
          disabled={loading}
          value={value}
          autoFocus={true}
          onChange={handleChange}
          InputProps={{
            classes: {
              input: classes.thought,
            },
          }}
        />
      </Grid>
      <Grid container justify="flex-end">
        <Box marginTop={1}>
          <Fab variant="extended" disabled={loading} onClick={createThought}>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                Create <FormatQuote />
              </>
            )}
          </Fab>
        </Box>
      </Grid>
    </Grid>
  )
}
