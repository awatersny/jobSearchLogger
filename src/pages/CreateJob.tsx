import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCompanies, addNewCompany, addNewJob } from '../services/jobSearchLoggerAPI'
import Company from './Company'

export default function CreateJob() {
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState({})
  const [skills, setSkills] = useState([])
  const [values, setValues] = useState([])
  const [message, setMessage] = useState("")
  const [isNewCompany, setIsNewCompany] = useState(true)
  const statuses = ["applied", "interviewing", "offered", "rejected"]
  const nav = useNavigate()
  
  useEffect(() => {
    getAllCompanies().then(res => setCompanies(res.data))
  }, [])

  const addAttr = evt => {
    evt.preventDefault()
    const field = evt.target.parentElement.childNodes[1]
    const attr = field.value
    const name = field.name.slice(4)
    if(!attr.length) {
      setMessage(`The ${name} field must not be empty when adding a ${name}`)
      return
    }
    field.value = ""
    if(field.name === "add-skill") {
      if(skills.indexOf(attr) < 0) {
        setSkills([...skills, attr])
      } else {
        setMessage(`The ${name} "${attr}" has already been added!`)
      }
    }
    if(field.name === "add-value") {
      if(values.indexOf(attr) < 0) {
        setValues([...values, attr])
      } else {
        setMessage(`The ${name} "${attr}" has already been added!`)
      }
    }
  }

  const showSelectedCompany = evt => {
    evt.preventDefault()
    const companyData = JSON.parse(evt.target.value)
    setCompany(companyData)
  }
  
  const changeCompanyInput = evt => {
    evt.preventDefault()
    setIsNewCompany(!isNewCompany)
  }

  const addApplication = evt => {
    evt.preventDefault()
    const jobData = {
      title: evt.target.title.value,
      description: evt.target.description.value,
      skills: skills,
      website: evt.target.website.value
    }
    if(isNewCompany) {
      const companyData = {
        name: evt.target.company.value,
        description: evt.target.compDescr.value,
        values: values,
        website: evt.target.website.value
      }
      console.log(companyData)
    } else {
      console.log(company)
    }
    console.log(jobData)
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
              <select 
                onChange={showSelectedCompany} 
                name="company" 
                id="company"
              >
                {companies.map((company, idx) => 
                  <option 
                    key={company._id} 
                    value={JSON.stringify(company)} 
                    
                  >
                    {company.name}
                  </option>
                )}
              </select>
            }
          </div>
          {isNewCompany ? 
            <>
              <div className="form-field">
                <label htmlFor="compDescr">Company Description:</label>
                <textarea name="compDescr" id="comp-descr" rows={4}></textarea>
              </div>
              <div className="form-field">
                <label htmlFor="add-value">Company Values:</label>
                <input type="text" name="add-value" id="add-value" />
                <button onClick={addAttr}>Add Value</button>
              </div>
              <div className="attr-container">
                {values.map(value => <div className='attr'>{value}</div>)}
              </div>
              <div className="form-field">
                <label htmlFor="website">Website:</label>
                <input type="text" name="website" id="website" />
              </div>
            </>
          : 
            company._id ?
            <Company
              name = {company.name}
              description = {company.description}
              values = {company.values}
              website = {company.website}
            /> : <></>
          }


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
            {skills.map(skill => <div className='attr'>{skill}</div>)}
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
