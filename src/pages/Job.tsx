import Company from "./Company"

export default function Job({ title, description, skills, status, company }) {
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
    </div>
  )
}
