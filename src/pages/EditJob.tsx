import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editJob, getAllCompanies, getCompany, getJob } from '../services/jobSearchLoggerAPI'
import { Link } from 'react-router-dom'
import Company from './Company'

export default function CreateJob() {
  const [companies, setCompanies] = useState([])
  const [job, setJob] = useState({})
  const [company, setCompany] = useState({})
  const [skills, setSkills] = useState([])
  const [values, setValues] = useState([])
  const [message, setMessage] = useState("")
  const { id } = useParams()
  const statuses = ["applied", "interviewing", "offered", "rejected"]
  const nav = useNavigate()
  
  useEffect(() => {
    getAllCompanies().then(res => setCompanies(res.data))
  }, [])

  useEffect(() => {
    getJob(id)
      .then(res => {
        setJob(res.data)
        setSkills(res.data.skills)
        getCompany(res.data.company)
          .then(res => {
            setCompany(res.data)
          })
      })
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

  const removeSkill = evt => {
    evt.preventDefault()
    const currSkills = [...skills]
    const currSkill = evt.target.parentElement.childNodes[0].childNodes[0].textContent
    const currDex = skills.indexOf(currSkill)
    currSkills.splice(currDex, 1)
    setSkills(currSkills)
  }

  //Form Submission
  const saveChanges = evt => {
    evt.preventDefault()
    const jobData = {
      title: evt.target.title.value,
      description: evt.target.description.value,
      skills: skills,
      status: evt.target.status.value,
    }
    editJob(id, jobData).then(res => {
      nav(-1)
    })
  }

  return (
    <>
      <h2>Update Application</h2>
      <main>
        <form onSubmit={saveChanges}>
          <div className='back'>
            <Link to="/jobs">Back</Link>
          </div>
          <h5 className="error-msg">{message}</h5>

          <div className='form-field'>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" name="title" defaultValue={job.title} required/>
          </div>

            {company ? 
              <Company 
                showDetails={true} 
                id = {company._id}
              />
            : <></>}
          
          <div className='form-field'>
            <label htmlFor="description">Job Description:</label>
            <textarea 
              name="description" 
              id="description" 
              rows={4} 
              required
              defaultValue={job.description}
            />
          </div>

          <div className="form-field">
            <label htmlFor="add-skill">Add Skill:</label>
            <input type="text" name="add-skill" id="add-skill" />
            <button onClick={addAttr}>+</button>
          </div>

          <div className="attr-container">
              {skills.map(skill => 
              <div className='attr'>
                <span className='attr-name'>{skill}</span>
                <span onClick={removeSkill} className="delete">X</span>
              </div>)}
            </div>

          <div className='form-field'>
            <label htmlFor="status">Status: {job.status}</label>
            <select 
              name="status" 
              id="status" 
            >
              {statuses.map(status => 
                <option value={status}>{status}</option>
              )}
            </select>
          </div>
          <button type="submit">Update</button>
        </form>
      </main>
    </>
  )
}
