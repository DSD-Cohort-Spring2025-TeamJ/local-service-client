import React, { useState, useContext } from 'react'
import { Context } from '../context/Context'
import Button from "/src/components/Button.jsx"

const Login = () => {

  const { setUser } = useContext(Context)

  const [form, setForm] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    const value = e.target.value
    setForm({
      ...form,
      [e.target.name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const r = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password
      })
    })
    const user = await r.json()
    if (user.error) {
      alert('incorrect username or password')
    } else {
      setUser(user)
    }
  }

  return (
    <div>
      <h3>Log In</h3>
      <form onSubmit={handleSubmit} >
        <label>
          Username:
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <Button 
        className="bg-[#4BCE4B] rounded-[1rem] no-underline px-[5px] py-[5px] w-[100px]
        shadow-[inset_0_-25px_18px_-14px_rgba(1,185,38,0.35),0_1px_2px_rgba(1,177,30,0.35),0_2px_4px_rgba(3,194,79,0.35),0_4px_8px_rgba(1,192,17,0.35),0_8px_16px_rgba(1,119,42,0.35),0_16px_32px_rgba(2,199,78,0.35)]
        text-[#4B4B4B] font-sans border-[1px] border-[#4BCE4B]
        hover:bg-green-700 hover:text-white
        active:scale-90 border-[#005701]"
        text="Submit"
        type="submit"/>
        {/* <button type='submit'>Submit</button> */}
      </form>
    </div>
  )
}

export default Login