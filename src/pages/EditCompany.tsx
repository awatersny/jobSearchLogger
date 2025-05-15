import { useEffect, useState } from "react"
import { getCompany } from "../services/jobSearchLoggerAPI"
import { useParams } from "react-router-dom"

export default function EditCompany() {
  const [company, setCompany] = useState({})
  const [message, setMessage] = useState("")
  const [values, setValues] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getCompany(id).then(res => {
      setCompany(res.data)
      setValues(res.data.values)
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

  const removeValue = evt => {
    evt.preventDefault()
    const currValues = [...values]
    const currValue = evt.target.parentElement.childNodes[0].childNodes[0].textContent
    const currDex = values.indexOf(currValue)
    currValues.splice(currDex, 1)
    setValues(currValues)
  }

  return (
    <>
    <h2>EditCompany</h2>
    <main>
      <form>
        <h5 className="error-msg">{message}</h5>
        <div className="form-field">
          <label htmlFor="name">Company:</label>
          <input type="text" name="name" id="name" defaultValue={company.name}/>
        </div>
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
          <label htmlFor="add-value">Company Values:</label>
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
            defaultValue={company.website}
          />
        </div>
        <button>Update</button>
      </form>
    </main>
    </>
  )
}
