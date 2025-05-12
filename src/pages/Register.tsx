export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form>
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
