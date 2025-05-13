import { useEffect, useState } from 'react'
import { getAllCompanies } from '../services/jobSearchLoggerAPI'

export default function CreateJob() {
  const [companies, setCompanies] = useState([])
  const [skills, setSkills] = useState([])
  const [message, setMessage] = useState("")
  const statuses = ["applied", "interviewing", "offered", "rejected"]
  
  useEffect(() => {
    getAllCompanies().then(res => setCompanies(res.data))
  }, [])

  console.log(companies)

  return (
    <>
      <h2>New Application</h2>
      <form>
        <h5 className="error-msg">{message}</h5>
        <div className='form-field'>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" name="title" required/>
        </div>
        <div className='form-field'>
          <label htmlFor="description">Description: </label>
          <textarea name="description" id="description" rows={4} cols={50} required/>
        </div>
        <div className='form-field'>
          <label htmlFor="status">Status:</label>
          <select name="status" id="status">
            {statuses.map(status => <option value={status}>{status}</option>)}
          </select>
        </div>
        <div className="form-field">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}
