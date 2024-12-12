import {useEffect, useState} from "react"

const UseMediaQuery = (query) => {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia(query)
        setMatches(mediaQuery.matches)

        const handler = () => setMatches(mediaQuery.matches)
        mediaQuery.addEventListener("change", handler)

        return () => mediaQuery.removeEventListener("change", handler)
    }, [query])

    return matches
}

export default UseMediaQuery