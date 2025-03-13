import { createContext, useEffect, useState } from "react";

export const LcContext = createContext();

const LCProvider = ({ children }) => {
    const [fav, setFav] = useState([])

    const fetchFav = () => {
        const favsStr = localStorage.getItem("favourites")
        const favs = favsStr ? JSON.parse(favsStr) : []
        setFav(favs);
    };

    useEffect(() => {
        fetchFav();
    }, []);


    const addFav = (id) => {
        if (!fav.includes(id)) {
            const updatedFav = [...fav, id]
            setFav(updatedFav)
            localStorage.setItem("favourites", JSON.stringify(updatedFav))
        }
    };


    const value = {
        fav,
        setFav,
        addFav,
    };

    return (
        <LcContext.Provider value={value}>
            {children}
        </LcContext.Provider>
    );
};

export default LCProvider;