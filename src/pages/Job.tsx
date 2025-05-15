import { Link } from "react-router-dom"
import Company from "./Company"
import { deleteJob, getAllJobs } from "../services/jobSearchLoggerAPI"

export default function Job({ id, title, description, skills, status, company, setJobs }) {
  const deleteApplication = evt => {
    evt.preventDefault()
    console.log(1)
    deleteJob(id).then(res => {
      getAllJobs().then(res => setJobs(res.data))
    })
  }

  return (
    <div className='info'>
      <div><b>Title: </b>{title}</div>
      {company ? <div>
        <Company showDetails={false} id={company}/>
      </div> : <></>}
      <div><b>Description: </b>{description}</div>
      <div>
      <u><b>Skills</b></u>
        {skills.map(skill => <div>{skill}</div>)}
      </div>
      <div><b>Status: </b>{status}</div>
      <br />
      <div className="menu">
        <Link to = {`/jobs/${id}/edit`}>Edit</Link>
        <button onClick={deleteApplication} className="delete">X</button>
      </div>
    </div>
  )
}
