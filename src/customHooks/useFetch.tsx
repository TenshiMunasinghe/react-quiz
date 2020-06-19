import { useState, useEffect } from 'react'

export const useFetch = (url: string) => {
  const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await fetch(url)
        const json = await res.json()
        setState(json)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { state, loading, setState }
}
