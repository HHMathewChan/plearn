import { useParams, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import CourseContentTable from "../Components/CourseContentTable";
import { useCourses } from "../Hooks/useCourses";
import { PlatformUserRepository } from '../Repositories/PlatformUserRepository';

/**
 * Page component for displaying course content.
 * Shows detailed course content in a table format with access controls.
 */
const CourseContentPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const { courses } = useCourses();
    const [courseTitle, setCourseTitle] = useState<string>("");
    const studentCode = PlatformUserRepository.getStudentCode();

    useEffect(() => {
        if (!courseId) {
            navigate('/courses');
            return;
        }

        // Find the course title from the courses data
        const course = courses.find(c => c.id === courseId);
        if (course) {
            setCourseTitle(course.title);
        }
    }, [courseId, courses, navigate]);

    if (!courseId) {
        return null;
    }

    if (!studentCode) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
                <div className="text-red-800">
                    <strong>Error:</strong> Student information is missing. Please log in again.
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header Section */}
            <div className="mb-6">
                <button
                    onClick={() => navigate('/courses')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-flex items-centre"
                >
                    ← Back to Courses
                </button>
                <h1 className="text-3xl font-bold text-gray-900">
                    {courseTitle || 'Course Content'}
                </h1>
                <p className="mt-2 text-gray-600">
                    Access your course materials and track your progress
                </p>
            </div>

            {/* Course Content Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Materials</h2>
                <CourseContentTable courseId={courseId} courseTitle={courseTitle} studentCode={studentCode} />
            </div>

            {/* Final quiz button */}
            <div className="mt-6">
                <button
                    onClick={() => navigate(`/final-quiz/${courseId}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    aria-label={`Take final quiz for ${courseTitle}`}
                >
                    Take Final Quiz
                </button>                
            </div>
        </div>
    );
};

export default CourseContentPage;