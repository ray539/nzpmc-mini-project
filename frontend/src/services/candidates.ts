import axios from 'axios'
import { Candidate, CandidateNoId } from '../interfaces'
const baseUrl = '/people'

function getAllCandidates() {
  return axios.get(`${baseUrl}`).then(res => res.data as Candidate[])
}

function postNewCandidate(newCandidate: CandidateNoId) {
  return axios.post(baseUrl, newCandidate).then(res => res.data as Candidate)
}

export default {getAllCandidates, postNewCandidate}