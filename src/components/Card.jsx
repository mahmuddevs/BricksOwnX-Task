import { FaBook, FaDollarSign, FaGraduationCap, FaStar } from "react-icons/fa6"
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"
import { PiCertificateFill } from "react-icons/pi"
import { Link } from "react-router-dom"

const Card = ({
    _id,
    averageRating,
    scholarshipName,
    universityName,
    universityImage,
    scholarshipCategory,
    location,
    applicationDeadline,
    subjectCategory,
    applicationFees,
    degree,
}) => {
    return (
        <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="relative">
                <img
                    src={universityImage || "/placeholder.svg?height=200&width=400"}
                    alt={`${universityName} logo`}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white font-semibold rounded-full px-2 py-1 text-sm flex items-center">
                    <FaStar className="mr-1 text-yellow-500" />
                    {averageRating}/5
                </div>
            </div>
            <div className="p-5 flex flex-col justify-between flex-grow">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{universityName}</h3>
                <h4 className="text-sm font-bold mb-3 text-gray-800">{scholarshipName}</h4>
                <div className="space-y-2 text-sm text-gray-600 mb-4 mt-auto">
                    <p className="flex items-center">
                        <FaGraduationCap className="mr-2 text-blue-600" />
                        <span>{scholarshipCategory}</span>
                    </p>
                    <p className="flex items-center">
                        <PiCertificateFill className="mr-2 text-blue-600" />
                        <span>{degree}</span>
                    </p>
                    <p className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-blue-600" />
                        <span>
                            {location?.city}, {location?.country}
                        </span>
                    </p>
                    <p className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-blue-600" />
                        <span>Deadline: {applicationDeadline}</span>
                    </p>
                    <p className="flex items-center">
                        <FaBook className="mr-2 text-blue-600" />
                        <span>Subjects: {subjectCategory}</span>
                    </p>
                    <p className="flex items-center">
                        <FaDollarSign className="mr-2 text-blue-600" />
                        <span>Fees: ${applicationFees}</span>
                    </p>
                </div>
                <Link
                    to={`/scholarship/${_id}`}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 transition-colors duration-300"
                >
                    View Details
                </Link>
            </div>
        </div>
    )
}

export default Card