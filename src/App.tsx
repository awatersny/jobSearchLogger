import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Companies from './pages/Companies'
import Jobs from './pages/Jobs'
import NavBar from './components/NavBar'
import './App.css'
import Job from './pages/Job'
import Company from './pages/Company'
import EditJob from './pages/EditJob'
import EditCompany from './pages/EditCompany'
import CreateJob from './pages/CreateJob'
// import Register from './pages/Register'
// import Login from './pages/Login'

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        {/* <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/> */}
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/companies" element={<Companies/>}/>
        <Route path="/companies/:id" element={<Company/>}/>
        <Route path="/companies/:id/edit" element={<EditCompany/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/jobs/new" element={<CreateJob/>}/>
        <Route path="/jobs/:id" element={<Job/>}/>
        <Route path="/jobs/:id/edit" element={<EditJob/>}/>
      </Routes>
    </>
  )
}

export default App
