import React from 'react'

export default function Company({ name, description, values, website }) {
  return (
    <>
      <div><b>Company: </b>{name}</div>
      <div><b>Description: </b>{description}</div>
      <div><u><b>Values</b></u></div>
      {values.length ? values.map(value => <div>
        {value}
      </div>) : <div>None Recorded</div>}
      <div><b>Website: </b>{website}</div>
    </>
  )
}
