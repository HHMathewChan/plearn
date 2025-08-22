import { useNavigate } from 'react-router-dom';

const TakeFinalQuiz: React.FC = () => {
    const navigate = useNavigate();

    const handleTakeQuiz = () => {
        // Navigate to the Final Quiz Page
        navigate('/final-quiz');
    };

    return (
        <button onClick={handleTakeQuiz} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Take Final Quiz
        </button>
    );
};

export default TakeFinalQuiz;