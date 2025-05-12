import { Link } from "react-router-dom"

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
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
