/**
 * This is a table component for displaying recommended courses.
 */
import React from "react";
import { useStudentLearningPreference } from "../Hooks/useStudentLearningPreference";

const RecommendedCourseTable: React.FC = () => {
    const { checkPreferences, loading, error, result } = useStudentLearningPreference();

    const handleCheck = async () => {
        try {
            await checkPreferences();
            // result is stored in the hook's state; you can use it to update UI or trigger navigation
            console.log('Preferences check result:', result);
        } catch (err) {
            // error is stored in the hook's state; optionally notify user
            console.error('Error checking preferences:', err);
        }
    };

    return (
        <div>
            <h2>Recommended courses</h2>
            {/* ...existing table rendering for recommended courses... */}
            <div className="recommended-course-actions">
                <button
                    type="button"
                    onClick={handleCheck}
                    disabled={loading}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                    {loading ? "Checking…" : "Check learning preferences"}
                </button>
                {error && <p className="recommended-course-error" role="status" aria-live="polite">Error checking preferences.</p>}
                {result && (
                    <p>
                        {/* adjust depending on the API shape */}
                        {result.success ? "Student has preferences set." : "No preferences found."}
                    </p>
                )}
            </div>
        </div>
    );
};

export default RecommendedCourseTable;