import axios from "axios";

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
