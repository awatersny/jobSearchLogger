import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCompanies, addNewCompany, addNewJob, getCompany } from '../services/jobSearchLoggerAPI'
import Company from './Company'

export default function CreateJob() {
  const [companies, setCompanies] = useState([])
  const [companyJobs, setCompanyJobs] = useState([])
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

  useEffect(() => {
    setCompany(companies[0])
  }, [companies])

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

  const removeAttr = evt => {
    evt.preventDefault()
    const attrType = evt.target.parentElement.parentElement.parentElement.id
    if(attrType === "skills"){
      const currSkills = [...skills]
      const currSkill = evt.target.parentElement.childNodes[0].childNodes[0].textContent
      const currDex = skills.indexOf(currSkill)
      currSkills.splice(currDex, 1)
      setSkills(currSkills)
    }if(attrType === "values"){
      const currValues = [...values]
      const currValue = evt.target.parentElement.childNodes[0].childNodes[0].textContent
      const currDex = values.indexOf(currValue)
      currValues.splice(currDex, 1)
      setValues(currValues)
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

  //Form Submission
  const addApplication = evt => {
    evt.preventDefault()
    const jobData = {
      title: evt.target.title.value,
      description: evt.target.description.value,
      skills: skills,
      status: evt.target.status.value,
      company: null
    }
    if(isNewCompany) {
      const companyData = {
        name: evt.target.company.value,
        description: evt.target.compDescr.value,
        values: values,
        website: evt.target.website.value
      }
      addNewCompany(companyData).then(res => {
        if(res.data.msg) {
          setMessage(res.data.msg)
        } else {
          getAllCompanies().then(res => {
            jobData.company = res.data.find(company => company.name == companyData.name)._id
            addNewJob(jobData).then(res => {
              if(res.data.msg) {
                setMessage(res.data.msg)
              } else {
                nav('/jobs')
              }
            })
          })
        }
      })
    } else {
      if(company._id) {
        jobData.company = company._id
        addNewJob(jobData).then(res => {
          if(res.data.msg) {
            setMessage(res.data.msg)
          } else {
            nav('/jobs')
          }
        })
      } else {
        setMessage("Please select a company.")
      }
    }
  }

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
                {companies.map(company => (
                    <option key={company._id} value={JSON.stringify(company)}>
                      {company.name}
                    </option>
                  )
                )}
              </select>
            }
          {companies.length ?
            <div className='button' onClick={changeCompanyInput}>
              {isNewCompany ? "Use Existing Company" : "Add New Company"}
            </div>
          : <></>}
          </div>

          {isNewCompany ? 
            <>
              <div className="form-field">
                <label htmlFor="compDescr">Company Description:</label>
                <textarea name="compDescr" id="comp-descr" rows={4}></textarea>
              </div>

              <div className="attr-field" id="values">
                <div className="form-field">
                  <label htmlFor="add-value">Company Values:</label>
                  <input type="text" name="add-value" id="add-value" />
                  <div className='button' onClick={addAttr}>+</div>
                </div>
                <div className="attr-container">
                  {values.map(value => 
                  <div className='attr'>
                    <span className='attr-name'>{value}</span>
                    <button onClick={removeAttr} className="delete">X</button>
                  </div>)}
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="website">Website:</label>
                <input type="text" name="website" id="website" />
              </div>
            </>
          : 
            company._id ?
            <Company
              showDetails={true}
              id = {company._id}
            /> : <></>
          }

          <div className='form-field'>
            <label htmlFor="description">Job Description:</label>
            <textarea name="description" id="description" rows={4} required/>
          </div>

          <div className="attr-field" id="skills">
            <div className="form-field">
              <label htmlFor="add-skill">Add Skill:</label>
              <input type="text" name="add-skill" id="add-skill" />
              <div className='button' onClick={addAttr}>+</div>
            </div>
            <div className="attr-container">
              {skills.map(skill => 
              <div className='attr'>
                <span className='attr-name'>{skill}</span>
                <button onClick={removeAttr} className="delete">X</button>
              </div>)}
            </div>
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
