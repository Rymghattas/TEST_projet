import { apiRequest } from './api'

export const getMyOrganization = () => apiRequest('/organizations/me')

export const updateMyOrganization = organizationData =>
  apiRequest('/organizations/me', {
    method: 'PUT',
    body: JSON.stringify(organizationData),
  })

export const createOrganization = organizationData =>
  apiRequest('/auth/register/organization', {
    method: 'POST',
    body: JSON.stringify(organizationData),
  })
