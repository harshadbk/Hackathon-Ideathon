const KEY = 'rtia.requests'
export function loadRequests() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}
export function saveRequests(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)) } catch {}
}
