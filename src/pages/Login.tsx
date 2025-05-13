import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/jobSearchLoggerAPI"

export default function Login() {
  const nav = useNavigate()

  const loginExistingUser = evt => {
    evt.preventDefault()
    const user = {
      email: evt.target.email.value,
      password: evt.target.password.value,
    }
    loginUser(user).then(() => {
      nav('/')
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginExistingUser}>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" name="email" required/>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" required/>
        <button type="submit">Login</button>
      <Link to = "/register">Register</Link>
      </form>
    </div>
  )
}
