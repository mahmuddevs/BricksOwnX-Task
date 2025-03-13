import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Card from "../../components/Card";
import { FaTimes } from "react-icons/fa";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const searchRef = useRef();
    const [query, setQuery] = useState('');


    const fetchProducts = () => {
        axios.get('https://dummyjson.com/products')
            .then((res) => {
                setProducts(res.data.products);
                setSortedProducts(res.data.products);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        setSortedProducts(products);
    }, [products]);


    const handleSearch = (e) => {
        console.log(e + "ss")
        setQuery(e.target.value);
    };

    const handleReset = () => {
        setQuery('');
        searchRef.current.value = '';
        setSortedProducts(products);
    };

    const handleSort = (e) => {
        console.log(e + "sort")
        const sortValue = parseInt(e.target.value);

        if (sortValue === 0) {
            setSortedProducts(products);
            return;
        }

        const sortedData = [...products].sort((a, b) => {
            if (sortValue === -1) {
                return a.price - b.price;
            } else if (sortValue === 1) {
                return b.price - a.price;
            }
            return;
        });

        setSortedProducts(sortedData);
    };

    useEffect(() => {
        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
        setSortedProducts(filteredProducts);
    }, [query, products]);

    return (
        <>
            <Helmet>
                <title>Home - Test Website</title>
            </Helmet>
            <section className="container mx-auto px-4 py-14 md:py-24">
                <h1 className="text-3xl font-bold text-center mb-10">Products</h1>
                <div className="flex justify-end gap-4 mb-8">
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input ref={searchRef} onChange={handleSearch} type="search" required placeholder="Search" />
                        <FaTimes className="cursor-pointer" onClick={handleReset} />
                    </label>
                    <select onChange={handleSort} defaultValue={0} className="select w-44">
                        <option value={0}>Sort By Price</option>
                        <option value={-1}>L - H</option>
                        <option value={1}>H - L</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((item) => (
                        <Card key={item?.id} product={item} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Home;