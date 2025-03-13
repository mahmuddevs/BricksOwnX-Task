import { createContext, useEffect, useState } from "react";

export const LcContext = createContext()

const LCProvider = ({ children }) => {
    const [fav, setFav] = useState([])
    const fetchFav = () => {
        const favsStr = localStorage.getItem('favourites')
        const favs = JSON.parse(favsStr)
        setFav(favs)
    }

    useEffect(() => {
        fetchFav()
    }, [])

    const addFav = (id) => {
        setFav([...fav, id])
        const data = JSON.stringify(fav)
        localStorage.setItem('favourites', data)
    }


    const value = {
        fav,
        setFav,
        addFav
    }

    return (
        <LcContext.Provider value={value}>
            {children}
        </LcContext.Provider>
    )
}
export default LCProvider