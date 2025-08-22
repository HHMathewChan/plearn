import FinalQuiz from '../Components/FinalQuiz';
import { useParams } from 'react-router-dom';

const FinalQuizPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    if (!courseId) {
        return null;
    }
    //for debugging
    console.log('Course ID:', courseId);
    return (
        <div>
            <h1>Final Quiz</h1>
            <FinalQuiz courseId={courseId} />
        </div>
    );
};

export default FinalQuizPage;