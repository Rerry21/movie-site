import { useCallback, useSyncExternalStore } from 'react'
import {
  subscribe,
  getSnapshot,
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist,
} from '../services/watchlist.js'

function useWatchlist() {
  const items = useSyncExternalStore(subscribe, getSnapshot)

  const has = useCallback((id) => items.some((entry) => entry.id === id), [items])

  const toggle = useCallback((title) => {
    if (isInWatchlist(title.id)) {
      removeFromWatchlist(title.id)
    } else {
      addToWatchlist(title)
    }
  }, [])

  return {
    items,
    has,
    toggle,
    add: addToWatchlist,
    remove: removeFromWatchlist,
    clear: clearWatchlist,
  }
}

export default useWatchlist