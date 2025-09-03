import { useEnrolledCourses } from "../Hooks/useEnrolledCourses";
import { useNavigate } from "react-router-dom";

/**
 * Component displaying enrolled courses in a table format.
 * Shows course details and provides access to course content.
 */
const EnrolledCoursesTable: React.FC = () => {
    const { enrolledCourses, loading, error } = useEnrolledCourses();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="flex items-centre justify-centre h-32" role="status" aria-label="Loading enrolled courses">
                <span className="sr-only">Loading...</span>
                <div className="text-gray-600">Loading your enrolled courses...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert" aria-live="polite">
                <div className="text-red-800">
                    <strong>Error:</strong> {error}
                </div>
            </div>
        );
    }

    if (!enrolledCourses || enrolledCourses.length === 0) {
        return (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-centre" role="status">
                <div className="text-blue-800">
                    <strong>No enrolled courses</strong>
                    <p className="mt-2 text-sm text-blue-600">
                        You haven't enrolled in any courses yet. Browse available courses above to get started!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <caption className="sr-only">Your enrolled courses with access options</caption>
                <thead className="bg-green-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course Code
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Difficulty
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {enrolledCourses.map((course, index) => (
                        <tr key={course.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            {/* Course Details */}
                            <td className="px-6 py-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{course.description}</p>
                                </div>
                            </td>
                            
                            {/* Course Code */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                                    {course.course_code}
                                </span>
                            </td>
                                                        
                            {/* Status - Placeholder for now */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                    Active
                                </span>
                            </td>
                            
                            {/* Action Button */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => {
                                        navigate(`/courses/${course.id}`);
                                    }}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colours"
                                    aria-label={`Go to ${course.title} course`}
                                >
                                    Go to Course
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnrolledCoursesTable;