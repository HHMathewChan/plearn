import { useEffect } from "react";
import { useStudentLearningPreference } from "../Hooks/useStudentLearningPreference";
import { useNavigate } from "react-router-dom";
import RecommendedCourseList from "./ReccomendedCourseList";

const RecommendedCourseTable: React.FC = () => {
    const { checkPreferences, loading, error, result } = useStudentLearningPreference();
    const navigate = useNavigate();

    // Run preference check once when component mounts
    useEffect(() => {
        void (async () => {
            try {
                await checkPreferences();
            } catch (error) {
                console.error('Error checking preferences on mount:', error);
            }
        })();
    }, [checkPreferences]);

    if (loading) {
        return <div>Checking learning preferences…</div>;
    }

    if (error) {
        return <div className="text-red-600" role="status">Error checking preferences.</div>;
    }

    return (
        <div>
            <h2>Recommended courses</h2>

            {result?.success ? (
                <div>
                    {/* Placeholder for actual recommended course list */}
                    <RecommendedCourseList />
                </div>
            ) : (
                <div>
                    <p>You have not set your learning preferences yet. Please take the survey to see personalised course recommendations.</p>
                    <p>
                        {/* Not a button element — navigates to survey */}
                        <a
                            href="#"
                            onClick={(event) => { event.preventDefault(); navigate('/learning-preferences'); }}
                            className="text-blue-600 underline"
                        >
                            Take the learning-preferences survey
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default RecommendedCourseTable;