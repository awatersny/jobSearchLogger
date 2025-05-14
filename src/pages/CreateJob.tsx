import { useEffect, useState } from 'react'
import { getAllCompanies } from '../services/jobSearchLoggerAPI'

export default function CreateJob() {
  const [companies, setCompanies] = useState([])
  const [skills, setSkills] = useState([])
  const [message, setMessage] = useState("")
  const [isNewCompany, setIsNewCompany] = useState(true)
  const statuses = ["applied", "interviewing", "offered", "rejected"]
  
  useEffect(() => {
    getAllCompanies().then(res => setCompanies(res.data))
  }, [])

  const addSkill = evt => {
    evt.preventDefault()
    const field = evt.target.parentElement.childNodes[1]
    const skill = field.value
    field.value = ""
    if(skills.indexOf(skill) < 0) {
      setSkills([...skills, skill])
    } else {
      setMessage("Skill already added!")
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
          <button onClick={changeCompanyInput}>
            {isNewCompany ? "Use Existing Company" : "Add New Company"}
          </button>

          <div className='form-field'>
            <label htmlFor="description">Description: </label>
            <textarea name="description" id="description" rows={4} cols={50} required/>
          </div>

          <div className="form-field">
            <label htmlFor="add-skill">Skill:</label>
            <input type="text" name="add-skill" id="add-skill" />
            <button onClick={addSkill}>Add Skill</button>
          </div>


          <div id="skills">
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
