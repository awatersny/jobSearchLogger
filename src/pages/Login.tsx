import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/jobSearchLoggerAPI"
import { useState } from "react"

export default function Login() {
  const nav = useNavigate()
    let [message, setMessage] = useState("")

  const loginExistingUser = evt => {
    evt.preventDefault()
    const user = {
      email: evt.target.email.value,
      password: evt.target.password.value,
    }
    loginUser(user).then(res => {
      if(res.data.msg) {
        setMessage(res.data.msg)
      } else {
        nav('/')
      }
    })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginExistingUser}>
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
          <button type="submit">Login</button>
        </div>
      <Link to = "/register">Register</Link>
      </form>
    </div>
  )
}
