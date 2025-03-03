import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Context = React.createContext();

function Provider({ children }) {

  const [user, setUser] = useState(false)
  const history = useHistory()

  useEffect(() => {
    fetch("/api/me")
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          history.push("/")
        }
        else {
          setUser(data)
        }
      })
  }, [])

  const logout = () => {
    fetch('/api/logout', {
      method: "DELETE"
    })
      .then(() => {
        setUser(false)
        history.push("/")
      })
  }

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        logout
      }}>
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }