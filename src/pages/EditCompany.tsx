import { useEffect, useState } from "react"
import { editCompany, getAllCompanies, getCompany } from "../services/jobSearchLoggerAPI"
import { useNavigate, useParams } from "react-router-dom"

export default function EditCompany() {
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState({})
  const [message, setMessage] = useState("")
  const [values, setValues] = useState([])
  const { id } = useParams()
  const nav = useNavigate()
  const validateURL = /^http[s]?:\/\/(www.)?\w+\.[a-z]+[.\w{2,3}]+\/?$/

  useEffect(() => {
    getCompany(id).then(res => {
      setCompany(res.data)
      setValues(res.data.values)
    })
  }, [])

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

  const removeValue = evt => {
    evt.preventDefault()
    const currValues = [...values]
    const currValue = evt.target.parentElement.childNodes[0].childNodes[0].textContent
    const currDex = values.indexOf(currValue)
    currValues.splice(currDex, 1)
    setValues(currValues)
  }

  const saveChanges = evt => {
    evt.preventDefault()
    if(!validateURL.test(evt.target.website.value)){
      setMessage(`Please set a valid URL.  Example:"https://www.google.com"`)
      return
    } else {
      setMessage("")
    }
    const companyData = {
      name: company.name,
      description: evt.target.description.value,
      values: values,
      website: evt.target.website.value
    }
    editCompany(id, companyData).then(res => {
      console.log(res.data)
      nav(-1)
    })
  }

  return (
    <>
    <h2>Edit Company</h2>
    <main>
      <form onSubmit={saveChanges}>
        <div className='back'>
          <div onClick={evt => {nav(-1)}}>Back</div>
        </div>
        <h4 className="error-msg">{message}</h4>
        <h2>
          {
            company.name ?
          `${company.name[0].toUpperCase()}${company.name.slice(1).toLowerCase()}`
          : "Loading..."
          }
        </h2>
        <div className="form-field">
          <label htmlFor="description">Description:</label>
          <textarea 
              name="description" 
              id="description" 
              rows={4}
              defaultValue={company.description} 
              required
            />
        </div>

        <div className="form-field">
          <label htmlFor="add-value">Add Value:</label>
          <input type="text" name="add-value" id="add-value" />
          <div onClick={addAttr} className='button' >+</div>
        </div>
        <div className="attr-container">
          {values.map(value => 
          <div className='attr'>
            <span className='attr-name'>{value}</span>
            <span onClick={removeValue} className="delete">X</span>
          </div>)}
        </div>

        <div className="form-field">
          <label htmlFor="website">Website:</label>
          <input 
            type="text" 
            name="website" 
            id="website" 
            placeholder='example: https://www.google.com'
            defaultValue={company.website}
          />
        </div>
        <button>Update</button>
      </form>
    </main>
    </>
  )
}
