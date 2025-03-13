import { FaHeart, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import Swal from "sweetalert2";

function ProductCard({ product }) {
    const handleAddToFavourite = (id) => {
        const lcData = localStorage.getItem("favourites");
        const data = JSON.parse(lcData);
        const exists = data.find((item) => item === id);
        if (exists) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Item is already added.",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        } else {
            data.push(id);
        }

        localStorage.setItem("favourites", JSON.stringify(data));
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added To Favourite",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    const discountedPrice = (
        product.price -
        (product.price * product.discountPercentage) / 100
    ).toFixed(2);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 flex items-center justify-center">
                <img
                    src={product.thumbnail || "https://via.placeholder.com/150"}
                    alt={product.title}
                    className="h-40 object-contain"
                />
            </div>
            <div className="p-5 flex flex-col flex-1"> {/* Make this a flex container and allow it to grow */}
                {/* Content above the bottom section */}
                <div className="flex-1"> {/* Allow this section to grow and take up available space */}
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="block text-lg leading-tight font-medium text-black">
                                {product.title}
                            </p>
                            <p className="text-sm text-gray-500">{product.brand}</p>
                        </div>
                        <div className="badge badge-accent">{product.availabilityStatus}</div>
                    </div>

                    <div className="mt-2 flex items-center">
                        <StarRating value={product.rating} size={16} />
                        <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                    </div>

                    <div className="mt-2 flex items-center">
                        <span className="text-xl font-bold text-primary">${discountedPrice}</span>
                        <span className="ml-2 text-sm line-through text-gray-500">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="ml-2 badge badge-secondary">
                            -{product.discountPercentage.toFixed(0)}%
                        </span>
                    </div>

                    <p className="mt-3 text-md text-gray-500 line-clamp-2">
                        {product.description}
                    </p>
                </div>

                {/* This div will stick to the bottom */}
                <div className="mt-auto"> {/* Use mt-auto to push this div to the bottom */}
                    <div className="mt-4 flex flex-wrap gap-1">
                        {product.tags.map((tag, index) => (
                            <span key={index} className="badge badge-outline">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="divider my-3 text-xs">Reviews</div>

                    <div className="space-y-2 max-h-32 overflow-y-auto">
                        {product.reviews.slice(0, 2).map((review, index) => (
                            <div key={index} className="bg-gray-50 p-2 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-xs">{review.reviewerName}</span>
                                    <StarRating value={review.rating} size={12} />
                                </div>
                                <p className="text-xs mt-1 text-gray-600">{review.comment}</p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            handleAddToFavourite(product.id);
                        }}
                        className="btn btn-primary btn-sm w-full"
                    >
                        <FaHeart className="mr-1" /> Add to Favourite
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;

const StarRating = ({ value, size = 24 }) => {
    const stars = [];
    const fullStars = Math.floor(value);
    const hasHalfStar = value - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<FaStar key={i} className={`text-yellow-400`} size={size} />);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(<FaStarHalfAlt key={i} className={`text-yellow-400`} size={size} />);
        } else {
            stars.push(<FaRegStar key={i} className={`text-yellow-400`} size={size} />);
        }
    }

    return <div className="flex">{stars}</div>;
};