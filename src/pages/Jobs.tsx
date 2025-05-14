import React from 'react'
import { getAllJobs } from '../services/jobSearchLoggerAPI'
import { useState, useEffect } from 'react'
import Job from './Job'

export default function Jobs() {

  const[jobs, setJobs] = useState([])

  useEffect(()=>{
    getAllJobs().then(res => setJobs(res.data))
  }, [])

  return (
    <>
      <h2>Previous Applications</h2>
      <main>
        <ul>
          {jobs.map((job) => <li>
            <Job
              key={job.id}
              title={job.title}
              description={job.description}
              skills={job.skills}
              status={job.status}
              company={job.company}
            />
          </li>)}
        </ul>
      </main>
    </>
  )
}
