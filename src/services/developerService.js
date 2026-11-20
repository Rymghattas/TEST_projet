import { apiRequest } from './api'

export const searchDevelopers = (keyword) =>
  apiRequest(`/developers?keyword=${encodeURIComponent(keyword)}`)
