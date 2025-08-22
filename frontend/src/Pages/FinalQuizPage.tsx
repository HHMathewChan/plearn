import { useState } from 'react';
import FinalQuiz from '../Components/FinalQuiz';
import { useParams } from 'react-router-dom';

const FinalQuizPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [showQuiz, setShowQuiz] = useState(false);

    if (!courseId) {
        return null;
    }

    // For debugging
    console.log('Course ID:', courseId);

    return (
        <div>
            <h1>Final Quiz</h1>
            {!showQuiz && (
                <button
                    onClick={() => setShowQuiz(true)}
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