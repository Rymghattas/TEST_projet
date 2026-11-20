import { apiRequest } from './api'

// À utiliser quand les endpoints Spring Boot seront prêts.
export const getPublishedOffers = () => apiRequest('/offers')
export const searchOffers = (params) => apiRequest(`/offers?${new URLSearchParams(params)}`)
export const getOfferById = (id) => apiRequest(`/offers/${id}`)
