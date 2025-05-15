import { use, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const nav = useNavigate()
  // Default to the jobs index for now
  useEffect(() => {
    nav("/jobs")
  }, [])
  
  return (
    <>
      <h2>Dashboard</h2>
    </>
  )
}
