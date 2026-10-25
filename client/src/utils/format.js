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