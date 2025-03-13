import { useState } from "react";
import useScholarships from "../../hooks/useScholarships"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Spinner from "../../components/Spinner";
import Card from "../../components/Card";
import { FaSearch } from "react-icons/fa";

const ShowAll = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [scolarshipData, totalPages, isLoading, refetch] = useScholarships(currentPage, searchQuery)
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        e.preventDefault()
        const search = e.target.search.value
        setCurrentPage(1)
        setSearchQuery(search)
        refetch()
    }

    return (
        <>
            <section className="w-11/12 md:container xl:w-9/12 mx-auto my-16">
                <form onSubmit={handleSearch}>
                    <label className="input input-bordered flex items-center gap-2 ms-auto max-w-xs">
                        <input type="text" className="grow" placeholder="Search" name="search" />
                        <button type="submit"><FaSearch className="cursor-pointer" /></button>
                    </label>
                </form>
            </section>
            <section className="w-11/12 md:container xl:w-9/12 mx-auto">
                {isLoading && <Spinner />}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 w-full mx-auto gap-6">
                    {
                        scolarshipData?.map((scholarship) => {
                            return <Card key={scholarship._id} {...scholarship} />
                        })
                    }
                </div>
            </section>
            <section className="flex justify-center items-center mt-8 mb-16">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`btn btn-sm text-white bg-brand-primary hover:bg-brand-secondary ${currentPage === 1 ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="join space-x-1">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`join-item btn btn-sm ${currentPage === index + 1 ? 'btn-active bg-brand-primary hover:bg-brand-secondary text-white' : 'btn-outline'}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`btn btn-sm text-white bg-brand-primary hover:bg-brand-secondary ${currentPage === totalPages ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </section>
        </>
    )
}

export default ShowAll