import { useEffect, useState } from "react"

const Favourite = () => {
    const [favs, setFavs] = useState([])
    const [favProducts, setFavProducts] = useState([])

    const getFavs = () => {
        const favsStr = localStorage.getItem('favourites')
        const favs = JSON.parse(favsStr)
        setFavs(favs)
    }

    useEffect(() => {
        getFavs()
    }, [])
    return (
        <div>Favourite</div>
    )
}
export default Favourite