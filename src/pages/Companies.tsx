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
      <h2>Companies You've Applied To</h2>
      <main>
        {
          companies.length ? 
          companies.map(company => 
            <Company
              key = {company._id}
              showDetails={true}
              id = {company._id}
            />
          ) :
          <div className='info'>
            No companies to show
          </div>
        }
      </main>
    </>
  )
}
