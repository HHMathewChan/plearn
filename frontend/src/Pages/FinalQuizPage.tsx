import { useState } from 'react';
import FinalQuiz from '../Components/FinalQuiz';
import { useParams } from 'react-router-dom';
import {createQuizAttempt} from '../Services/QuizAttemptService';
import {getStudentCode} from '../Services/PlatformUserService';

const FinalQuizPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const studentCode = getStudentCode();
    const [showQuiz, setShowQuiz] = useState(false);

    if (!courseId) {
        return null;
    }
    // For debugging
    console.log('Course ID:', courseId);

    if (!studentCode) {
        return <div>User is not authenticated. Please log in again.</div>;
    }
    // For debugging
    console.log('Student Code:', studentCode);

    // Create a quiz attempt when the button is clicked
    const startQuizAttempt = async () => {
        try {
            await createQuizAttempt(studentCode, courseId);
            setShowQuiz(true);
        } catch (error) {
            console.error('Error creating quiz attempt:', error);
        }
    };

    return (
        <div>
            <h1>Final Quiz</h1>
            {!showQuiz && (
                <button
                    onClick={() => startQuizAttempt()}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Start Final Quiz
                </button>
            )}
            {showQuiz && <FinalQuiz courseId={courseId} />}
        </div>
    );
};

export default FinalQuizPage;