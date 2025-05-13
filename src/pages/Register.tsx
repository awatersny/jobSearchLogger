import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/jobSearchLoggerAPI"
import { useState } from "react"

export default function Register() {
  const nav = useNavigate()
  let [message, setMessage] = useState("")

  const registerNewUser = evt => {
    evt.preventDefault()
    if(evt.target.password.value !== evt.target.confirm.value) {
      setMessage("Passwords must match!")
      return
    }
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
      <h2>Register</h2>
      <form onSubmit={registerNewUser}>
        <h5 className="error-msg">{message}</h5>
        <div className="form-field">
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" required/>
        </div>
        <div className="form-field">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" required/>
        </div>
        <div className="form-field">
          <label htmlFor="confirm">Confirm Password: </label>
          <input type="password" name="confirm" id="confirm" required/>
        </div>
        <div className="form-field">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}
