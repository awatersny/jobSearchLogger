import React from 'react'

export default function Job({ title, description, skills, status }) {
  return (
    <>
      <div><b>Title: </b>{title}</div>
      <div><b>Description: </b>{description}</div>
      <div>
      <u><b>Skills</b></u>
        {skills.map(skill => <div>{skill}</div>)}
      </div>
      <div><b>Status: </b>{status}</div>
      <br />
    </>
  )
}
