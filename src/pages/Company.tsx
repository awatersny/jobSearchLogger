import { getCompany } from "../services/jobSearchLoggerAPI"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Company({ showDetails, id }) {
  const [company, setCompany] = useState({})

  useEffect(() => {
    getCompany(id).then(res => setCompany(res.data))
  }, [id])

  return (
    <div className={showDetails ? "info" : "form-field"}>
      <div className="info-field">
        <b>Company: </b>
        {company.name ?
        `${company.name[0].toUpperCase()}${company.name.slice(1)}`
        : "Loading..."}
      </div>
      {showDetails ? <>
      <div className="info-field"><b>Description: </b>{company.description}</div>
      <div ><u><b>Values</b></u></div>
      <div className="attr-container">
      {company.values ? company.values.length ? company.values.map(value => 
        <div className="attr">
          {value}
        </div>)
      : <div>None Recorded</div> : <div>Loading...</div>}
      </div>
      <div className="website-field"><b><u>Website</u></b>
        <a href={company.website} target="_blank">{company.website}</a>
      </div>
      <div className="menu">
        <Link to = {`/companies/${id}/edit`}>Edit</Link>
      </div>
      </> : <></>}
    </div>
  )
}
