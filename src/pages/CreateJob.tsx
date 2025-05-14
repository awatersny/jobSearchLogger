import { useEffect, useState } from 'react'
import { getAllCompanies } from '../services/jobSearchLoggerAPI'

export default function CreateJob() {
  const [companies, setCompanies] = useState([])
  const [skills, setSkills] = useState([])
  const [values, setValues] = useState([])
  const [message, setMessage] = useState("")
  const [isNewCompany, setIsNewCompany] = useState(true)
  const statuses = ["applied", "interviewing", "offered", "rejected"]
  
  useEffect(() => {
    getAllCompanies().then(res => setCompanies(res.data))
  }, [])

  const addAttr = evt => {
    evt.preventDefault()
    const field = evt.target.parentElement.childNodes[1]
    const attr = field.value
    field.value = ""
    if(field.name === "add-skill") {
      if(skills.indexOf(attr) < 0) {
        setSkills([...skills, attr])
      } else {
        setMessage("Skill already added!")
      }
    }
    if(field.name === "add-value") {
      if(values.indexOf(attr) < 0) {
        setValues([...values, attr])
      } else {
        setMessage("Skill already added!")
      }
    }
  }

  const addApplication = evt => {
    evt.preventDefault()
    console.log("Add Application")
  }

  const changeCompanyInput = evt => {
    evt.preventDefault()
    setIsNewCompany(!isNewCompany)
  }
  //TODO Add more conditional rendering for the rest of the company fields
  return (
    <>
      <h2>New Application</h2>
      <main>
        <form onSubmit={addApplication}>
          <h5 className="error-msg">{message}</h5>

          <div className='form-field'>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" name="title" required/>
          </div>
    
          <div className="form-field">
            <label htmlFor="company">Company: </label>
            {isNewCompany ? 
              <input type="text" name="company" id="company" /> :
              <select name="" id="">
                {companies.map(company => 
                  <option key={company._id} value={company}>
                    {company.name}
                  </option>
                )}
              </select>
            }
          </div>
          <div className="form-field">
            <label htmlFor="comp-descr">Company Description:</label>
            <textarea name="comp-descr" id="comp-descr" rows={4}></textarea>
          </div>
          <div className="form-field">
            <label htmlFor="add-value">Company Values:</label>
            <input type="text" name="add-value" id="add-value" />
            <button onClick={addAttr}>Add Value</button>
          </div>

          <div className="attr-container">
            {values.map(value => <div>{value}</div>)}
          </div>

          <div className="form-field">
            <label htmlFor="website">Website:</label>
            <input type="text" name="website" id="website" />
          </div>
          <button onClick={changeCompanyInput}>
            {isNewCompany ? "Use Existing Company" : "Add New Company"}
          </button>

          <div className='form-field'>
            <label htmlFor="description">Job Description:</label>
            <textarea name="description" id="description" rows={4} required/>
          </div>

          <div className="form-field">
            <label htmlFor="add-skill">Skills:</label>
            <input type="text" name="add-skill" id="add-skill" />
            <button onClick={addAttr}>Add Skill</button>
          </div>

          <div className="attr-container">
            {skills.map(skill => <div>{skill}</div>)}
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
      </main>
    </>
  )
}
