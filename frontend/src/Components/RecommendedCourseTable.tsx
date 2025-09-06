import { useStudentLearningPreference } from "../Hooks/useStudentLearningPreference";
import { useNavigate } from "react-router-dom";

const RecommendedCourseTable: React.FC = () => {
    const { checkPreferences, loading, error, result } = useStudentLearningPreference();
    const navigate = useNavigate();

    const handleCheck = async () => {
        try {
            await checkPreferences();
            console.log('Preferences check result:', result);
        } catch (err) {
            console.error('Error checking preferences:', err);
        }
    };

    const openSurvey = () => {
        // Navigate to the learning-preferences survey page
        navigate('/learning-preferences');
    };

    return (
        <div>
            <h2>Recommended courses</h2>
            <div className="recommended-course-actions">
                <button
                    type="button"
                    onClick={handleCheck}
                    disabled={loading}
                    className="px-3 py-1 bg-blue-600 text-white rounded mr-3"
                >
                    {loading ? "Checking…" : "Check learning preferences"}
                </button>

                <button
                    type="button"
                    onClick={openSurvey}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                >
                    Open learning-preferences survey
                </button>

                {error && <p className="recommended-course-error" role="status" aria-live="polite">Error checking preferences.</p>}
                {result && (
                    <p>
                        {result.success ? "Student has preferences set." : "No preferences found."}
                    </p>
                )}
            </div>
        </div>
    );
};

export default RecommendedCourseTable;