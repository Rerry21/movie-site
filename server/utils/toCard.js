export const toCard = (title) => ({
  id: title.id,
  type: title.type,
  title: title.title,
  poster: title.poster,
  year: title.year,
  rating: title.rating,
  genres: title.genres,
})