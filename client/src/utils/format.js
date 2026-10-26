export const formatRuntime = (minutes) => {
  if (typeof minutes !== 'number' || minutes <= 0) return null
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours === 0) return `${rest}m`
  return rest ? `${hours}h ${rest}m` : `${hours}h`
}

export const getHue = (id) => {
  const value = String(id)
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 360
  }
  return (hash * 137) % 360
}

export const formatDate = (value) => {
  if (!value) return null

  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return String(value)

  const date = new Date(
    Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  )
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}