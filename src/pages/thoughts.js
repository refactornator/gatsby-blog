import React, { useState, useEffect } from 'react'
import GoTrue from 'gotrue-js'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const auth = new GoTrue({
  APIUrl: 'https://william.cool/.netlify/identity',
})

export default function Thoughts() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currentUser = auth.currentUser()
    console.log({ currentUser })
    setUser(currentUser)
  }, [])

  if (user !== null) {
    return <ThoughtForm user={user} setUser={setUser} />
  } else {
    return <LoginForm setUser={setUser} />
  }
}

const LoginForm = ({ setUser }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const login = () => {
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
      <h1>Login</h1>
      <form noValidate autoComplete="off">
        <TextField
          label="E-mail"
          type="text"
          value={values.email}
          onChange={handleChange('email')}
        />
        <TextField
          label="password"
          type="password"
          value={values.password}
          onChange={handleChange('password')}
        />
        <Button variant="contained" onClick={login}>
          Login
        </Button>
      </form>
    </div>
  )
}

const ThoughtForm = ({ user, setUser }) => {
  const [thought, setThought] = useState('')

  const logout = () => {
    user.logout()
    setUser(null)
  }

  const handleChange = event => {
    setThought(event.target.value)
  }

  const createThought = () => {
    console.log({ thought })
    setThought('')
  }

  return (
    <div>
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
      <TextField
        label="New Thought"
        multiline
        rowsMax="4"
        value={thought}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={createThought}>
        Create Thought
      </Button>
    </div>
  )
}
