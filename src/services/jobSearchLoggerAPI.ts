import axios from "axios";

const baseURL = "https://jobsearchloggerapi.onrender.com"
// const baseURL = "http://localhost:5050"


export async function getAllJobs() {
  const URL = `${baseURL}/jobs`
  const response = await axios.get(URL)
  return response
}

export async function getJob(id: string) {
  const URL = `${baseURL}/jobs/${id}`
  const response = await axios.get(URL)
  return response
}

export async function getAllCompanies() {
  const URL = `${baseURL}/companies`
  const response = await axios.get(URL)
  return response
}

export async function getCompany(id: string) {
  const URL = `${baseURL}/companies/${id}`
  const response = await axios.get(URL)
  return response
}

export async function loginUser(user: object) {
  const URL = `${baseURL}/auth/login`
  const response = await axios.post(URL, user)
  return response
}

export async function registerUser(user: object) {
  const URL = `${baseURL}/auth/register`
  const response = await axios.post(URL, user)
  return response
}

export async function addNewCompany(company: object) {
  const URL = `${baseURL}/companies`
  const response = await axios.post(URL, company)
  return response
}

export async function addNewJob(job: object) {
  const URL = `${baseURL}/jobs`
  const response = await axios.post(URL, job)
  return response
}

export async function editJob(id: string, job: object) {
  const URL = `${baseURL}/jobs/${id}`
  const response = await axios.put(URL, job)
  return response
}

export async function deleteJob(id: string) {
  const URL = `${baseURL}/jobs/${id}`
  const response = await axios.delete(URL)
  return response
}

export async function editCompany(id: string, company: object) {
  const URL = `${baseURL}/companies/${id}`
  const response = await axios.put(URL, company)
  return response
}

export async function deleteCompany(id: string) {
  const URL = `${baseURL}/companies/${id}`
  const response = await axios.delete(URL)
  return response
}

export async function addJobToCompany(jobId: string, companyId: string){
  const URL = `${baseURL}/companies/${companyId}`
  const response = await axios.patch(URL, {
    job: jobId
  })
  return response
}