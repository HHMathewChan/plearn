import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {fetchFinalQuizWithQuestions} from '../Services/FinalQuizService';
import { submitQuizAttempt } from '../Services/QuizAttemptService';
import {getStudentCode} from '../Services/PlatformUserService';
import type{ FinalQuizStructure } from '../Types/FinalQuizTypes';
import type { quizAttempt } from '../Types/QuizAttemptType';

const FinalQuiz: React.FC<{ courseId: string }> = ({ courseId }) => {
    const [quizData, setQuizData] = useState<FinalQuizStructure | null>(null);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const studentCode = getStudentCode();
    const navigate = useNavigate();

    if (!studentCode) {
        return <div>Please log in to take the quiz.</div>;
    }

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const data = await fetchFinalQuizWithQuestions(courseId);
                setQuizData(data);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [courseId]);

    const handleOptionChange = (questionId: string, optionId: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    };

    const completeQuizAttempt = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        console.log('Quiz submitted:', answers);
        try{
            const result = await submitQuizAttempt(courseId, studentCode, answers);
            const quizAttempt: quizAttempt = result.data[0];
            console.log('Quiz submission result:', quizAttempt);
            if (quizAttempt && quizAttempt.score !== undefined) {
                alert(`Quiz submitted! Your score: ${quizAttempt.score}`);
            } else {
                alert('Quiz submitted! Your score is not available.');
            }
            navigate('/student-home');
        } catch (error) {
            setError('Failed to submit quiz. Please try again.');
            console.error('Error submitting quiz:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!quizData) return <div>No quiz data available.</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <form onSubmit={completeQuizAttempt}>
            {quizData.questions.map(question => (
                <div key={question.id}>
                    <h2>{question.question_text}</h2>
                    {question.options.map(option => (
                        <div key={option.id}>
                            <label>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={option.id}
                                    checked={answers[question.id] === option.id}
                                    onChange={() => handleOptionChange(question.id, option.id)}
                                />
                                {option.option_text}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
            <button type="submit">Submit Quiz</button>
        </form>
    );
};

export default FinalQuiz;