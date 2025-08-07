import React from "react";
import { useCourseContent } from "../Hooks/useCourseContent";

type CourseContentTableProps = {
    courseId: string;
    courseTitle: string;
}

const CourseContentTable: React.FC<CourseContentTableProps> = ({ courseId, courseTitle }) => {
    const { courseContent, loading, error } = useCourseContent(courseId);

    if (loading) {
        return (
            <div className="flex items-centre justify-centre h-32" role="status" aria-label="Loading course content">
                <span className="sr-only">Loading...</span>
                <div className="text-gray-600">Loading course content...</div>
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

    if (!courseContent || courseContent.length === 0) {
        return (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-centre" role="status">
                <div className="text-blue-800">
                    <strong>No course content available</strong>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto mt-8">
            <h2 className="text-2xl font-bold mb-4 text-centre text-gray-900">{courseTitle}</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <caption className="sr-only">Course content for {courseTitle}</caption>
                <thead className="bg-green-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content Link</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {courseContent.map((content) => (
                        <tr key={content.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{content.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 underline">
                                <a
                                    href={`http://localhost:3001/course-resources/${content.content_url.replace(/^.*courseResources\//, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open content: ${content.title}`}
                                >
                                    View Content
                                </a>
                                
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {/* Placeholder for future action button */}
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colours"
                                    disabled
                                >
                                    Coming Soon
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseContentTable;