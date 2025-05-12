import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/jobSearchLoggerAPI"

export default function Register() {
  const nav = useNavigate()

  const registerNewUser = evt => {
    evt.preventDefault()
    const user = {
      name: evt.target.name.value,
      email: evt.target.email.value,
      password: evt.target.password.value,
    }
    console.log(JSON.stringify(user))
    registerUser(user).then(() => {
      nav('/')
    })
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerNewUser}>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" required/>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" name="email" required/>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" required/>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
