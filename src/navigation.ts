export function appPath(path: string) {
  const clean = path.startsWith('/') ? path : '/' + path
  return '#/app' + clean
}

export function go(path: string) {
  window.location.hash = appPath(path).slice(1)
}

export function goDesignBoard() {
  window.location.hash = '/design'
}

export function goBack(fallback = '/home') {
  if (window.history.length > 1) window.history.back()
  else go(fallback)
}

export function normalizeRoute(hash: string) {
  const raw = hash.replace(/^#/, '') || '/design'
  if (raw === '/app' || raw === '/app/') return '/home'
  return raw.startsWith('/app/') ? raw.slice(4) : raw
}

export function isPrototypeRoute(hash: string) {
  return hash.replace(/^#/, '').startsWith('/app')
}
