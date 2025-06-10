import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default api

// Alerts
export const getAlerts = () => api.get('/api/alerts').then((res) => res.data)

export const postAlert = (data: Record<string, unknown>) =>
  api.post('/api/alerts', data).then((res) => res.data)

export const patchAlert = (id: string, data: Record<string, unknown>) =>
  api.patch(`/api/alerts/${id}`, data).then((res) => res.data)

// Prices
export const getPrice = (token: string) =>
  api.get(`/api/prices?token=${token}`).then((res) => res.data)

// Whale tracking
export const getWhales = () => api.get('/api/whales').then((res) => res.data)

export const getTrackedWhales = () =>
  api.get('/api/whales/tracked').then((res) => res.data)

export const postTrackedWhale = (address: string) =>
  api.post('/api/whales/tracked', { address }).then((res) => res.data)

export const getWhaleAlerts = () =>
  api.get('/api/whales/alerts').then((res) => res.data)

export const postWhaleAlert = (alert: Record<string, unknown>) =>
  api.post('/api/whales/alerts', alert).then((res) => res.data)

// Sniping
export const getSnipingRules = () =>
  api.get('/api/sniping/rules').then((res) => res.data)

export const postSnipingRule = (rule: Record<string, unknown>) =>
  api.post('/api/sniping/rules', rule).then((res) => res.data)

export const getSnipes = () =>
  api.get('/api/sniping/snipes').then((res) => res.data)

export const postSnipe = (snipe: Record<string, unknown>) =>
  api.post('/api/sniping/snipes', snipe).then((res) => res.data)

// Security
export const getSecurity = (token: string) =>
  api.get(`/api/security?token=${token}`).then((res) => res.data)
