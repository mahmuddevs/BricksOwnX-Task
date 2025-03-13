import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LcContext } from "../../contexts/LCProvider";

const Favourite = () => {
    const { fav, setFav } = useContext(LcContext)
    const [favProducts, setFavProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("https://dummyjson.com/products");
            const data = res.data.products;
            const favData = data.filter((item) => fav.includes(item.id));
            setFavProducts(favData);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleDelete = (id) => {
        const updatedFavs = fav.filter((favId) => favId !== id)
        localStorage.setItem("favourites", JSON.stringify(updatedFavs))
        setFav(updatedFavs)
        setFavProducts((prev) => prev.filter((product) => product.id !== id))
    };

    return (
        <div className="container mx-auto py-14 md:py-24">
            <h1 className="text-2xl font-bold mb-4">Favourite Products</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">Image</th>
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b hidden md:table-cell">Description</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {favProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            </td>
                            <td className="py-2 px-4 border-b">{product.title}</td>
                            <td className="py-2 px-4 border-b">${product.price}</td>
                            <td className="py-2 px-4 border-b hidden md:table-cell">{product.description}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Favourite;