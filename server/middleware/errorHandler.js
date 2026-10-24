export const notFound = (req, res) => {
  res.status(404).json({ error: 'Route not found' })
}

export const errorHandler = (err, req, res, next) => {
  const known = Number.isInteger(err.status)
  const status = known ? err.status : 500

  if (!known) console.error(err)

  res.status(status).json({
    error: known ? err.message : 'Internal server error',
  })
}