import { useState, useEffect } from 'react';
import {fetchFinalQuizWithQuestions} from '../Services/FinalQuizService';
import { submitQuizAttempt } from '../Services/QuizAttemptService';
import {getStudentCode} from '../Services/PlatformUserService';
import type{ FinalQuizStructure } from '../Types/FinalQuizTypes';

const FinalQuiz: React.FC<{ courseId: string }> = ({ courseId }) => {
    const [quizData, setQuizData] = useState<FinalQuizStructure | null>(null);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const studentCode = getStudentCode();

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
        setSuccessMessage(null);
        console.log('Quiz submitted:', answers);
        try{
            const result = await submitQuizAttempt(courseId, studentCode, answers);
            setSuccessMessage('Quiz submitted successfully!');
            console.log('Quiz submission result:', result);
        }catch (error) {
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