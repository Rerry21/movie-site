import { useCallback, useEffect, useState } from 'react'
import { apiGet } from '../services/api.js'

function useApi(path) {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState({
    data: null,
    loading: Boolean(path),
    error: null,
  })

  useEffect(() => {
    if (!path) {
      setState({ data: null, loading: false, error: null })
      return undefined
    }

    const controller = new AbortController()
    setState({ data: null, loading: true, error: null })

    apiGet(path, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return
        setState({ data, loading: false, error: null })
      })
      .catch((error) => {
        if (controller.signal.aborted) return
        setState({ data: null, loading: false, error })
      })

    return () => controller.abort()
  }, [path, attempt])

  const reload = useCallback(() => setAttempt((count) => count + 1), [])

  return { ...state, reload }
}

export default useApi