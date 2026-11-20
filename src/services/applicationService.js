import { apiRequest } from './api'

export const submitApplication = (offerId) =>
  apiRequest(`/applications`, { method: 'POST', body: JSON.stringify({ offerId }) })

export const updateApplicationStatus = (id, status) =>
  apiRequest(`/applications/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
