import React, { useState } from "react";
import { useCourseContent } from "../Hooks/useCourseContent";
import { getContentProgress, createContentProgress,updateContentProgress } from "../Services/ContentProgressService";

type CourseContentTableProps = {
    courseId: string;
    courseTitle: string;
    studentCode: string;
}

const CourseContentTable: React.FC<CourseContentTableProps> = ({ courseId, courseTitle, studentCode }) => {
    const { courseContent, loading, error } = useCourseContent(courseId);

    // track current status per content id
    const [statusMap, setStatusMap] = useState<Record<string, string | null>>({});
    // track loading state per content id for the "Check status" button
    const [checkingMap, setCheckingMap] = useState<Record<string, boolean>>({});

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

    const handleCheckStatus = async (contentId: string) => {
        try {
            setCheckingMap(prev => ({ ...prev, [contentId]: true }));

            // Try to get existing status
            const status = await getContentProgress(studentCode, contentId);

            if (status == null) {
                // Ask user if they'd like to create a new progress record
                const shouldCreate = window.confirm("No progress record found. Create a new content progress record?");
                if (!shouldCreate) {
                    setStatusMap(prev => ({ ...prev, [contentId]: null }));
                    return;
                }

                // Create then re-fetch status
                await createContentProgress(studentCode, contentId);
                const newStatus = await getContentProgress(studentCode, contentId);
                setStatusMap(prev => ({ ...prev, [contentId]: newStatus }));
            } else {
                setStatusMap(prev => ({ ...prev, [contentId]: status }));
            }
        } catch (err) {
            console.error("Error checking/creating content progress:", err);
            window.alert("An error occurred while checking content progress. See console for details.");
        } finally {
            setCheckingMap(prev => ({ ...prev, [contentId]: false }));
        }
    };

    const handleUpdateStatus = async (contentId: string, newStatus: 'complete' | 'not_started') => {
        try {
            setCheckingMap(prev => ({ ...prev, [contentId]: true }));

            // Update the status
            await updateContentProgress(studentCode, contentId, newStatus);

            // Refresh the current status
            const updatedStatus = await getContentProgress(studentCode, contentId);
            setStatusMap(prev => ({ ...prev, [contentId]: updatedStatus }));
        } catch (err) {
            console.error("Error updating content progress:", err);
            window.alert("An error occurred while updating content progress. See console for details.");
        } finally {
            setCheckingMap(prev => ({ ...prev, [contentId]: false }));
        }
    };

    return (
        <div className="overflow-x-auto mt-8">
            <h2 className="text-2xl font-bold mb-4 text-centre text-gray-900">{courseTitle}</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <caption className="sr-only">Course content for {courseTitle}</caption>
                <thead className="bg-green-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content Link</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current status</th>
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
                                <button
                                    type="button"
                                    className="inline-flex items-centre px-3 py-1.5 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                                    onClick={() => handleCheckStatus(content.id)}
                                    disabled={!!checkingMap[content.id]}
                                    aria-label={`Check status for ${content.title}`}
                                >
                                    {checkingMap[content.id] ? 'Checking…' : 'Check status'}
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {statusMap[content.id] ?? '—'}
                            </td>
                            {/* button for update status */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                                    onClick={() => handleUpdateStatus(content.id, 'complete')}
                                    disabled={!!checkingMap[content.id]}
                                    aria-label={`Mark ${content.title} as complete`}
                                >
                                    Mark as Complete
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                                    onClick={() => handleUpdateStatus(content.id, 'not_started')}
                                    disabled={!!checkingMap[content.id]}
                                    aria-label={`Mark ${content.title} as not started`}
                                >
                                    Mark as Not Started
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