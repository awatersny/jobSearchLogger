import axios from "axios";

// const baseURL = "https://jobsearchloggerapi.onrender.com"
const baseURL = "http://localhost:5050"


export async function getAllJobs() {
  const URL = `${baseURL}/jobs`
  const response = await axios.get(URL)
  return response
}

export async function getJob(id) {
  const URL = `${baseURL}/jobs/${id}`
  const response = await axios.get(URL)
  return response
}

export async function getAllCompanies() {
  const URL = `${baseURL}/companies`
  const response = await axios.get(URL)
  return response
}

export async function getCompany(id) {
  const URL = `${baseURL}/companies/${id}`
  const response = await axios.get(URL)
  return response
}

export async function loginUser(user) {
  const URL = `${baseURL}/auth/login`
  const response = await axios.post(URL, user)
  return response
}

export async function registerUser(user) {
  const URL = `${baseURL}/auth/register`
  const response = await axios.post(URL, user)
  return response
}

export async function addNewCompany(company) {
  const URL = `${baseURL}/companies`
  const response = await axios.post(URL, company)
  return response
}

export async function addNewJob(job) {
  const URL = `${baseURL}/jobs`
  const response = await axios.post(URL, job)
  return response
}

export async function editJob(id) {
  const URL = `${baseURL}/jobs/${id}`
  const response = await axios.put(URL)
  return response
}

export async function deleteJob(id) {
  const URL = `${baseURL}/jobs/${id}`
  const response = await axios.delete(URL)
  return response
}

export async function editCompany(id) {
  const URL = `${baseURL}/companies/${id}`
  const response = await axios.put(URL)
  return response
}

export async function deleteCompany(id) {
  const URL = `${baseURL}/companies/${id}`
  const response = await axios.delete(URL)
  return response
}