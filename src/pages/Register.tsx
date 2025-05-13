import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/jobSearchLoggerAPI"
import { useState } from "react"

export default function Register() {
  const nav = useNavigate()
  let [message, setMessage] = useState("")

  const registerNewUser = evt => {
    evt.preventDefault()
    const user = {
      email: evt.target.email.value,
      password: evt.target.password.value,
    }
    registerUser(user).then(res => {
      if(res.data.msg) {
        setMessage(res.data.msg)
      } else {
        nav('/')
      }
    })
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerNewUser}>
        <h5 className="error-msg">{message}</h5>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" name="email" required/>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" required/>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
