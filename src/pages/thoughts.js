import React from 'react'
import IdentityModal, {
  useIdentityContext,
} from 'react-netlify-identity-widget'

export default function Thoughts() {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.name) ||
    'NoName'

  console.log(JSON.stringify(identity))
  const isLoggedIn = identity && identity.isLoggedIn

  return (
    <>
      <nav style={{ background: 'green' }}>
        {' '}
        Login Status:
        <button className="btn" onClick={() => setDialog(true)}>
          {isLoggedIn ? `Hello ${name}, Log out here!` : 'LOG IN'}
        </button>
      </nav>
      <main>These are where the thoughts will go.</main>
      <IdentityModal
        aria-label="login"
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
      />
    </>
  )
}
