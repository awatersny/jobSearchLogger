import { getCompany } from "../services/jobSearchLoggerAPI"
import { useEffect, useState } from "react"

export default function Company({ showDetails, id }) {
  const [company, setCompany] = useState({})

  useEffect(() => {
    getCompany(id).then(res => setCompany(res.data))
  }, [id])

  return (
    <div className={showDetails ? "info" : "form-field"}>
      <div className="info-field"><b>Company: </b>{company.name}</div>
      {showDetails ? <>
      <div className="info-field"><b>Description: </b>{company.description}</div>
      <div ><u><b>Values</b></u></div>
      {company.values ? company.values.length ? company.values.map(value => <div>
        {value}
      </div>) : <div>None Recorded</div> : <div>Loading...</div>}
      <div className="info-field"><b>Website: </b>{company.website}</div>
      </> : <></>}
    </div>
  )
}
