import { useEffect, useState } from 'react'
import { getAllCompanies } from '../services/jobSearchLoggerAPI'
import Company from './Company'

export default function Companies() {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    getAllCompanies().then(res => setCompanies(res.data))
  }, [])

  return (
    <>
      <h2>Companies</h2>
      {companies.map(company => <div>
        <Company
          name = {company.name}
          description = {company.description}
          values = {company.values}
          website = {company.website}
        />
        <br />
      </div>)}
    </>
  )
}
